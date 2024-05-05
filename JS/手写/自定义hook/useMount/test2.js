function useMount(fn) {
  useEffect(() => fn(), [])
}
