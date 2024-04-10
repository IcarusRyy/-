function useDebounce(data, wait) {
  const [val, setVal] = useState(data)
  const { run } = useDebounce(() => setVal(data), wait)

  useEffect(() => {
    run()
  }, [data])
  return val
}
