function useUnmount(fn) {
  useEffect(() => () => fn()), []
}
