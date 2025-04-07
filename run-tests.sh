#!/bin/sh

set -e

cd "$(dirname "$0")"
cd "src/themes/petsies-capybara/e2e-tests"
yarn
npx playwright test