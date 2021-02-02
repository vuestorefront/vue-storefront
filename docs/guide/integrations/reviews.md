# Product Reviews

Starting with the 1.4.0 release, Vue Storefront is supporting Magento 2 product reviews. Unfortunately, the Magento 2 REST API doesn't contain any Reviews-related endpoints, so to make it work, you need to install an [additional Magento 2 module](https://github.com/divanteLtd/magento2-review-api).

Installation steps (in your Magento 2 directory):

```bash
composer config repositories.divante vcs https://github.com/divanteLtd/magento2-review-api.git
composer require divante/magento2-review-api:dev-master
php bin/magento setup:upgrade
```

You should be aware that Reviews are stored in the Elasticsearch. To display Reviews correctly, you need to update your [mage2vuestorefront](https://github.com/vuestorefront/mage2vuestorefront/) and run the Reviews sync:

```bash
node --harmony cli.js reviews
```
