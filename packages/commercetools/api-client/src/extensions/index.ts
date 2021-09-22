import { ApiClientExtension } from '@vue-storefront/core';
import { emailExtension } from './emailExtension';
import { internationalizationExtension } from './internationalizationExtension';
import { tokenExtension } from './tokenExtension';

/**
 * Returns integration extensions based on the environment mode.
 */
export function getExtensions(): ApiClientExtension[] {
  const extensions = [
    internationalizationExtension,
    tokenExtension
  ];

  if (process.env.NODE_ENV === 'development') {
    extensions.push(emailExtension);
  }

  return extensions;
}
