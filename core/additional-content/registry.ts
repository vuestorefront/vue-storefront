import {
  ComputedRef,
  computed,
  ShallowRef,
  shallowRef
} from 'vue';

import {
  AdditionalContentEntry,
  AdditionalContentOutlet
} from './types';

type OutletEntries = Record<
  AdditionalContentOutlet,
  ShallowRef<readonly AdditionalContentEntry[]>
>;

export class AdditionalContentRegistry {
  private readonly entries: OutletEntries = {
    [AdditionalContentOutlet.PRIVACY_POLICY_LINKS]: shallowRef(
      Object.freeze([])
    ),
    [AdditionalContentOutlet.FOOTER_LINKS]: shallowRef(Object.freeze([])),
    [AdditionalContentOutlet.FINANCIAL_INCENTIVE_LINKS]: shallowRef(
      Object.freeze([])
    )
  };

  private readonly readonlyEntries: Record<
    AdditionalContentOutlet,
    ComputedRef<readonly AdditionalContentEntry[]>
  > = {
      [AdditionalContentOutlet.PRIVACY_POLICY_LINKS]: computed(
        () => this.entries[AdditionalContentOutlet.PRIVACY_POLICY_LINKS].value
      ),
      [AdditionalContentOutlet.FOOTER_LINKS]: computed(
        () => this.entries[AdditionalContentOutlet.FOOTER_LINKS].value
      ),
      [AdditionalContentOutlet.FINANCIAL_INCENTIVE_LINKS]: computed(
        () => this.entries[
          AdditionalContentOutlet.FINANCIAL_INCENTIVE_LINKS
        ].value
      )
    };

  public get (
    outlet: AdditionalContentOutlet
  ): ComputedRef<readonly AdditionalContentEntry[]> {
    return this.readonlyEntries[outlet];
  }

  public register (
    outlet: AdditionalContentOutlet,
    entries: AdditionalContentEntry | readonly AdditionalContentEntry[]
  ): void {
    const entriesToRegister: readonly AdditionalContentEntry[] =
      Array.isArray(entries) ? entries : [entries];
    const existingKeys = new Set(
      this.entries[outlet].value.map(entry => entry.key)
    );

    for (const entry of entriesToRegister) {
      if (!entry.key.includes(':')) {
        throw new Error(
          `Additional Content key "${entry.key}" must be namespaced.`
        );
      }

      if (existingKeys.has(entry.key)) {
        throw new Error(
          `Duplicate Additional Content key "${entry.key}" in outlet "${outlet}".`
        );
      }

      existingKeys.add(entry.key);
    }

    this.entries[outlet].value = Object.freeze([
      ...this.entries[outlet].value,
      ...entriesToRegister
    ]);
  }
}
