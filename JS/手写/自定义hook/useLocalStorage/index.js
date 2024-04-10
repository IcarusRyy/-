const useLocalStorage = (key, initVal) => {
  let storedValue = localStorage.getItem("key")

  let initData = storedValue ? JSON.parse(storedValue) : initVal

  const [val, setVal] = useState(initData)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(val))
  }, [key, val])

  return [val, setVal]
}
