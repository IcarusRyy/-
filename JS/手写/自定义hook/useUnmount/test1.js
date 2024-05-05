// 卸载的时候 执行一次
function useUnmount(fn) {
  useEffect(() => {
    return () => fn()
  }, [])
}
