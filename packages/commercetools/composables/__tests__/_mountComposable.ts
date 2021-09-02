import { shallowMount } from '@vue/test-utils';
import { createComponent } from '@vue/composition-api';

const mountComposable = (composableFn) => {
  const component = createComponent({
    template: '<div>my component</div>',
    setup() {
      return composableFn();
    }
  });

  return shallowMount(component);
};

export default mountComposable;
