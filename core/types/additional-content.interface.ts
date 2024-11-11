import Vue, { VueConstructor } from "vue";

export interface AdditionalContent {
  formLinks?: Array<{component: VueConstructor<Vue>, key: string}>,
  footerLinks?: Array<{component: VueConstructor<Vue>, key: string}> ,
  financialIncentivesLinks?: Array<{component: VueConstructor<Vue>, key: string}>
}