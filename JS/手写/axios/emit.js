class EventEmitter {
  constructor() {
    this.events = {}
  }

  // 订阅事件
  on(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = []
    }
    this.events[eventName].push(callback)
  }

  // 发布事件
  emit(eventName, ...args) {
    const callbacks = this.events[eventName]
    if (callbacks) {
      callbacks.forEach((callback) => callback(...args))
      delete this.events[eventName] // 清除事件，避免内存泄漏
    }
  }
}

// 生成请求的键，以便追踪重复的请求
function generateReqKey(config) {
  const { method, url, params, data } = config
  return [method, url, JSON.stringify(params), JSON.stringify(data)].join("&")
}

const eventEmitter = new EventEmitter()

axios.interceptors.request.use(
  (config) => {
    const key = generateReqKey(config)
    if (eventEmitter.events[key]) {
      // 若存在重复的请求，则挂起当前请求
      return new Promise((resolve, reject) => {
        eventEmitter.on(key, (err, response) => {
          if (err) {
            reject(err)
          } else {
            resolve(response)
          }
        })
      })
    } else {
      // 否则，标记新的请求，并执行
      eventEmitter.events[key] = []
      return config
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

axios.interceptors.response.use(
  (response) => {
    const key = generateReqKey(response.config)
    eventEmitter.emit(key, null, response)
    return response
  },
  (error) => {
    const key = generateReqKey(error.config)
    eventEmitter.emit(key, error, null)
    return Promise.reject(error)
  }
)

// 可以实例化axios进行相关配置
const axiosInstance = axios.create({
  baseURL: "/api/",
})

export default axiosInstance
