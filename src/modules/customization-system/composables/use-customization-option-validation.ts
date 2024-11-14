import { computed, Ref, ref, watch } from '@vue/composition-api';
import { extend, ValidationProvider } from 'vee-validate';
import { email, required } from 'vee-validate/dist/rules';
import { ValidationRuleSchema, ValidationResult } from 'vee-validate/dist/types/types'

import { getFieldAnchorName } from 'theme/helpers/use-form-validation';

import { Customization } from '../types/customization.interface';
import { isEmailCustomization } from '../helpers/is-email-customization';

extend('required', {
  ...required,
  message: 'The \'{_field_}\' field is required'
});

extend('email', {
  ...email,
  message: 'Please, provide the correct email address'
});

export function useCustomizationOptionValidation (customization: Ref<Customization>) {
  const validationProvider = ref<InstanceType<typeof ValidationProvider> | null>(null);

  const validationRef = computed<string>(() => {
    const customizationValue = customization.value;
    return getFieldAnchorName(customizationValue.title || customizationValue.name);
  });

  const isFieldRequired = computed<boolean>(() => {
    return !!customization.value.optionData?.isRequired;
  });

  const validationRules = computed<Record<string, any>>(() => {
    const maxValueCount = customization.value.optionData?.maxValuesCount;

    const validationRules: Record<string, any> = {
      required: isFieldRequired.value,
      maxValueCount: maxValueCount &&
        maxValueCount > 1
        ? {
          max: maxValueCount
        }
        : false
    };

    if (isEmailCustomization(customization.value)) {
      validationRules.email = true;
    }

    return validationRules;
  });

  const validatedValue = ref<string | string[] | undefined>();

  const maxValueCountValidationRule = computed<ValidationRuleSchema>(() => {
    return {
      validate: (
        value: string | string[] | undefined,
        params: any
      ): boolean => {
        validatedValue.value = value;

        if (!params) {
          return true;
        }

        if (!value) {
          return true;
        }

        return value.length <= params.max;
      },
      params: ['max'],
      message: (
        field: string,
        params: Record<string, any>
      ): string => {
        if (!validatedValue.value || !params?.max) {
          return '';
        }

        if (Array.isArray(validatedValue.value)) {
          return `Maximum count for '${field}' is ${params.max}`;
        }

        return `'${field}' maximum length is ${params.max}`;
      }
    }
  });

  async function validateSilent (): Promise<ValidationResult> {
    if (validationProvider.value) {
      // TODO: temporary - current TS version don't handle `value` type right in this case
      return (validationProvider as any).value.validateSilent()
    }

    return {
      valid: true,
      errors: [],
      failedRules: {}
    };
  }

  function extendMaxValueCountValidationRule (): void {
    extend('maxValueCount', maxValueCountValidationRule.value);
  }

  extendMaxValueCountValidationRule();

  watch(
    maxValueCountValidationRule,
    () => extendMaxValueCountValidationRule
  );

  return {
    isFieldRequired,
    validateSilent,
    validationProvider,
    validationRef,
    validationRules
  }
}
