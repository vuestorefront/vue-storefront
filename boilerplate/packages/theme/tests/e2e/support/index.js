/* eslint-disable no-undef */
// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands.js';
import 'cypress-pipe';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import addContext from 'mochawesome/addContext';

Cypress.on('test:after:run', (test, runnable) => {
  if (test.state === 'failed') {
    const screenshot = `assets/screenshots/${Cypress.spec.name}/${runnable.parent.title} -- ${test.title} (failed).png`;
    addContext({test}, {
      title: 'Screenshot',
      value: screenshot
    });
  }
});

