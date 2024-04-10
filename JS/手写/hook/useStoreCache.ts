import { create, StateCreator } from 'zustand';
import { persist } from 'zustand/middleware';

export const useStoreCache = (options: StateCreator<any>, attrs: any) => {
    const storeCache = create(persist(options, attrs) as StateCreator<any>);
    return storeCache;
};
