"use client";

import type {
  Maybe,
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
import { createStore, useStore } from "zustand";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SfLocales {}
export interface SfStateProps {
  currencies: SfCurrency[];
  currency: SfCurrency;
  locale: SfLocales[keyof SfLocales];
  locales: SfLocales[keyof SfLocales][];
}
export interface SfState extends SfStateProps {
  cart: Maybe<SfCart>;
  customer: Maybe<SfCustomer>;
  setCart: (cart?: Maybe<SfCart>) => void;
  setCurrencies: (currencies: SfCurrency[]) => void;
  setCurrency: (currency: SfCurrency) => void;
  setCustomer: (customer?: Maybe<SfCustomer>) => void;
  setLocale: (locale: SfLocales[keyof SfLocales]) => void;
  setLocales: (locales: SfLocales[keyof SfLocales][]) => void;
}

const createSfState = (initialData: SfStateProps) => {
  return createStore<SfState>()((set) => ({
    cart: null,
    customer: null,
    ...initialData,
    setCart: (cart) => set({ cart }),
    setCurrencies: (currencies) => set({ currencies }),
    setCurrency: (currency) => set({ currency }),
    setCustomer: (customer) => set({ customer }),
    setLocale: (locale) => set({ locale }),
    setLocales: (locales) => set({ locales }),
  }));
};
type SfStateApi = ReturnType<typeof createSfState>;

export const SfStateContext = createContext<SfStateApi | null>(null);

export function SfStateProvider({
  children,
  initialData,
}: {
  initialData: SfStateProps;
} & PropsWithChildren) {
  const stateReference = useRef<SfStateApi>();

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

export function useSfCurrencyState(): [
  SfCurrency,
  (currency: SfCurrency) => void
] {
  const { currency, setCurrency } = useStore(getSfStateContext(), (state) => ({
    currency: state.currency,
    setCurrency: state.setCurrency,
  }));

  return [currency, setCurrency];
}

export function useSfCurrenciesState(): [
  SfCurrency[],
  (currencies: SfCurrency[]) => void
] {
  const { currencies, setCurrencies } = useStore(
    getSfStateContext(),
    (state) => ({
      currencies: state.currencies,
      setCurrencies: state.setCurrencies,
    })
  );

  return [currencies, setCurrencies];
}

export function useSfLocaleState(): [
  SfLocales[keyof SfLocales],
  (locale: SfLocales[keyof SfLocales]) => void
] {
  const { locale, setLocale } = useStore(getSfStateContext(), (state) => ({
    locale: state.locale,
    setLocale: state.setLocale,
  }));

  return [locale, setLocale];
}

export function useSfLocalesState(): [
  SfLocales[keyof SfLocales][],
  (locales: SfLocales[keyof SfLocales][]) => void
] {
  const { locales, setLocales } = useStore(getSfStateContext(), (state) => ({
    locales: state.locales,
    setLocales: state.setLocales,
  }));

  return [locales, setLocales];
}

export function useSfCartState(): [
  Maybe<SfCart> | undefined,
  (cart?: Maybe<SfCart>) => void
] {
  const { cart, setCart } = useStore(getSfStateContext(), (state) => ({
    cart: state.cart,
    setCart: state.setCart,
  }));

  return [cart, setCart];
}

export function useSfCustomerState(): [
  Maybe<SfCustomer> | undefined,
  (customer?: Maybe<SfCustomer>) => void
] {
  const { customer, setCustomer } = useStore(getSfStateContext(), (state) => ({
    customer: state.customer,
    setCustomer: state.setCustomer,
  }));

  return [customer, setCustomer];
}
