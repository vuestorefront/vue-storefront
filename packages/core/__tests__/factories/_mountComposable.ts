/* eslint-disable */

import { shallowMount, VueClass } from '@vue/test-utils';
import { createComponent } from '@vue/composition-api';

const mountComposable: any = (composableFn: Function) => {
  const component = createComponent({
    template: '<div>my component</div>',
    setup() {
      return composableFn();
    }
  });

  return shallowMount(component as VueClass<Vue>);
};

export default mountComposable;
