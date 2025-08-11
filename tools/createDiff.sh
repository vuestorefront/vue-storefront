#!/bin/sh

set -e

originalPath="$(pwd)"

cd "$(dirname "$0")"

cd ..

targetBranch="${1:-petsies-theme}"
themeTargetBranch="${2:-petsies-theme}"

git diff $(git merge-base HEAD "$targetBranch")..HEAD > changes.diff

cd "src/themes/petsies-capybara/"

git diff $(git merge-base HEAD "$themeTargetBranch")..HEAD --src-prefix=a/src/themes/petsies-capybara/ --dst-prefix=b/src/themes/petsies-capybara/ >> ../../../changes.diff

cd "$originalPath"
