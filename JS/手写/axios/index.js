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
    const cancel = pendingRequests.get(requestKey)
    cancel(requestKey)
  }
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      pendingRequests.set(requestKey, cancel)
    })
}

const removePendingRequest = (config) => {
  const requestKey = generateReqKey(config)
  // 如果请求结束，则从pendingRequests对象中移除保存的该请求
  if (pendingRequests.has(requestKey)) {
    pendingRequests.delete(requestKey)
  }
}

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在请求发送前，对该请求进行标记和存储
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
    // 请求完成后，将请求从pendingRequests中移除
    removePendingRequest(response.config)
    return response
  },
  (error) => {
    // 请求完成（即便是请求错误）后，也将请求从pendingRequests中移除
    removePendingRequest(error.config || {})
    return Promise.reject(error)
  }
)
