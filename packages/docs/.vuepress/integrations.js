const STATUS = {
  WIP: 'In progress',
  BETA: 'Beta',
  STABLE: 'Stable'
};

const LICENSE = {
  ENTERPRISE: 'Enterprise',
  OPEN_SOURCE: 'Open Source'
};

const CATEGORY = {
  ANALYTICS: 'Analytics',
  AUTH: 'Authentication',
  CACHE: 'Cache',
  CMS: 'CMS',
  PAYMENT: 'Payment',
  REVIEWS: 'Reviews',
  SEARCH: 'Search'
};

const INTEGRATIONS = {
  eCommerce: [
    {
      name: 'commercetools',
      link: 'https://docs.vuestorefront.io/v2/commercetools/',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed627806456312e2aa80da9_1.commercetools_primary-logo_horizontal_RGB.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ]
    },
    {
      name: 'Magento',
      link: 'https://docs.vuestorefront.io/magento',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed6279b8b992c23fd014f3b_Magento.svg',
      status: STATUS.BETA,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ]
    },
    {
      name: 'Salesforce Commerce Cloud',
      link: 'https://docs.vuestorefront.io/sfcc',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed627707df0e6b720941b44_saleforce-commerce-cloud-logo%201.svg',
      status: STATUS.BETA,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Forkpoint', link: 'https://forkpoint.com/' },
      ]
    },
    {
      name: 'SAP Commerce Cloud',
      link: '',
      image: '/v2/integrations-logos/sap.svg',
      status: STATUS.WIP,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ]
    },
    {
      name: 'Shopify',
      link: 'https://docs.vuestorefront.io/shopify',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed627658b992c5c98014d1c_Shopify_logo_2018%201.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ]
    },
    {
      name: 'BigCommerce',
      link: 'https://docs.vuestorefront.io/bigcommerce',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/6023aa663109a7a8f995f095_BigCommerce-logo-dark.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' }
      ]
    },
    {
      name: 'Scayle',
      link: '',
      image: '/v2/integrations-logos/scayle.svg',
      status: STATUS.WIP,
      license: LICENSE.ENTERPRISE,
      maintainedBy: []
    },
    {
      name: 'Sylius',
      link: '',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed6275b7df0e61000941a54_sylius_logo.svg',
      status: STATUS.BETA,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'BitBag', link: 'https://bitbag.io/' },
      ]
    },
    {
      name: 'WooCommerce',
      link: '',
      image: '/v2/integrations-logos/woocommerce.svg',
      status: STATUS.WIP,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: []
    },
    {
      name: 'OpenCart',
      link: '',
      image: '/v2/integrations-logos/opencart.svg',
      status: STATUS.WIP,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: []
    },
    {
      name: 'Vendure',
      link: 'https://docs.vuestorefront.io/vendure',
      image: '/v2/integrations-logos/vendure.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Jakub Andrzejewski', link: 'https://www.linkedin.com/in/jakub-andrzejewski/' },
      ]
    },
    {
      name: 'Odoo',
      link: 'https://docs.vuestorefront.io/odoo/',
      image: '/v2/integrations-logos/odoo.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'OdooGap', link: 'https://www.odoogap.com/' }
      ]
    },
    {
      name: 'PrestaShop',
      link: 'https://docs.vuestorefront.io/prestashop/',
      image: '/v2/integrations-logos/prestashop.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Binshops', link: 'https://www.binshops.com/' }
      ]
    },
    {
      name: 'Spree',
      link: 'https://docs.vuestorefront.io/spree/',
      image: '/v2/integrations-logos/spree.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Upside Lab', link: 'https://upsidelab.io/' }
      ]
    },
    {
      name: 'Elastic Path',
      link: '',
      image: '/v2/integrations-logos/elasticpath.svg',
      status: STATUS.WIP,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' }
      ]
    },
    {
      name: 'Swell',
      link: '',
      image: '/v2/integrations-logos/swell.svg',
      status: STATUS.WIP,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Swell', link: 'https://www.swell.is/' }
      ]
    },
    {
      name: 'Shopware PWA',
      link: 'https://shopware-pwa-docs.vuestorefront.io/',
      image: 'https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/5ea95f3130c7f0b4e33fb031_shopware_logo_blue.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Shopware', link: 'https://www.shopware.com/' }
      ]
    }
  ],
  other: [
    {
      name: 'Storyblok',
      link: 'https://docs.vuestorefront.io/storyblok',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed6227b6170c9985e071dc3_storyblok.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CMS ]
    },
    {
      name: 'Amplience',
      link: 'https://docs.vuestorefront.io/amplience',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed62250f722b86be30b5353_amplieance_logo%201.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CMS ]
    },
    {
      name: 'Contentstack',
      link: 'https://docs.vuestorefront.io/contentstack',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed621fa05af1d6c645af2ae_contentstack-logo-color%201.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CMS ]
    },
    {
      name: 'Contentful',
      link: 'https://docs.vuestorefront.io/contentful',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed622293c358c6d1e975830_contentful_logo%201.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CMS ],
    },
    {
      name: 'Bazaarvoice',
      link: './bazaarvoice.html',
      image: '/v2/integrations-logos/bazaarvoice.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.REVIEWS ]
    },
    {
      name: 'Redis',
      link: './redis-cache.html',
      image: '/v2/integrations-logos/redis.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CACHE ]
    },
    {
      name: 'LexasCMS',
      link: 'https://github.com/LexasCMS/vsf-next-lexascms',
      image: 'https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/600968c141eb1b7f86436e77_lexascms-logo.svg',
      status: STATUS.STABLE,
      license: LICENSE.OPEN_SOURCE,
      maintainedBy: [
        { name: 'LexasCMS', link: 'https://www.lexascms.com/' },
      ],
      categories: [ CATEGORY.CMS ]
    },
    {
      name: 'Checkout.com',
      link: [
        { name: 'commercetools', link: 'https://www.npmjs.com/package/@vue-storefront/checkout-com' }
      ],
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/602123835f640234fea926d5_checkout-logo.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.PAYMENT ]
    },
    {
      name: 'Adyen',
      link: [
        { name: 'commercetools', link: 'https://docs.vuestorefront.io/adyen/' },
        { name: 'Magento', link: 'https://docs.vuestorefront.io/adyen/magento2/' },
      ],
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed621cc6456318210a7d22b_Adyen_Corporate_Logo.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.PAYMENT ]
    },
    {
      name: 'PayPal',
      link: [
        { name: 'commercetools', link: 'https://docs.vuestorefront.io/paypal/commercetools' }
      ],
      image: 'https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/5eb01763b8d39cb1427e86f2_PayPal%201.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.PAYMENT ]
    },
    {
      name: 'Mollie',
      link: [
        { name: 'commercetools', link: 'https://docs.vuestorefront.io/mollie/commercetools' }
      ],
      image: '/v2/integrations-logos/mollie.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.PAYMENT ]
    },
    {
      name: 'Auth0',
      link: [
        { name: 'commercetools', link: 'https://docs.vuestorefront.io/auth0/' },
      ],
      image: '/v2/integrations-logos/auth0.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.AUTH ]
    },
    {
      name: 'Bloomreach Content',
      link: 'https://docs.vuestorefront.io/bloomreach/',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/609a7a69e04df518abce7c13_bloomreach-logo-horizontal.png',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CMS ]
    },
    {
      name: 'Bloomreach Discovery',
      link: 'https://docs.vuestorefront.io/bloomreach-search/',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/609a7a69e04df518abce7c13_bloomreach-logo-horizontal.png',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.SEARCH ]
    },
    {
      name: 'Sanity',
      link: 'https://docs.vuestorefront.io/sanity/',
      image: '/v2/integrations-logos/sanity.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CMS ]
    },
    {
      name: 'Algolia',
      link: [
        { name: 'commercetools', link: 'https://docs.vuestorefront.io/algolia' }
      ],
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed620cebc49f091f5fc7571_logo-algolia-nebula-blue-full.svg',
      status: STATUS.BETA,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.SEARCH ]
    },
    {
      name: 'Constructor.io',
      link: 'https://docs.vuestorefront.io/constructor-io/',
      image: '/v2/integrations-logos/constructor-io.svg',
      status: STATUS.STABLE,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.SEARCH ]
    },
    {
      name: 'Adobe Experience Manager',
      link: '',
      image: 'https://www.rackspace.com/sites/default/files/styles/rxt_image/public/2020-11/AEM.png',
      status: STATUS.WIP,
      license: LICENSE.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORY.CMS, CATEGORY.ANALYTICS ]
    }
  ]
};

module.exports = {
  STATUS,
  LICENSE,
  CATEGORY,
  INTEGRATIONS
};
