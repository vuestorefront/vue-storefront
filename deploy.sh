set -e

cd docs

npm run docs:build

cd .vuepress/dist

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:vuevixens/vuevixens.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:NataliaTepluhina/vue-storefront.git master:gh-pages

cd -
