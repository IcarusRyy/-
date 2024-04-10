function useLatest(val) {
  let ref = useRef(val)
  ref.current = val
  return ref
}

function useRequest(requestFn, options) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const intervalRef = useRef()
  const fnRef = useLatest(requestFn)

  const request = async () => {
    setLoading(true)
    try {
      const res = await fnRef.current()
      setData(res)
      if (options.onSuccess) {
        options.onSuccess()
      }
    } catch (err) {
      if (options.onError) {
        options.onError()
      }
    } finally {
      setLoading(false)
    }
  }
  useMount(() => {
    if (options.manual) {
      if (options.throttle) {
        intervalRef = setInterval(() => {}, options.dealy)
      }
    }
  })
  useUnmount(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  })

  return {
    data,
    loading,
    request,
  }
}
