const getStoreName = (store) => store?.name;

const getStoreAddressLine1 = (store) => {
  if (!store) {
    return '';
  }

  const { address } = store;

  return `${address.postalCode} ${address.city}`;
};

const getStoreAddressLine2 = (store) => {
  if (!store) {
    return '';
  }

  const { address } = store;

  return `${address.streetName} ${address.streetNumber}`;
};

const getStoreId = (store) => store?.id;

const multistoreGetters = {
  getName: getStoreName,
  getAddressLine1: getStoreAddressLine1,
  getAddressLine2: getStoreAddressLine2,
  getId: getStoreId
};

export default multistoreGetters;
