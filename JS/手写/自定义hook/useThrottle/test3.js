export const useThrottle = (fn, delay = 300) => {
  let timer = useRef()

  return useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }

    timer.current = setTimeout(() => {
      fn()
      timer.current = null
    }, delay)
  }, [delay])
}
