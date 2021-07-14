import { storeGetters } from '../../src/getters';
import { StoresData } from '../../src/types';

function makeStore (storeId, storeName, channelID, channelName) {
  return {
    name: `${storeName} - ${channelName}`,
    id: `${storeId}/${channelID}`,
    description: '',
    geoLocation: null,
    locales: [],
    address: { addressLine1: '', addressLine2: '', _address: null },
    _storeID: storeId,
    _channelID: channelID
  };
}

const distributionChannels = [
  { id: 'd1', name: 'distribution channel 1' },
  { id: 'd2', name: 'distribution channel 2' },
  { id: 'd3', name: 'distribution channel 3' }
];

const supplyChannels = [
  { id: 's1', name: 'supply channel 1' },
  { id: 's2', name: 'supply channel 2' },
  { id: 's3', name: 'supply channel 3' }
];

const results = [
  { id: '1', name: 'store-1', distributionChannels, supplyChannels },
  { id: '2', name: 'store-2', distributionChannels: [], supplyChannels },
  { id: '3', name: 'store-3', distributionChannels, supplyChannels: [] }
];

const stores = {
  offset: 0,
  count: 0,
  total: 0,
  _selected: '3/d2',
  results
};

describe('[commercetools-getters] store getters', () => {

  describe('getItems', () => {

    it('returns array of stores', () => {
      const expected = [
        makeStore('1', 'store-1', 'd1', 'distribution channel 1'),
        makeStore('1', 'store-1', 'd2', 'distribution channel 2'),
        makeStore('1', 'store-1', 'd3', 'distribution channel 3'),
        makeStore('1', 'store-1', 's1', 'supply channel 1'),
        makeStore('1', 'store-1', 's2', 'supply channel 2'),
        makeStore('1', 'store-1', 's3', 'supply channel 3'),
        makeStore('2', 'store-2', 's1', 'supply channel 1'),
        makeStore('2', 'store-2', 's2', 'supply channel 2'),
        makeStore('2', 'store-2', 's3', 'supply channel 3'),
        makeStore('3', 'store-3', 'd1', 'distribution channel 1'),
        makeStore('3', 'store-3', 'd2', 'distribution channel 2'),
        makeStore('3', 'store-3', 'd3', 'distribution channel 3')
      ];

      expect(storeGetters.getItems(stores as StoresData)).toStrictEqual(expected);
    });

    it('returns empty array for invalid stores data', () => {
      const expected = [];
      expect(storeGetters.getItems(null as StoresData)).toStrictEqual(expected);
    });

    it('returns array of stores with store filter criteria', () => {
      const expected = [
        makeStore('1', 'store-1', 'd1', 'distribution channel 1'),
        makeStore('1', 'store-1', 'd2', 'distribution channel 2'),
        makeStore('1', 'store-1', 'd3', 'distribution channel 3'),
        makeStore('1', 'store-1', 's1', 'supply channel 1'),
        makeStore('1', 'store-1', 's2', 'supply channel 2'),
        makeStore('1', 'store-1', 's3', 'supply channel 3')
      ];

      const criteria = {
        store: {
          id: '1'
        }
      };

      expect(storeGetters.getItems(stores as StoresData, criteria)).toStrictEqual(expected);
    });

    it('returns array of stores with callable store filter criteria', () => {
      const expected = [
        makeStore('1', 'store-1', 'd1', 'distribution channel 1'),
        makeStore('1', 'store-1', 'd2', 'distribution channel 2'),
        makeStore('1', 'store-1', 'd3', 'distribution channel 3'),
        makeStore('1', 'store-1', 's1', 'supply channel 1'),
        makeStore('1', 'store-1', 's2', 'supply channel 2'),
        makeStore('1', 'store-1', 's3', 'supply channel 3'),
        makeStore('3', 'store-3', 'd1', 'distribution channel 1'),
        makeStore('3', 'store-3', 'd2', 'distribution channel 2'),
        makeStore('3', 'store-3', 'd3', 'distribution channel 3')
      ];

      const criteria = {
        store: {
          id(value) {
            return value === '1' || value === '3';
          }
        }
      };

      expect(storeGetters.getItems(stores as StoresData, criteria)).toStrictEqual(expected);
    });

    it('returns array of stores with channel filter criteria', () => {
      const expected = [
        makeStore('1', 'store-1', 'd3', 'distribution channel 3'),
        makeStore('3', 'store-3', 'd3', 'distribution channel 3')
      ];

      const criteria = {
        channel: {
          id: 'd3'
        }
      };

      expect(storeGetters.getItems(stores as StoresData, criteria)).toStrictEqual(expected);
    });

    it('returns array of stores with callable channel filter criteria', () => {
      const expected = [
        makeStore('1', 'store-1', 'd3', 'distribution channel 3'),
        makeStore('1', 'store-1', 's2', 'supply channel 2'),
        makeStore('2', 'store-2', 's2', 'supply channel 2'),
        makeStore('3', 'store-3', 'd3', 'distribution channel 3')
      ];

      const criteria = {
        channel: {
          id (value) {
            return value === 's2' || value === 'd3';
          }
        }
      };

      expect(storeGetters.getItems(stores as StoresData, criteria)).toStrictEqual(expected);
    });

    it('returns empty array for criteria mismatch', () => {
      const expected = [];

      const criteria = {
        store: {
          id: 'z1'
        }
      };

      expect(storeGetters.getItems(stores as StoresData, criteria)).toStrictEqual(expected);
    });

  });

  describe('getSelected', () => {

    it('returns selected store', () => {
      const expected = makeStore('3', 'store-3', 'd2', 'distribution channel 2');
      expect(storeGetters.getSelected(stores as StoresData)).toStrictEqual(expected);
    });

    it('returns undefined for invalid stores data', () => {
      expect(storeGetters.getSelected(null as StoresData)).toBeUndefined();
    });

    it('returns undefined for criteria mismatch', () => {
      const given = { ...stores, _selected: '5/z1' };
      expect(storeGetters.getSelected(given as StoresData)).toBeUndefined();
    });

  });

});
