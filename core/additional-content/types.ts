import { Component } from 'vue';

export enum AdditionalContentOutlet {
  PRIVACY_POLICY_LINKS = 'privacy-policy-links',
  FOOTER_LINKS = 'footer-links',
  FINANCIAL_INCENTIVE_LINKS = 'financial-incentive-links'
}

export type AdditionalContentKey = `${string}:${string}`;

export interface AdditionalContentEntry {
  readonly key: AdditionalContentKey,
  readonly component: Component
}
