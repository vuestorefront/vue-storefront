"use client";

import type { Maybe } from "@vue-storefront/unified-data-model";
import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { createStore, useStore } from "zustand";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SfLocales {}
export interface SfStateProps<TCurrency, TLocale> {
  currencies: TCurrency[];
  currency: TCurrency;
  locale: TLocale;
  locales: TLocale[];
}
export interface SfState<TCurrency, TLocale, TCart, TCustomer>
  extends SfStateProps<TCurrency, TLocale> {
  cart: Maybe<TCart>;
  customer: Maybe<TCustomer>;
  setCart: (cart?: Maybe<TCart>) => void;
  setCurrencies: (currencies: TCurrency[]) => void;
  setCurrency: (currency: TCurrency) => void;
  setCustomer: (customer?: Maybe<TCustomer>) => void;
  setLocale: (locale: TLocale) => void;
  setLocales: (locales: TLocale[]) => void;
}

const createSfState = <TCurrency, TLocale, TCart, TCustomer>(
  initialData: SfStateProps<TCurrency, TLocale>
) => {
  return createStore<SfState<TCurrency, TLocale, TCart, TCustomer>>()(
    (set) => ({
      cart: null,
      customer: null,
      ...initialData,
      setCart: (cart) => set({ cart }),
      setCurrencies: (currencies) => set({ currencies }),
      setCurrency: (currency) => set({ currency }),
      setCustomer: (customer) => set({ customer }),
      setLocale: (locale) => set({ locale }),
      setLocales: (locales) => set({ locales }),
    })
  );
};
type SfStateApi<TCurrency, TLocale, TCart, TCustomer> = ReturnType<
  typeof createSfState<TCurrency, TLocale, TCart, TCustomer>
>;

export function SfStateContext<TCurrency, TLocale, TCart, TCustomer>() {
  return createContext<SfStateApi<TCurrency, TLocale, TCart, TCustomer> | null>(
    null
  );
}

export function SfStateProvider<TCurrency, TLocale, TCart, TCustomer>({
  children,
  initialData,
}: {
  initialData: SfStateProps<TCurrency, TLocale>;
} & PropsWithChildren) {
  const stateReference =
    useRef<SfStateApi<TCurrency, TLocale, TCart, TCustomer>>();
  const StateContext = SfStateContext<TCurrency, TLocale, TCart, TCustomer>();

  if (!stateReference.current) {
    stateReference.current = createSfState<
      TCurrency,
      TLocale,
      TCart,
      TCustomer
    >(initialData);
  }
  return (
    <StateContext.Provider value={stateReference.current}>
      {children}
    </StateContext.Provider>
  );
}

function getSfStateContext<TCurrency, TLocale, TCart, TCustomer>() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const context = useContext(
    SfStateContext<TCurrency, TLocale, TCart, TCustomer>()
  );
  if (!context) throw new Error("Missing SfStateContext.Provider in the tree");
  return context;
}

export function useSfCurrencyState<TCurrency, TLocale, TCart, TCustomer>(): [
  TCurrency,
  (currency: TCurrency) => void
] {
  const { currency, setCurrency } = useStore(
    getSfStateContext<TCurrency, TLocale, TCart, TCustomer>(),
    (state) => ({
      currency: state.currency,
      setCurrency: state.setCurrency,
    })
  );

  return [currency, setCurrency];
}

export function useSfCurrenciesState<TCurrency, TLocale, TCart, TCustomer>(): [
  TCurrency[],
  (currencies: TCurrency[]) => void
] {
  const { currencies, setCurrencies } = useStore(
    getSfStateContext<TCurrency, TLocale, TCart, TCustomer>(),
    (state) => ({
      currencies: state.currencies,
      setCurrencies: state.setCurrencies,
    })
  );

  return [currencies, setCurrencies];
}

export function useSfLocaleState<TCurrency, TLocale, TCart, TCustomer>(): [
  TLocale,
  (locale: TLocale) => void
] {
  const { locale, setLocale } = useStore(
    getSfStateContext<TCurrency, TLocale, TCart, TCustomer>(),
    (state) => ({
      locale: state.locale,
      setLocale: state.setLocale,
    })
  );

  return [locale, setLocale];
}

export function useSfLocalesState<TCurrency, TLocale, TCart, TCustomer>(): [
  TLocale[],
  (locales: TLocale[]) => void
] {
  const { locales, setLocales } = useStore(
    getSfStateContext<TCurrency, TLocale, TCart, TCustomer>(),
    (state) => ({
      locales: state.locales,
      setLocales: state.setLocales,
    })
  );

  return [locales, setLocales];
}

export function useSfCartState<TCurrency, TLocale, TCart, TCustomer>(): [
  Maybe<TCart> | undefined,
  (cart?: Maybe<TCart>) => void
] {
  const { cart, setCart } = useStore(
    getSfStateContext<TCurrency, TLocale, TCart, TCustomer>(),
    (state) => ({
      cart: state.cart,
      setCart: state.setCart,
    })
  );

  return [cart, setCart];
}

export function useSfCustomerState<TCurrency, TLocale, TCart, TCustomer>(): [
  Maybe<TCustomer> | undefined,
  (customer?: Maybe<TCustomer>) => void
] {
  const { customer, setCustomer } = useStore(
    getSfStateContext<TCurrency, TLocale, TCart, TCustomer>(),
    (state) => ({
      customer: state.customer,
      setCustomer: state.setCustomer,
    })
  );

  return [customer, setCustomer];
}
