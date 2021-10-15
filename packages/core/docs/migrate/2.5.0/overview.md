# Upgrading to 2.5.0

## Introduction

In the 2.5.0 release, we changed the way of handling cookies on server side. Instead of generating them server side, now cookies are generated client side.

## Changes

In the 2.5.0 release, we've removed generating cookies for currency, locale and country on server side. Now those cookies are generated client side.
Please refer to [Integrators](./integrators.md) page for more info and code examples.
