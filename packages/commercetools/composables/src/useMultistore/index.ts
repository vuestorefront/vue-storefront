import { ref, Ref } from '@vue/composition-api';
import { getChannels } from '@vue-storefront/commercetools-api';
import { useSSR } from '@vue-storefront/core';

const multistores: Ref<any> = ref([]);
const selectedStore: Ref<any> = ref(null);
const loading = ref(false);

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface SearchParams {
  id?: string;
  coordinates?: Coordinates;
}

const useMultistore = () => {
  const { initialState, saveToInitialState } = useSSR('vsf-multistore');

  multistores.value = initialState?.multistores || [];
  selectedStore.value = initialState?.selectedStore || null;

  const search = async (searchParams: SearchParams) => {
    loading.value = true;
    const response = await getChannels(searchParams);
    multistores.value = response.data.channels.results;
    saveToInitialState({ multistores: multistores.value, selectedStore: selectedStore.value });
    loading.value = false;
  };

  const selectStore = async (store) => {
    if (selectedStore.value) return;

    if (typeof store === 'string') {
      const response = await getChannels({ id: store });
      selectedStore.value = response.data.channels.results[0];
      saveToInitialState({ multistores: multistores.value, selectedStore: selectedStore.value });
      return;
    }

    selectedStore.value = store;
  };

  return { multistores, selectedStore, loading, search, selectStore };
};

export default useMultistore;
