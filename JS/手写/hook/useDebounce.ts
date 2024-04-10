import { useEffect, useState } from 'react';
import useDebounceFn from './useDebounceFn';

function useDebounce<T>(value: T, wait: number = 1000) {
    const [debounceValue, setDebounceValue] = useState<T>(value);

    const { run } = useDebounceFn(() => setDebounceValue(value), wait);

    useEffect(() => {
        run();
    }, [value]);

    return debounceValue;
}

export default useDebounce;
