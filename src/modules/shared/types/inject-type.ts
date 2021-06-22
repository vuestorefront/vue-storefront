import { InjectKey } from 'vue/types/options';

export type InjectType<T> = Record<keyof T, InjectKey | { from?: InjectKey, default?: any }>;
