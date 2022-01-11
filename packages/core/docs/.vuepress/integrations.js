const STATUSES = {
  WIP: 'In progress',
  ALPHA: 'Alpha',
  BETA: 'Beta',
  STABLE: 'Stable'
};

const AVAILABILITY = {
  ENTERPRISE: 'Enterprise',
  OPEN_SOURCE: 'Open Source'
};

const CATEGORIES = {
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
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ]
    },
    {
      name: 'Magento',
      link: 'https://docs.vuestorefront.io/magento',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed6279b8b992c23fd014f3b_Magento.svg',
      status: STATUSES.BETA,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Caravel', link: 'https://www.caravelx.com/' }
      ]
    },
    {
      name: 'Salesforce Commerce Cloud',
      link: 'https://docs.vuestorefront.io/sfcc',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed627707df0e6b720941b44_saleforce-commerce-cloud-logo%201.svg',
      status: STATUSES.BETA,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Forkpoint', link: 'https://forkpoint.com/' },
      ]
    },
    {
      name: 'SAP Commerce Cloud',
      link: '',
      image: '/v2/integrations-logos/sap.svg',
      status: STATUSES.WIP,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ]
    },
    {
      name: 'Spryker',
      link: 'https://docs.vuestorefront.io/spryker',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed62750bc49f087fcfc9fd1_spryker_logo.svg',
      status: STATUSES.BETA,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Spryker', link: 'https://spryker.com/en/' },
      ]
    },
    {
      name: 'Shopify',
      link: 'https://docs.vuestorefront.io/shopify',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed627658b992c5c98014d1c_Shopify_logo_2018%201.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Aureate Labs', link: 'https://aureatelabs.com/' },
      ]
    },
    {
      name: 'BigCommerce',
      link: '',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/6023aa663109a7a8f995f095_BigCommerce-logo-dark.svg',
      status: STATUSES.WIP,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: []
    },
    {
      name: 'Scayle',
      link: '',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/619388ed301d2921cba6a2ed_scayle%20logo-p-500.png',
      status: STATUSES.WIP,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: []
    },
    {
      name: 'Sylius',
      link: '',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed6275b7df0e61000941a54_sylius_logo.svg',
      status: STATUSES.WIP,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'BitBag', link: 'https://bitbag.io/' },
      ]
    },
    {
      name: 'WooCommerce',
      link: '',
      image: '/v2/integrations-logos/woocommerce.svg',
      status: STATUSES.WIP,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: []
    },
    {
      name: 'OpenCart',
      link: '',
      image: '/v2/integrations-logos/opencart.svg',
      status: STATUSES.WIP,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: []
    },
    {
      name: 'Vendure',
      link: 'https://docs.vuestorefront.io/vendure',
      image: '/v2/integrations-logos/vendure.png',
      status: STATUSES.BETA,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Jakub Andrzejewski', link: 'https://www.linkedin.com/in/jakub-andrzejewski/' },
      ]
    },
    {
      name: 'Odoo',
      link: '',
      image: '/v2/integrations-logos/odoo.svg',
      status: STATUSES.BETA,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'OdooGap', link: 'https://www.odoogap.com/' }
      ]
    },
    {
      name: 'PrestaShop',
      link: '',
      image: '/v2/integrations-logos/prestashop.svg',
      status: STATUSES.WIP,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Binshops', link: 'https://www.binshops.com/' }
      ]
    },
    {
      name: 'SpreeCommerce',
      link: 'https://docs.vuestorefront.io/spree/',
      image: '/v2/integrations-logos/spree.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Upside Lab', link: 'https://upsidelab.io/' }
      ]
    }
  ],
  other: [
    {
      name: 'Storyblok',
      link: 'https://docs.vuestorefront.io/storyblok',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed6227b6170c9985e071dc3_storyblok.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CMS ]
    },
    {
      name: 'Amplience',
      link: 'https://docs.vuestorefront.io/amplience',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed62250f722b86be30b5353_amplieance_logo%201.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CMS ]
    },
    {
      name: 'Contentstack',
      link: 'https://docs.vuestorefront.io/contentstack',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed621fa05af1d6c645af2ae_contentstack-logo-color%201.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CMS ]
    },
    {
      name: 'Contentful',
      link: 'https://docs.vuestorefront.io/contentful',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed622293c358c6d1e975830_contentful_logo%201.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CMS ]
    },
    {
      name: 'Bazaarvoice',
      link: './bazaarvoice.html',
      image: 'https://upload.wikimedia.org/wikipedia/en/6/6a/Bazaarvoice_logo.jpg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.REVIEWS ]
    },
    {
      name: 'Redis',
      link: './redis-cache.html',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Redis_Logo.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CACHE ]
    },
    {
      name: 'LexasCMS',
      link: 'https://github.com/LexasCMS/vsf-next-lexascms',
      image: 'https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/600968c141eb1b7f86436e77_lexascms-logo.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.OPEN_SOURCE,
      maintainedBy: [
        { name: 'LexasCMS', link: 'https://www.lexascms.com/' },
      ],
      categories: [ CATEGORIES.CMS ]
    },
    {
      name: 'Checkout.com',
      link: 'https://www.npmjs.com/package/@vue-storefront/checkout-com',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/602123835f640234fea926d5_checkout-logo.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.PAYMENT ]
    },
    {
      name: 'Adyen for commercetools',
      link: 'https://docs.vuestorefront.io/adyen',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed621cc6456318210a7d22b_Adyen_Corporate_Logo.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.PAYMENT ]
    },
    {
      name: 'Adyen for Magento 2',
      link: 'https://docs.vuestorefront.io/adyen/magento2/',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed621cc6456318210a7d22b_Adyen_Corporate_Logo.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.PAYMENT ]
    },
    {
      name: 'Auth0 for commercetools',
      link: 'https://docs.vuestorefront.io/auth0',
      image: '/v2/integrations-logos/auth0.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.AUTH ]
    },
    {
      name: 'Bloomreach Content',
      link: 'https://docs.vuestorefront.io/bloomreach/',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/609a7a69e04df518abce7c13_bloomreach-logo-horizontal.png',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CMS ]
    },
    {
      name: 'Bloomreach Discovery',
      link: 'https://docs.vuestorefront.io/bloomreach-search/',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/609a7a69e04df518abce7c13_bloomreach-logo-horizontal.png',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.SEARCH ]
    },
    {
      name: 'Sanity',
      link: 'https://docs.vuestorefront.io/sanity/',
      image: '/v2/integrations-logos/sanity.svg',
      status: STATUSES.STABLE,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CMS ]
    },
    {
      name: 'Recurly',
      link: '',
      image: '/v2/integrations-logos/Recurly.png',
      status: STATUSES.WIP,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.PAYMENT ]
    },
    {
      name: 'Algolia for commercetools',
      link: 'https://docs.vuestorefront.io/algolia',
      image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed620cebc49f091f5fc7571_logo-algolia-nebula-blue-full.svg',
      status: STATUSES.BETA,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.SEARCH ],
    },
    {
      name: 'Constructor.io for commercetools',
      link: '',
      image: '/v2/integrations-logos/constructor-io.svg',
      status: STATUSES.WIP,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.SEARCH ]
    },
    {
      name: 'Adobe Experience Manager',
      link: '',
      image: 'https://www.rackspace.com/sites/default/files/styles/rxt_image/public/2020-11/AEM.png',
      status: STATUSES.WIP,
      availability: AVAILABILITY.ENTERPRISE,
      maintainedBy: [
        { name: 'Vue Storefront', link: 'https://vuestorefront.io/' },
      ],
      categories: [ CATEGORIES.CMS, CATEGORIES.ANALYTICS ]
    }
  ]
};

module.exports = {
  STATUSES,
  AVAILABILITY,
  CATEGORIES,
  INTEGRATIONS
};
