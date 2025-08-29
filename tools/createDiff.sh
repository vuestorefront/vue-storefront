#!/bin/sh

set -e

originalPath="$(pwd)"

cd "$(dirname "$0")"

cd ..

targetBranch="${1:-petsies-theme}"
themeTargetBranch="${2:-petsies-theme}"
moduleBraintreeTargetBranch="${3:-optimuspro}"

git diff $(git merge-base HEAD "$targetBranch")..HEAD > changes.diff

cd "src/themes/petsies-capybara/"

git diff $(git merge-base HEAD "$themeTargetBranch")..HEAD --src-prefix=a/src/themes/petsies-capybara/ --dst-prefix=b/src/themes/petsies-capybara/ >> ../../../changes.diff

cd "$originalPath"

cd "src/modules/payment-braintree"

git diff $(git merge-base HEAD "$moduleBraintreeTargetBranch")..HEAD --src-prefix=a/src/modules/payment-braintree/ --dst-prefix=b/src/modules/payment-braintree/ >> ../../../changes.diff

cd "$originalPath"
