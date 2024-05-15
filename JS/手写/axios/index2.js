import axios from "axios"

// 用于存储处于活跃状态的请求的Map
const pendingRequests = new Map()

const generateReqKey = (config) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&")
}

const addPendingRequest = (config) => {
  const requestKey = generateReqKey(config)
  // 如果请求已经在pendingRequests中，认为是重复请求，进行取消
  if (pendingRequests.has(requestKey)) {
    const abortController = pendingRequests.get(requestKey)
    abortController.abort()
  }
  // 为请求创建新的AbortController
  const abortController = new AbortController()
  // 将signal属性添加到config中，以便axios可以使用它
  config.signal = abortController.signal
  // 存储该请求的AbortController
  pendingRequests.set(requestKey, abortController)
}

const removePendingRequest = (config) => {
  const requestKey = generateReqKey(config)
  // 如果请求结束，则从pendingRequests对象中移除保存的该AbortController
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    addPendingRequest(config)
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    removePendingRequest(response.config)
    return response
  },
  (error) => {
    removePendingRequest(error.config || {})
    return Promise.reject(error)
  }
)
