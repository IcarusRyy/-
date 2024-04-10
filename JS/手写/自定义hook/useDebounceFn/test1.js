function useLatest(val) {
  const ref = useRef(val)
  ref.current = val
  return ref
}

function useDebounceFn(fn, wait) {
  let fnRef = useLatest(fn)

  const debounced = useMemo(() => {
    lodash.debounce(() => {
      return fnRef.current()
    }, wait)
  }, [])
  return {
    run: debounced,
  }
}
