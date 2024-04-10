function useLatest(val) {
  const ref = useRef(val)
  ref.current = val
  return ref
}

function useDebounceFn(fn, wait) {
  const fnRef = useLatest(fn)

  const debounce = useMemo(() => {
    lodash.debounce(() => {
      return fnRef.current()
    }, wait)
  }, [])

  return {
    run: debounce,
  }
}
