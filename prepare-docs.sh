#!/bin/bash

git branch -D changeset-release/main
git fetch origin changeset-release/main:changeset-release/main
git checkout changeset-release/main
yarn
yarn prepare:docs
git add .
git commit -m "Prepare docs for release"
git push origin changeset-release/main
echo "Script execution completed."