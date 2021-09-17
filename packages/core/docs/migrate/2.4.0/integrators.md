# Migrating eCommerce integrations to 2.4.0

## Introduction

In 2.4.0, from the Integrator point of view, the most important change is a new `checkout.js` middleware - its main goal is to manage access to the checkout steps.

## Changes

- Added `checkout.js` middleware that integrators have to implement to prevent access to checkout steps when previous steps were not yet completed.
- Refactor naming and signatures of some of core factory functions.
- Refactor boilerplate getters.
