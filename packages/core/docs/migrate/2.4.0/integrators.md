# Migration guide 2.4.0 for Integrators

## Introduction

In 2.4.0, from the Integrator point of view, the most important change is a new `checkout.js` middleware - its main goal is to manage access to the checkout steps.

## Changes

- Added `checkout.js` middleware that integrators have to implement to prevent access to checkout steps when
previous steps were not yet completed
- Refactor boilerplate getters