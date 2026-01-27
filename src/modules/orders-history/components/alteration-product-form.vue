<template>
  <div
    class="alteration-product-form"
    v-if="showBlock"
  >
    <div
      class="_heading-container"
      @click="onHeadingClick"
    >
      <SfHeading
        class="_heading"
        :level="5"
        :title="$t('Upgrades Available')"
      />

      <div
        class="_toggle-content"
        :class="{'-expanded': isExpanded}"
      >
        <SfChevron />
      </div>
    </div>

    <div
      class="_content"
      :class="{'-expanded': isExpanded}"
      :style="contentStyle"
      ref="contentBlock"
    >
      <div
        class="_customization"
        v-for="customization in visibleCustomizations"
        :key="customization.id"
      >
        <customization-option
          class="_customization-option"
          :customization="customization"
          :is-disabled="isSomeEntityBusy"
          :option-values="customizationAvailableOptionValues[customization.id]"
          :product-id="orderItem.product.id"
          :value="customizationOptionValue[customization.id]"
          :disable-validation="true"
          :values-in-cart="addedToCartOptionValuesIds"
          @input="onCustomizationOptionInput"
          @customization-option-busy-state-changed="onEntityBusyChanged"
        />
      </div>

      <div class="_buttons">
        <SfButton
          class="_add-to-cart color-primary"
          @click="onAddToCart"
        >
          {{ $t('Add to Cart') }}
        </SfButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  ref,
  toRefs
} from '@vue/composition-api';
import { SfButton, SfHeading, SfChevron } from '@storefront-ui/vue';

import {
  Customization,
  CustomizationOptionValue,
  CustomizationStateItem,
  OptionValue,
  requiredCustomizationsFilter,
  useAvailableCustomizations,
  useCustomizationsFilter,
  useCustomizationsOptionsDefaultValue,
  useCustomizationState,
  useEntityBusyState,
  useOptionValueActions,
  WidgetType
} from 'src/modules/customization-system';

import CustomizationOption from 'theme/components/customization-system/customization-option.vue';

import { OrderItem } from '../types/order-item';

function extractSelectedOptionValuesIdsFromOrderItem (
  customizationStates: CustomizationStateItem[] | undefined
): Set<string> {
  const ids = new Set<string>();

  if (!customizationStates) {
    return ids;
  }

  for (const stateItem of customizationStates) {
    const value = stateItem.value;

    if (typeof value === 'string') {
      ids.add(value);
    } else if (Array.isArray(value)) {
      for (const v of value) {
        if (typeof v === 'string') {
          ids.add(v);
        }
      }
    }
  }

  return ids;
}

function canOrderItemHaveUpgrades (orderItem: OrderItem): boolean {
  return true;
}

export default defineComponent({
  name: 'AlterationProductForm',
  components: {
    CustomizationOption,
    SfButton,
    SfChevron,
    SfHeading
  },
  props: {
    orderItem: {
      type: Object as PropType<OrderItem>,
      required: true
    }
  },
  setup (props) {
    const { orderItem } = toRefs(props);
    const isExpanded = ref(false);
    const contentBlock = ref<HTMLElement | null>(null);

    const addedToCartOptionValuesIds = ref<string[]>([]);
    const customizations = ref<Customization[]>([
      {
        'availabilityRules': null,
        'bundleOptionId': 47,
        'optionData': {
          'isRequired': true,
          'previewUrl': null,
          'values': [
            {
              'id': 'production_time_selector_standard_option',
              'isEnabled': true,
              'isDefault': false,
              'sn': 0
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 223,
              'thumbnailAlt': null,
              'bundleOptionItemId': 139,
              'description': null,
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 59,
              'isEnabled': true,
              'name': 'Rush Production',
              'id': '5d31b99a-aadf-4233-b2da-519e99a5c4f2',
              'sn': 1,
              'sku': 'basic_rush_forevers',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': null
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 224,
              'thumbnailAlt': null,
              'bundleOptionItemId': 140,
              'description': '<p>Super Rush</p>',
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 99,
              'isEnabled': true,
              'name': 'Super Rush Production',
              'id': 'a87a0f20-c642-49ea-b1f3-987333e85eff',
              'sn': 2,
              'sku': 'super_rush_forevers',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': null
            }
          ],
          'maxValuesCount': 1,
          'description': null,
          'hasGalleryImages': false,
          'type': 'production_time_upgrade',
          'hint': '*We will refund the rush fee in the unlikely event we do not meet a promised delivery date.',
          'showInUrlQuery': false,
          'displayWidgetOptions': null,
          'sku': null,
          'hasDetailedDescription': false,
          'displayWidgetId': '02f86c77-6f81-47d8-8569-1f0c6925c889',
          'displayWidget': 'dropdown'
        },
        'variants': null,
        'title': null,
        'type': 'option',
        'parentId': '776b9342-1944-4091-ac21-982d33f977f4',
        'showInCart': true,
        'isEnabled': true,
        'isLocked': false,
        'name': 'Production Time',
        'id': '41e15369-158f-4497-a66f-7b200f2fd96b',
        'sn': 1
      } as any,
      {
        'availabilityRules': null,
        'bundleOptionId': 34,
        'optionData': {
          'isRequired': false,
          'previewUrl': null,
          'values': [
            {
              'specialPriceFromDate': '2024-12-05 00:00:00',
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 189,
              'thumbnailAlt': '',
              'bundleOptionItemId': 138,
              'description': '<p data-pm-slice="1 1 []">Celebrate your love for your furry family member with our beautiful wooden sign. Measures 4.5"x4".</p>\r\n<p>Mailed within 3-5 days.&nbsp;</p>',
              'isDefault': false,
              'specialPriceToDate': '2024-12-10 00:00:00',
              'price': 12,
              'isEnabled': true,
              'name': 'Dogs Leave Footprints Sign',
              'id': '21f11e3d-5295-4380-846d-a2ea1f6f277e',
              'sn': 3,
              'sku': 'wood_ornament_dog',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': '/catalog/product/w/o/wood_ornament_dog.png'
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 109,
              'thumbnailAlt': '',
              'bundleOptionItemId': 136,
              'description': "<p>Get a preview photo of your plush. Includes a few rounds of changes based on your feedback. If you still don't love it after the changes, this upgrade allows for refunds. May extend production time.&nbsp;</p>\r\n<p><sup>Please provide feedback within 72 hours of receiving your sneak peek or it will auto approve.&nbsp;</sup></p>",
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 89,
              'isEnabled': true,
              'name': 'Sneak Peek + Design Guarantee',
              'id': '3749739b-153e-40f2-bcbe-4ca97b5ab192',
              'sn': 1,
              'sku': 'sneak_peek',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': '/catalog/product/s/n/sneak_peek_petsies.png'
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': {
                'forActivatedOptionValueIds': [
                  '0c622f18-ecb1-4a2f-98da-7c8b50e3e9b8',
                  '7f33ecf2-1ec5-4e2b-82f4-2505aae100bc'
                ]
              },
              'productId': 604,
              'thumbnailAlt': '',
              'bundleOptionItemId': 945,
              'description': '<p><strong>For 16" &amp; 24" Only!</strong>&nbsp;Adorable paw pads that are made of silicone to create the perfect toe beans for your Petsies.</p>',
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 10,
              'isEnabled': true,
              'name': 'Toe Beans',
              'id': '6646d2a9-df4b-43db-836b-41a2372295fd',
              'sn': 5,
              'sku': 'toe_beans',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': '/catalog/product/t/o/toe_beans_on.png'
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 711,
              'thumbnailAlt': '',
              'bundleOptionItemId': 950,
              'description': '<p><span style="vertical-align: inherit;"><span style="vertical-align: inherit;">Bring your plush to life by adding a realistic heartbeat with our heart-shaped sound module insert!&nbsp;</span></span></p>',
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 13,
              'isEnabled': true,
              'name': 'Heartbeat Sound Insert',
              'id': '6fdc5fcb-c389-429e-b481-c8a9e63cbe38',
              'sn': 6,
              'sku': 'heartbeat_insert',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': '/catalog/product/h/e/heart_module_1.png'
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 229,
              'thumbnailAlt': null,
              'bundleOptionItemId': 155,
              'description': '<p>A lovely way to proudly display your Petsies keepsake in your home. Litho laminate woodgrain. Made from approx 30% recycled paper. Free for a limited time. 8"x15"x1.5"</p>',
              'isDefault': false,
              'specialPriceToDate': null,
              'price': null,
              'isEnabled': false,
              'name': 'Petsies Display Tray',
              'id': 'af020536-99d4-4007-aa11-cba1ecf60f3f',
              'sn': 4,
              'sku': 'display_tray',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': null
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 63,
              'thumbnailAlt': '',
              'bundleOptionItemId': 170,
              'description': '<p>Record up to 10 secs.&nbsp;Record any custom sound: from a lullaby to a marriage proposal. Comes with sewn-in pouch!<br />Please note: we can only accommodate 1 pocket per plush so if you select this option, you cannot select other sew-in options.</p>',
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 15,
              'isEnabled': true,
              'name': 'Voice Recorder + Sewn-in Pouch',
              'id': 'c47b8589-4127-4aad-b24a-6e31073cde7c',
              'sn': 5,
              'sku': 'recordable_voice',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': '/catalog/product/v/o/voice_recorder_upgrade_no_button.png'
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 156,
              'thumbnailAlt': '',
              'bundleOptionItemId': 137,
              'description': '<p>A zippered pocket for memories of your pet. Many Petsies customers request a custom pet memorial to store and treasure their past pet&rsquo;s ashes. Please note, we can only accommodate 1 pocket per Petsies plush.&nbsp;</p>',
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 15,
              'isEnabled': true,
              'name': 'Memory Pocket',
              'id': 'ccf4ee79-7c5f-433a-bb8f-a0cc4bcc41ff',
              'sn': 2,
              'sku': 'memory_pocket',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': '/catalog/product/m/e/memory_pocket_1.png'
            },
            {
              'specialPriceFromDate': null,
              'attachmentUrl': null,
              'color': null,
              'availabilityRules': null,
              'productId': 606,
              'thumbnailAlt': '',
              'bundleOptionItemId': 812,
              'description': '<p>A stainless steel pellet-filled insert, hand-sewn into the body of the plush.&nbsp;2lbs for 16" and 24", 0.5 lb for 10".&nbsp;</p>',
              'isDefault': false,
              'specialPriceToDate': null,
              'price': 20,
              'isEnabled': true,
              'name': 'Weighted Plush',
              'id': 'fc228175-d101-495e-bec7-4e986fe65fda',
              'sn': 7,
              'sku': 'weighted_plushies',
              'specialPrice': 0,
              'actions': null,
              'thumbnailUrl': '/catalog/product/w/e/weighted_plushies.png'
            }
          ],
          'maxValuesCount': 0,
          'description': 'Make your Plush even more special with these common add-ons',
          'hasGalleryImages': false,
          'type': 'generic_option',
          'hint': null,
          'showInUrlQuery': false,
          'displayWidgetOptions': {
            'shape': 'square',
            'alignment': 'left'
          },
          'sku': null,
          'hasDetailedDescription': false,
          'displayWidgetId': '466d89dc-95ad-4c23-a655-e51c99ec515f',
          'displayWidget': 'cards_list'
        },
        'variants': null,
        'title': 'Upgrade Your Plush (optional)',
        'type': 'option',
        'parentId': '776b9342-1944-4091-ac21-982d33f977f4',
        'showInCart': true,
        'isEnabled': true,
        'isLocked': false,
        'name': 'Addons',
        'id': '21123ec1-6560-49c9-8ee6-c0500d756dd5',
        'sn': 2
      } as any as Customization
    ]);

    // TODO: for test
    let firstItemIdx = 0;
    if (Math.random() > 0.5) {
      (customizations as any).value[0].sn = 2;
      (customizations as any).value[1].sn = 1;
      firstItemIdx = 1;
    }
    const contentStyle = ref<Record<string, string>>({
      '--content-max-height': '100%',
      '--content-max-height-collapsed': (customizations as any).value[firstItemIdx].optionData?.displayWidget === WidgetType.CARDS_LIST ? '400px' : '180px'
    });

    const productCustomizations = computed<Customization[]>(() => {
      return (customizations as any).value;
    });

    const productCustomization = computed<Record<string, Customization>>(() => {
      const dictionary: Record<string, Customization> = {};

      for (const customization of productCustomizations.value) {
        dictionary[customization.id] = customization;
      }

      return dictionary;
    });

    const selectedOptionValuesIdsFromOrderItem = computed<Set<string>>(() => {
      return extractSelectedOptionValuesIdsFromOrderItem(
        orderItem.value.extension_attributes?.customization_states
      );
    });

    const {
      addCustomizationOptionValue,
      customizationOptionValue,
      removeCustomizationOptionValue,
      selectedOptionValuesIds: formSelectedOptionValuesIds,
      updateCustomizationOptionValue
    } = useCustomizationState(ref(undefined));

    const selectedOptionValuesIds = computed<string[]>(() => {
      const combined = new Set<string>([
        ...formSelectedOptionValuesIds.value,
        ...selectedOptionValuesIdsFromOrderItem.value
      ]);

      return Array.from(combined);
    });

    const {
      availableCustomizations,
      customizationAvailableOptionValues: rawCustomizationAvailableOptionValues
    } = useAvailableCustomizations(
      productCustomizations,
      selectedOptionValuesIds,
      customizationOptionValue,
      updateCustomizationOptionValue
    );

    const customizationAvailableOptionValues = computed<Record<string, OptionValue[]>>(() => {
      const result: Record<string, OptionValue[]> = {};
      const alreadySelected = selectedOptionValuesIdsFromOrderItem.value;

      for (const customizationId of Object.keys(rawCustomizationAvailableOptionValues.value)) {
        const values = rawCustomizationAvailableOptionValues.value[customizationId] || [];

        result[customizationId] = values.filter(
          (optionValue) => !alreadySelected.has(optionValue.id)
        );
      }

      return result;
    });

    const { executeActionsByCustomizationIdAndCustomizationOptionValue } =
      useOptionValueActions(
        productCustomizations,
        productCustomization,
        customizationAvailableOptionValues,
        updateCustomizationOptionValue,
        removeCustomizationOptionValue,
        addCustomizationOptionValue
      );

    const { isSomeEntityBusy, onEntityBusyChanged } = useEntityBusyState();

    function onCustomizationOptionInput (payload: {
      customizationId: string,
      value: CustomizationOptionValue
    }) {
      updateCustomizationOptionValue(payload);
      executeActionsByCustomizationIdAndCustomizationOptionValue(payload);

      if (!isExpanded.value) {
        onHeadingClick();
      }
    }

    useCustomizationsOptionsDefaultValue(
      availableCustomizations,
      customizationAvailableOptionValues,
      customizationOptionValue,
      onCustomizationOptionInput
    );

    const { filteredCustomizations } = useCustomizationsFilter(
      availableCustomizations,
      customizationAvailableOptionValues,
      [requiredCustomizationsFilter]
    );

    const visibleCustomizations = computed<Customization[]>(() => {
      return filteredCustomizations.value.filter((customization) => {
        const availableValues = customizationAvailableOptionValues.value[customization.id] || [];

        return availableValues.length > 0;
      });
    });

    const showBlock = computed<boolean>(() => {
      if (!canOrderItemHaveUpgrades(orderItem.value)) {
        return false;
      }

      if ((customizations as any).value.length === 0) {
        return false;
      }

      return true;
    });

    async function onHeadingClick () {
      if (!(contentBlock as any).value) {
        return;
      }

      if (!isExpanded.value) {
        contentStyle.value['--content-max-height'] = `${(contentBlock as any).value.scrollHeight}px`;
      }

      await nextTick();
      isExpanded.value = !isExpanded.value
    }

    function onAddToCart () {
      // TODO: mock
      (addedToCartOptionValuesIds as any).value = [];
      for (const optionValueId of formSelectedOptionValuesIds.value) {
        (addedToCartOptionValuesIds as any).value.push(optionValueId);
      }
    }

    return {
      addedToCartOptionValuesIds,
      onAddToCart,
      contentBlock,
      onHeadingClick,
      contentStyle,
      isExpanded,
      customizationAvailableOptionValues,
      customizationOptionValue,
      isSomeEntityBusy,
      onCustomizationOptionInput,
      onEntityBusyChanged,
      showBlock,
      visibleCustomizations
    };
  }
});
</script>

<style lang="scss" scoped>
.alteration-product-form {
  ._heading-container {
    display: flex;
    align-items: center;
    column-gap: var(--spacer-2xs);
    margin-bottom: var(--spacer-sm);
  }

  ._heading {
    --heading-title-font-size: var(--font-base);
    --heading-title-font-weight: var(--font-semibold);
    --heading-title-margin: 0;
    --heading-padding: 0;

    text-align: left;
  }

  ._form-errors {
  }

  ._content {
    display: flex;
    flex-direction: column;
    row-gap: var(--spacer-base);
    max-height: var(--content-max-height-collapsed);
    overflow: hidden;
    will-change: max-height;
    transition: max-height 0.3s ease;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 24px;
      box-shadow: inset 0 -12px 12px 4px var(--c-white);
    }

    &.-expanded {
      max-height: var(--content-max-height);

      &::after {
        display: none;
      }
    }
  }

  ._toggle-content {
      width: 45px;
      display: flex;
      align-items: flex-start;
      justify-content: center;
      cursor: pointer;

      &.-expanded {
        .sf-chevron {
            rotate: 180deg;
         }
      }
   }

  ._buttons {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--spacer-base);
  }

  ._customization-option {
    --customization-option-align-items: flex-start;
    --customization-option-label-align: left;
    --customization-option-label-weight: var(--font-medium);
    --customization-option-label-size: var(--font-base);
    --customization-option-description-align: left;
    --customization-option-hint-align: left;
  }

  ._empty {
    color: var(--c-gray);
    font-size: var(--font-sm);
    font-style: italic;
  }
}
</style>
