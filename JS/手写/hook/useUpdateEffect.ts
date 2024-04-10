import { useEffect, useRef } from 'react';

const createUpdateEffect = (hook: typeof useEffect) => {
    const useUpdateEffect = (effect, deps) => {
        const isFirst = useRef(true);

        hook(() => {
            return () => {
                isFirst.current = false;
            };
        }, []);

        hook(() => {
            if (!isFirst.current) {
                isFirst.current = true;
            } else {
                return effect();
            }
        }, deps);
    };
    return useUpdateEffect;
};

const useUpdateEffect = createUpdateEffect(useEffect);

export default useUpdateEffect;
