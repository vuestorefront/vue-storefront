import { ref } from '@vue/composition-api';

const position = ref({});
const loading = ref(false);

const useGeolocation = () => {
  const search = async () => new Promise((resolve) => {
    // @ts-ignore
    if (navigator.geolocation) {
      loading.value = true;

      const handleSuccess = (response) => {
        position.value = {
          latitude: response.coords.latitude,
          longitude: response.coords.longitude
        };
        loading.value = false;
        resolve();
      };
      // @ts-ignore
      navigator.geolocation.getCurrentPosition(handleSuccess);
    }
  });

  return { position, loading, search };
};

export default useGeolocation;
