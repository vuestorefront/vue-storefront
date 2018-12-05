# Product Reviews

Starting with 1.4.0 release Vue Storefront is supporting Magento2 product reviews. Unfortunately, Magento2 REST API doesn't contain any Reviews-related endpoints, so to make it work you need to install [additional Magento2 module](https://github.com/DivanteLtd/magento2-review-api).

Installation steps (in your Magento2 directory):

```bash
config repositories.divante vcs https://github.com/DivanteLtd/magento2-review-api.git
composer require divante/magento2-review-api:dev-master
php bin/magento setup:upgrade
```

You should be aware that Reviews are stored in the Elastic Search. To display Reviews correctly You need to update Your [mage2vuestorefront](https://github.com/DivanteLtd/mage2vuestorefront/) and run the Reviews sync:

```bash
node --harmony cli.js reviews
```
