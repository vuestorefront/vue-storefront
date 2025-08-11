import Vue, { VueConstructor } from 'vue';

declare module 'core/types/additional-content' {
  interface AdditionalContent {
    privacyPolicyAdditionalLinks?: { component: VueConstructor<Vue>, key: string }[],
    financialIncentivesLinks?: { component: VueConstructor<Vue>, key: string }[],
    footerLinks?: { component: VueConstructor<Vue>, key: string }[]
  }
}
