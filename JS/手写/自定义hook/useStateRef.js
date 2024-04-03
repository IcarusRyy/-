export function useStateRef(init) {
  const [data, setData] = useState(init)
  const dataRef = useRef(init)

  const setState = useCallback((val) => {
    if (val !== dataRef.current) {
      dataRef.current = val
      setData(val)
    }
  }, [])

  return { state: data, setState, stateRef: dataRef }
}
