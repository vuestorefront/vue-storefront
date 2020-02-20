/* eslint-disable no-unused-vars, @typescript-eslint/no-unused-vars */
import { UseCategory } from '@vue-storefront/interfaces';
import { ref, Ref } from '@vue/composition-api';
import {
  Category,
  CategoryFilter
} from '@vue-storefront/boilerplate-api/src/types';
// Category-specific typings. s
// Those inetrfaces are just recommendations.
// Feel free to update them to match your platform specification.
type Search = (params: any) => void;
type AppliedFilters = Ref<CategoryFilter[]>;
type ApplyFilter = (filter: CategoryFilter | CategoryFilter[]) => void;
type ClearFilters = () => void;

function getCategory(params) {
  return [
    {
      id: 344481,
      path: '/mode',
      name: 'Mode',
      slug: 'mode',
      description: '',
      parentId: 0,
      rootlineIds: [344481],
      childrenIds: [344482, 344483],
      properties: [],
      isHidden: false,
      children: [
        {
          id: 344482,
          path: '/mode/herren',
          name: 'Herren',
          slug: 'herren',
          description: '',
          parentId: 344481,
          rootlineIds: [344481, 344482],
          childrenIds: [344484, 344485, 344486],
          properties: [],
          isHidden: false,
          children: [
            {
              id: 344484,
              path: '/mode/herren/hosen',
              name: 'Hosen',
              slug: 'hosen',
              description: '',
              parentId: 344482,
              rootlineIds: [344481, 344482, 344484],
              childrenIds: [],
              properties: [],
              isHidden: false,
              children: []
            },
            {
              id: 344485,
              path: '/mode/herren/oberbekleidung',
              name: 'Oberbekleidung',
              slug: 'oberbekleidung',
              description: '',
              parentId: 344482,
              rootlineIds: [344481, 344482, 344485],
              childrenIds: [],
              properties: [],
              isHidden: false,
              children: []
            },
            {
              id: 344486,
              path: '/mode/herren/accessoires',
              name: 'Accessoires',
              slug: 'accessoires',
              description: '',
              parentId: 344482,
              rootlineIds: [344481, 344482, 344486],
              childrenIds: [],
              properties: [],
              isHidden: false,
              children: []
            }
          ]
        },
        {
          id: 344483,
          path: '/mode/damen',
          name: 'Damen',
          slug: 'damen',
          description: '',
          parentId: 344481,
          rootlineIds: [344481, 344483],
          childrenIds: [344487, 344488, 344489],
          properties: [],
          isHidden: false,
          children: [
            {
              id: 344487,
              path: '/mode/damen/hosen',
              name: 'Hosen',
              slug: 'hosen',
              description: '',
              parentId: 344483,
              rootlineIds: [344481, 344483, 344487],
              childrenIds: [],
              properties: [],
              isHidden: false,
              children: []
            },
            {
              id: 344488,
              path: '/mode/damen/oberbekleidung',
              name: 'Oberbekleidung',
              slug: 'oberbekleidung',
              description: '',
              parentId: 344483,
              rootlineIds: [344481, 344483, 344488],
              childrenIds: [],
              properties: [],
              isHidden: false,
              children: []
            },
            {
              id: 344489,
              path: '/mode/damen/accessoires',
              name: 'Accessoires',
              slug: 'accessoires',
              description: '',
              parentId: 344483,
              rootlineIds: [344481, 344483, 344489],
              childrenIds: [],
              properties: [],
              isHidden: false,
              children: []
            }
          ]
        }
      ]
    }
  ];
}

export default function useCategory(): UseCategory<
  Category,
  Search,
  AppliedFilters,
  ApplyFilter,
  ClearFilters
  > {
  const categories: Ref<Category[]> = ref([]);
  const loading: Ref<boolean> = ref(true);
  const error: Ref<any> = ref(null);
  const appliedFilters: AppliedFilters = ref(null);
  const applyFilter: ApplyFilter = (filter) => {};
  const clearFilters: ClearFilters = () => {};

  const search: Search = (params) => {
    categories.value = getCategory(params);
    // load category based on Search Params
    loading.value = false;
  };

  return {
    categories,
    search,
    appliedFilters,
    applyFilter,
    clearFilters,
    loading,
    error
  };
}
