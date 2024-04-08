export const useDebounce = (fn, wait = 300) => {
  let timer = useRef()

  return useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
    timer.current = setTimeout(() => {
      fn()
    }, wait)
  }, [wait])
}
