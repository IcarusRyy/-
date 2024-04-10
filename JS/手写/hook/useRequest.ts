import { useState, useCallback, useRef } from 'react';
import useMount from './useMount';
import useUnmount from './useUnmount';
import useLatest from './useLatest';

interface OptionsType<TData> {
    manual?: boolean;
    polling?: boolean;
    pollingInterval?: number;
    onSuccess?: (data: TData) => void;
}

const useRequest = <TData>(requestFn: () => Promise<TData>, options: OptionsType<TData> = {}) => {
    const [data, setData] = useState<TData | undefined>(undefined);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const fnRef = useLatest(requestFn);
    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const result = await fnRef.current();
            setData(result);
            if (options.onSuccess) {
                options.onSuccess(result);
            }
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [fnRef, options]);
    useMount(() => {
        if (!options.manual) {
            if (options.polling) {
                intervalRef.current = setInterval(fetchData, options.pollingInterval);
            } else {
                fetchData();
            }
        }
    });
    useUnmount(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }
    });

    return { data, loading, error, fetchData };
};

export default useRequest;
