"use client";

export type Maybe<TType> = TType | null;
import React, {
  type PropsWithChildren,
  createContext,
  useContext,
  useRef,
} from "react";
import { createStore, useStore } from "zustand";

export type SfContract = {
  SfCart: unknown;
  SfCustomer: unknown;
  SfCurrency: unknown;
  SfLocale: unknown;
};

export interface SfStateProps<TSfContract extends SfContract> {
  currencies: TSfContract["SfCurrency"][];
  currency: TSfContract["SfCurrency"];
  locale: TSfContract["SfLocale"];
  locales: TSfContract["SfLocale"][];
}
export interface SfState<TSfContract extends SfContract>
  extends SfStateProps<TSfContract> {
  cart: TSfContract["SfCart"] | null | undefined;
  customer: TSfContract["SfCustomer"] | null | undefined;
  setCart: (cart?: TSfContract["SfCart"] | null) => void;
  setCurrencies: (currencies: TSfContract["SfCurrency"][]) => void;
  setCurrency: (currency: TSfContract["SfCurrency"]) => void;
  setCustomer: (customer?: TSfContract["SfCustomer"] | null) => void;
  setLocale: (locale: TSfContract["SfLocale"]) => void;
  setLocales: (locales: TSfContract["SfLocale"][]) => void;
}

const createSfState = <TSfContract extends SfContract>(
  initialData: SfStateProps<TSfContract>
) => {
  return createStore<SfState<TSfContract>>()((set) => ({
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

type SfStateApi<TSfContract extends SfContract> = ReturnType<
  typeof createSfState<TSfContract>
>;

export function createSfStateProvider<TSfContract extends SfContract>() {
  const SfStateContext = createContext<SfStateApi<TSfContract> | null>(null);

  function SfStateProvider({
    children,
    initialData,
  }: {
    initialData: SfStateProps<TSfContract>;
  } & PropsWithChildren) {
    const stateReference = useRef<SfStateApi<TSfContract>>();

    if (!stateReference.current) {
      stateReference.current = createSfState<TSfContract>(initialData);
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
    if (!context)
      throw new Error("Missing SfStateContext.Provider in the tree");
    return context;
  }

  function useSfCurrencyState(): [
    TSfContract["SfCurrency"],
    (currency: TSfContract["SfCurrency"]) => void
  ] {
    const { currency, setCurrency } = useStore(
      getSfStateContext(),
      (state) => ({
        currency: state.currency,
        setCurrency: state.setCurrency,
      })
    );

    return [currency, setCurrency];
  }

  function useSfCurrenciesState(): [
    TSfContract["SfCurrency"][],
    (currencies: TSfContract["SfCurrency"][]) => void
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

  function useSfLocaleState(): [
    TSfContract["SfLocale"],
    (locale: TSfContract["SfLocale"]) => void
  ] {
    const { locale, setLocale } = useStore(getSfStateContext(), (state) => ({
      locale: state.locale,
      setLocale: state.setLocale,
    }));

    return [locale, setLocale];
  }

  function useSfLocalesState(): [
    TSfContract["SfLocale"][],
    (locales: TSfContract["SfLocale"][]) => void
  ] {
    const { locales, setLocales } = useStore(getSfStateContext(), (state) => ({
      locales: state.locales,
      setLocales: state.setLocales,
    }));

    return [locales, setLocales];
  }

  function useSfCartState(): [
    TSfContract["SfCart"] | null | undefined,
    (cart?: TSfContract["SfCart"] | null) => void
  ] {
    const { cart, setCart } = useStore(getSfStateContext(), (state) => ({
      cart: state.cart,
      setCart: state.setCart,
    }));

    return [cart, setCart];
  }

  function useSfCustomerState(): [
    TSfContract["SfCustomer"] | null | undefined,
    (customer?: TSfContract["SfCustomer"] | null) => void
  ] {
    const { customer, setCustomer } = useStore(
      getSfStateContext(),
      (state) => ({
        customer: state.customer,
        setCustomer: state.setCustomer,
      })
    );

    return [customer, setCustomer];
  }

  return {
    SfStateProvider,
    useSfCurrencyState,
    useSfCurrenciesState,
    useSfLocaleState,
    useSfLocalesState,
    useSfCartState,
    useSfCustomerState,
  };
}
