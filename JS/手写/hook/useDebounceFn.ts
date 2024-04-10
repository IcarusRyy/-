import { useMemo } from 'react';
import useLatest from './useLatest';
import { debounce } from 'lodash';
import useUnmount from './useUnmount';

function useDebounceFn<T extends (...args: any[]) => any>(fn: T, wait: number = 1000) {
    const funcRef = useLatest<T>(fn);
    const debounced = useMemo(
        () =>
            debounce((...args: Parameters<T>): ReturnType<T> => {
                return funcRef.current(...args);
            }, wait),
        []
    );
    // 避免潜在的内存泄漏或执行已卸载组件的状态更新
    useUnmount(() => {
        debounced.cancel();
    });
    return {
        run: debounced,
        cancel: debounced.cancel,
        flush: debounced.flush
    };
}

export default useDebounceFn;
