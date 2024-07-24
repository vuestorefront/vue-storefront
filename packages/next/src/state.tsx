"use client";

import type {
  SfCart,
  SfCurrency,
  SfCustomer,
} from "@vue-storefront/unified-data-model";
import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { type StoreApi, createStore, useStore } from "zustand";

export interface SfStateProps {
  currencies: SfCurrency[];
  currency: SfCurrency;
  locale: string;
  locales: string[];
}

interface SfState extends SfStateProps {
  cart: SfCart | null;
  customer: SfCustomer | null;
  setCart: (cart: SfCart) => void;
  setCurrencies: (currencies: SfCurrency[]) => void;
  setCurrency: (currency: SfCurrency) => void;
  setCustomer: (customer: SfCustomer) => void;
  setLocale: (locale: string) => void;
  setLocales: (locales: string[]) => void;
}

const DEFAULT_PROPS: SfStateProps = {
  currencies: [],
  currency: "",
  locale: "",
  locales: [],
};

const createSfState = (initialData?: Partial<SfStateProps>) => {
  return createStore<SfState>()((set) => ({
    cart: null,
    customer: null,
    ...DEFAULT_PROPS,
    ...initialData,
    setCart: (cart) => set({ cart }),
    setCurrencies: (currencies) => set({ currencies }),
    setCurrency: (currency) => set({ currency }),
    setCustomer: (customer) => set({ customer }),
    setLocale: (locale) => set({ locale }),
    setLocales: (locales) => set({ locales }),
  }));
};

export const SfStateContext = createContext<StoreApi<SfState> | null>(null);

export function SfStateProvider({
  children,
  initialData,
}: {
  initialData: Partial<SfStateProps>;
} & PropsWithChildren) {
  const stateReference = useRef<StoreApi<SfState>>();

  if (!stateReference.current) {
    stateReference.current = createSfState(initialData);
  }

  return (
    <SfStateContext.Provider value={stateReference.current}>
      {children}
    </SfStateContext.Provider>
  );
}

function getSfStateContext() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(SfStateContext);
  if (!context) throw new Error("Missing SfStateContext.Provider in the tree");
  return context;
}

export function useSfCurrencyState() {
  const { currency, setCurrency } = useStore(getSfStateContext(), (state) => ({
    currency: state.currency,
    setCurrency: state.setCurrency,
  }));

  return [currency, setCurrency] as const;
}

export function useSfCurrenciesState() {
  const { currencies, setCurrencies } = useStore(
    getSfStateContext(),
    (state) => ({
      currencies: state.currencies,
      setCurrencies: state.setCurrencies,
    })
  );

  return [currencies, setCurrencies] as const;
}

export function useSfLocaleState() {
  const { locale, setLocale } = useStore(getSfStateContext(), (state) => ({
    locale: state.locale,
    setLocale: state.setLocale,
  }));

  return [locale, setLocale] as const;
}

export function useSfLocalesState() {
  const { locales, setLocales } = useStore(getSfStateContext(), (state) => ({
    locales: state.locales,
    setLocales: state.setLocales,
  }));

  return [locales, setLocales] as const;
}

export function useSfCartState() {
  const { cart, setCart } = useStore(getSfStateContext(), (state) => ({
    cart: state.cart,
    setCart: state.setCart,
  }));

  return [cart, setCart] as const;
}

export function useSfCustomerState() {
  const { customer, setCustomer } = useStore(getSfStateContext(), (state) => ({
    customer: state.customer,
    setCustomer: state.setCustomer,
  }));

  return [customer, setCustomer] as const;
}
