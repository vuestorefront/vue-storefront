<template>
  <div>
    <multiselect
      v-if="filterable"
      v-model="selected"
      :options="options"
      :searchable="false"
      :allow-empty="false"
      deselect-label="Can't remove this value"
      track-by="name"
      label="name"
      placeholder="Select your eCommerce platform"
    >
      <template
        slot="singleLabel"
        slot-scope="{ option }">
        {{ option.name }}
      </template>
    </multiselect>

    <div class="list">
      <IntegrationTile
        v-for="integration in integrations"
        :key="integration.key"
        v-bind="integration"
      />
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import IntegrationTile from './IntegrationTile.vue';

const tags = {
  BETA: 'Beta',
  CORE: 'From Core Team',
  ENTERPRISE: 'Enterprise',
  OPEN_SOURCE: 'Open Source'
}

const categories = {
  ANALYTICS: 'Analytics',
  AUTH: 'Authentication',
  CACHE: 'Cache',
  CMS: 'CMS',
  PAYMENT: 'Payment',
  REVIEWS: 'Reviews',
  SEARCH: 'Search'
};

export default {
  name: 'IntegrationList',

  props: {
    type: {
      type: String,
      required: true
    },
    filterable: {
      type: Boolean,
      required: false,
      default: false
    }
  },

  components: {
    Multiselect,
    IntegrationTile
  },

  data () {
    return {
      selected: null,
      tags,
      categories,
      options: [
        { name: 'Show all integrations', value: 'all' },
        { name: 'Commercetools', value: 'commercetools' }
      ],
      availableIntegrations: {
        eCommerce: [
          {
            name: 'commercetools',
            description: 'Commercetools, a next-generation commerce software company, has been named a “Leader in B2C commerce" in The Forrester Wave™: B2C Commerce Suites, Q2 2020 report. It provides a headless and API-focused eCommerce platform that gives retailers the flexibility needed to keep pace with fast-changing user behaviors.',
            link: '/v2/commercetools',
            image: '/v2/integrations-logos/commercetools.svg',
            tags: [  tags.OPEN_SOURCE, tags.ENTERPRISE, tags.CORE ]
          },
          {
            name: 'Magento',
            description: 'Magento is the world\'s #1 eCommerce Platform. Built on open source technology, it provides online merchants with a flexible shopping cart system, as well as control over the look, content and functionality, of their online stores.',
            link: 'https://docs.vuestorefront.io/magento',
            image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Magento_Logo.svg',
            tags: [ tags.OPEN_SOURCE, tags.CORE, tags.BETA ]
          },
          {
            name: 'Salesforce Commerce Cloud',
            description: 'Salesforce B2C Commerce is the industry-leading, cloud-based commerce solution for transforming shopping experiences across all digital channels. It provides a rich set of capabilities, including marketing, merchandising, content, promotions, customer service, fulfillment, and artificial intelligence.',
            link: 'https://docs.vuestorefront.io/sfcc',
            image: 'https://account.demandware.com/dwsso/XUI/themes/salesforce/images/2016sf_CommerceCloud_logo_RGB.png',
            tags: [ tags.BETA ]
          },
          {
            name: 'Spryker',
            description: 'Spryker is the modern eCommerce platform-as-a-service solution with over 800 API-based modules. Thanks to its easy extensibility, high performance, and fast time-to-market, Spryker is trusted by brands such as Toyota, Aldi, Hilti, Lekkerland, Hero, Rose Bikes, and Prym.',
            link: 'https://docs.vuestorefront.io/spryker',
            image: 'https://spryker.com/app/themes/spryker-website/dist/Components/NavigationFooter/Assets/logo-340a653dea.svg',
            tags: [ tags.OPEN_SOURCE, tags.BETA ]
          },
          {
            name: 'Shopify',
            description: 'Shopify is an easy-to-use and customizable eCommerce platform delivered in a SaaS model and dedicated to businesses of any scale. Shopify powers over one million businesses in more than 175 countries and is trusted by brands such as Allbirds, Gymshark, PepsiCo, and Staples.',
            link: '/v2/shopify',
            image: '/v2/integrations-logos/Shopify.svg',
            tags: [ tags.OPEN_SOURCE, tags.BETA ]
          },
          {
            name: 'Virto Commerce',
            link: '',
            image: 'https://tadviser.ru/images/3/3d/Virto_Commerce_logo.png',
            wip: true,
            tags: []
          },
          {
            name: 'BigCommerce',
            description: 'BigCommerce, launched in 2009, provides one of the most well-known SaaS eCommerce platforms in the world. Its features include multi-channel retailing, marketing automation, inventory control, and more, which earned her the recognition of 20000 customers worldwide.',
            link: '',
            image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/6023aa663109a7a8f995f095_BigCommerce-logo-dark.svg',
            wip: true,
            tags: []
          },
          {
            name: 'AboutYou',
            description: 'About You, initially known as a fashion marketplace, has matured to create a stream of revenue selling IT infrastructure for online retailers. About You Cloud is a Backbone-based platform that offers easy-to-use tools and APIs to handle complex business processes without implying any limitation in choosing the frontend.',
            link: '',
            image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/60c62f5a2d9aaf32e2f47a20_logo-commercesuite-vertical-default.svg',
            wip: true,
            tags: []
          },
          {
            name: 'Sylius',
            description: 'Sylius is an open-source eCommerce platform based on Symfony. Its main advantages are the flexibility, which removes the limitations standing in the way of scaling up business, and the community keen to help solve any problem. Its decoupled architecture also means there is no need to use the whole Sylius stack.',
            link: '',
            image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/5ed6275b7df0e61000941a54_sylius_logo.svg',
            wip: true,
            tags: []
          },
        ],
        other: [
          {
            name: 'Storyblok',
            description: 'Storyblok is a headless Content Management System that gives content creators with no coding skills the ability to work independently of a developer. It allows users to manage the content not only on the website but also on other platforms such as iOS and Android apps, IoT platforms, and even AR and VR through an API.',
            link: 'https://docs.vuestorefront.io/storyblok',
            image: '/v2/integrations-logos/Storyblok.svg',
            tags: [ tags.ENTERPRISE, tags.CORE, tags.OPEN_SOURCE ],
            categories: [ categories.CMS ]
          },
          {
            name: 'Amplience',
            description: 'Amplience is an API-first, headless content management system dedicated to both B2C and B2B commerce companies. It is used by enterprises such as Crate & Barrel, Tumi, Traeger Grills, Argos, OTTO Group, Primark, and Very Group, who appreciate its simplicity combined with powerful possibilities.',
            link: 'https://docs.vuestorefront.io/amplience',
            image: 'https://mma.prnewswire.com/media/1336916/Amplience_Logo.jpg?p=publish',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.CMS ]
          },
          {
            name: 'Contentstack',
            description: 'Contentstack is a CMS that enable the companies brands to deliver an integrated and continuous omnichannel digital experience across all touchpoints and devices. It is easy to integrate with your any external technologies without being bound to built-in preset tools.',
            link: 'https://docs.vuestorefront.io/contentstack',
            image: 'https://commercetools.com/wp-content/uploads/2019/08/contentstack-full-logo-color-jim-odlum.png',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.CMS ]
          },
          {
            name: 'Contentful',
            description: 'Contentful, the leading content platform for digital-first business, helps 28% of the Fortune 500 and thousands of brands around the world create and manage digital experiences for their customers across any channel. Contentful unifies content in a single hub, structures it for use in any digital channel, and integrates seamlessly with hundreds of other tools through open APIs.',
            link: 'https://docs.vuestorefront.io/contentful',
            image: '/v2/integrations-logos/Contentful.svg',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.CMS ]
          },
          {
            name: 'Bazaarvoice',
            link: './bazaarvoice.html',
            image: 'https://upload.wikimedia.org/wikipedia/en/6/6a/Bazaarvoice_logo.jpg',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.REVIEWS ]
          },
          {
            name: 'Redis',
            link: './redis-cache.html',
            image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Redis_Logo.svg',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.CACHE ]
          },
          {
            name: 'LexasCMS',
            description: 'An e-commerce focused headless CMS which combines a clean and intuitive content editing experience with an integrated set of personalisation, planning and visual preview tools. It enables businesses of all sizes to effortlessly plan, schedule and personalise content across multiple channels from a centralised content hub.',
            link: 'https://github.com/LexasCMS/vsf-next-lexascms',
            image: 'https://uploads-ssl.webflow.com/5e7cf661c23ac9df156d9c3d/600968c141eb1b7f86436e77_lexascms-logo.svg',
            tags: [ tags.OPEN_SOURCE ],
            categories: [ categories.CMS ]
          },
          {
            name: 'Checkout.com',
            description: 'Checkout.com empowers businesses to adapt, innovate, and thrive with the Connected Payments™ they deserve. The company’s technology makes payments seamless. Flexible solutions, granular data, and instant insights help global enterprises launch new products in new markets and create outstanding customer experiences.',
            link: 'https://www.npmjs.com/package/@vue-storefront/checkout-com',
            image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/602123835f640234fea926d5_checkout-logo.svg',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.PAYMENT ]
          },
          {
            name: 'Adyen',
            description: 'Adyen is an online payment system that provides modern infrastucture connecting businesses directly with payment card\'s systems such as Visa, Mastercard, Amex.',
            link: './adyen.html',
            image: '/v2/integrations-logos/Adyen.svg',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.PAYMENT ]
          },
          {
            name: 'Auth0',
            link: 'https://docs.vuestorefront.io/auth0',
            image: '/v2/integrations-logos/auth0.svg',
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.AUTH ]
          },
          {
            name: 'Bloomreach',
            description: 'Bloomreach is the leader in commerce experience™, powering brands representing 25% of US and UK e-commerce. Its flagship product, brX, is the only digital experience platform built specifically for B2B and B2C commerce businesses who want to grow their revenue online while delivering each of their customers a premium, personalized commerce experience.',
            link: '',
            image: '/v2/integrations-logos/bloomreach.png',
            wip: true,
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.AUTH ]
          },
          {
            name: 'Magnolia',
            description: 'Magnolia is a leading digital experience software company. We help brands outsmart their competition through better customer experiences and faster DX projects. Get full headless flexibility and seamless workflows across best-of-breed digital experience stacks.Global leaders such as Tesco, Avis, Generali and the New York Times all rely on Magnolia for maximum reliability, high-speed project implementation and exceptional omnichannel experiences.',
            link: '',
            image: 'https://uploads-ssl.webflow.com/5e90e5cd5f86784ad554a3c2/60c349629772875c3f75ec50_Magnolia-CMS-logo.svg',
            wip: true,
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.AUTH ]
          },
          {
            name: 'Recurly',
            link: '',
            image: '/v2/integrations-logos/Recurly.png',
            wip: true,
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.PAYMENT ]
          },
          {
            name: 'Algolia',
            description: 'Search-as-a-service and a full suite of APIs allow teams to easily develop tailored, fast Search and Discovery experiences that delight and convert.',
            link: '',
            image: '/v2/integrations-logos/algolia.svg',
            wip: true,
            tags: [ tags.ENTERPRISE, tags.CORE ],
            categories: [ categories.CMS, categories.SEARCH ]
          },
          {
            name: 'Adobe Experience Manager',
            link: '',
            image: 'https://www.rackspace.com/sites/default/files/styles/rxt_image/public/2020-11/AEM.png',
            wip: true,
            tags: [],
            categories: [ categories.CMS, categories.ANALYTICS ]
          }
        ]
      }
    }
  },

  computed: {
    integrations() {
      return this.availableIntegrations[this.type];
    }
  },

  watch: {
    selected() {
      this.filter();
    }
  },

  methods: {
    filter () {
      this.$children
      .filter(component => component.$options._componentTag === 'IntegrationTile')
      .forEach(integration => {
        if (this.selected.value === 'all') {
          integration.isVisible = true;
          return;
        }
        // empty list means compatibility with everything
        if (integration.compatibility.length === 0) {
          integration.isVisible = true;
          return;
        }
        const isCompatible = integration.compatibility.some(platform => platform === this.selected.value)
        integration.isVisible = isCompatible 
      })
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
.list {
  display: grid; 
  grid-auto-columns: 1fr; 
  grid-template-columns: 1fr 1fr; 
  gap: 20px 20px; 
  margin: 20px 0;
}

.multiselect {
  margin-bottom: 20px;
}

@media (max-width: 1023px) {
  .list {
    grid-template-columns: 1fr; 
  }
}
</style>
