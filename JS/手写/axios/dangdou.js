import axios from "axios"

// 创建一个Map来存储标识每个请求的定时器ID
const debounceMap = new Map()

const generateReqKey = (config) => {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&")
}

const addDebounceRequest = (config, debounceTime = 1000) => {
  const requestKey = generateReqKey(config)
  const requestId = setTimeout(() => {
    debounceMap.delete(requestKey)
  }, debounceTime)

  // 如果debounceMap里已有此请求，说明在debounceTime内已经试图发送相同的请求
  if (debounceMap.has(requestKey)) {
    clearTimeout(debounceMap.get(requestKey))
  }

  // 替换或新增定时器ID
  debounceMap.set(requestKey, requestId)

  // 如果请求是在debounceTime之内再次触发的，取消这次请求
  if (requestId !== debounceMap.get(requestKey)) {
    return Promise.reject(new axios.Cancel("Cancelled duplicate request"))
  }

  return config
}

axios.interceptors.request.use(
  (config) => addDebounceRequest(config, 1000), // 设置防抖时间为1000毫秒
  (error) => Promise.reject(error)
)

// 直接传入请求的config，并设置debounceTime参数
// axios.request(addDebounceRequest({url: '/someEndpoint', method: 'get'}, 500));
