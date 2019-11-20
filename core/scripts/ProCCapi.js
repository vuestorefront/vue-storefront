const path = require('path')
const bodyParser = require('body-parser');
const apiStatus = require('./utils/api-status')
const Store = require('data-store')
const _ = require('lodash')
const storefront = new Store({path: path.resolve('./config/production.json')});

module.exports = (config, app) => {
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.get('/health', (req, res) => {
    try {
      return apiStatus(res, 'ProCC VSF Online', 200);
    } catch (e) {
      return apiStatus(res, e, 502);
      // return apiStatus(res, 'ERROR ProCC VSF-API Not Connected', 502);
    }
  })

  app.post('/create-store', (req, res) => {
    let storeData = req.body;
    let mapStoreUrlsFor = storefront.get('storeViews.mapStoreUrlsFor');
    let store_data = {
      storeCode: storeData.storefront_url,
      storeName: _.startCase(storeData.magento_store_name),
      disabled: false,
      storeId: parseInt(storeData.magento_store_id),
      name: _.startCase(storeData.magento_store_name),
      url: `/${storeData.storefront_url}`,
      elasticsearch: {
        host: 'https://store.procc.co/api/catalog',
        index: `vue_storefront_catalog_${_.snakeCase(storeData.storefront_url)}`
      },
      tax: {
        defaultCountry: 'BG',
        defaultRegion: '',
        calculateServerSide: true,
        sourcePriceIncludesTax: false
      },
      i18n: {
        fullCountryName: 'Bulgaria',
        fullLanguageName: 'Bulgarian',
        defaultCountry: 'BG',
        defaultLanguage: 'EN',
        defaultLocale: 'en-US',
        currencyCode: 'EUR',
        currencySign: 'EUR',
        dateFormat: 'HH:mm D-M-YYYY'
      }
    }
    let storefront_setting = storeData.storefront_setting
    // Main Image Object
    let storeMainImage = {
      'working_hours': storefront_setting.working_hours,
      'title': storefront_setting.banner.title,
      'subtitle': storefront_setting.banner.subtitle,
      'logo': storefront_setting.store_logo.original,
      'link': storefront_setting.banner.link,
      'image': storefront_setting.banner.banner_photo.optimized,
      'contact_information': storefront_setting.contact_information,
      'about_text': storefront_setting.about_text,
      'brand': storeData.brand._id,
      'is_cc_store': storeData.brand.is_cc
    };
    // Main Banners and store categories and store policies
    const mainImage = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/banners/${store_data.storeCode}_main-image.json`)});
    const StoreCategories = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/banners/${store_data.storeCode}_store_categories.json`)});
    const storePolicies = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/policies/${store_data.storeCode}_store_policies.json`)});
    // If Store has then delete store related all the data
    if ((storefront.has(`storeViews.${store_data.storeCode}`))) {
      storefront.del(`storeViews.${store_data.storeCode}`);
      mainImage.unlink();
      StoreCategories.unlink();
    }
    // start set the store config file
    if ((storefront.has(`storeViews.${store_data.storeCode}`))) {
      storefront.del(`storeViews.${store_data.storeCode}`);
      // mainImage.unlink();
      // StoreCategories.unlink();
    }
    if ((!_.includes(mapStoreUrlsFor, store_data.storeCode)) || (!_.includes(storefront.get('storeViews.mapStoreUrlsFor'), store_data.storeCode))) {
      // set value in mapStoreUrlsFor
      mapStoreUrlsFor = _.concat(mapStoreUrlsFor, store_data.storeCode)
      storefront.set('storeViews.mapStoreUrlsFor', mapStoreUrlsFor);
    }
    storefront.set(`storeViews.${store_data.storeCode}`, store_data);
    // end set store config file
    // start set store categories main Banner and samll Banners
    // let magentoStoreCategories = _.take(_.orderBy(_.filter(storeData.store_categories, {'isCategoryCreatedInMagento': true}), 'createdAt', 'desc'), 3);
    let magentoStoreCategories = _.take(_.orderBy(_.filter(storeData.store_category, {'isCategoryCreatedInMagento': true}), 'createdAt', 'desc'), 6)
    let countCategories = magentoStoreCategories.length;
    let mainBanners = [];
    let smallBanners = [];
    if (countCategories >= 1) {
      mainBanners = [
        {
          'title': magentoStoreCategories[0].name,
          'subtitle': magentoStoreCategories[0].description,
          'image': magentoStoreCategories[0].cover_photo.optimized,
          'link': '/' + _.kebabCase(magentoStoreCategories[0].name),
          'storeCode': storeData.storefront_url,
          'productCount': magentoStoreCategories[0].products.length,
          'category_id': parseInt(magentoStoreCategories[0].magento_category_id)
        }
      ];
      if (countCategories >= 2) {
        smallBanners = [
          {
            'title': magentoStoreCategories[1].name,
            'subtitle': magentoStoreCategories[1].description,
            'image': magentoStoreCategories[1].cover_photo.optimized,
            'link': '/' + _.kebabCase(magentoStoreCategories[1].name),
            'storeCode': storeData.storefront_url,
            'productCount': magentoStoreCategories[1].products.length,
            'category_id': parseInt(magentoStoreCategories[1].magento_category_id)
          }
        ]
        if (countCategories >= 3) {
          smallBanners.push({
            'title': magentoStoreCategories[2].name,
            'subtitle': magentoStoreCategories[2].description,
            'image': magentoStoreCategories[2].cover_photo.optimized,
            'link': '/' + _.kebabCase(magentoStoreCategories[2].name),
            'storeCode': storeData.storefront_url,
            'productCount': magentoStoreCategories[2].products.length,
            'category_id': parseInt(magentoStoreCategories[2].magento_category_id)
          });
        }
      }
      StoreCategories.set('mainBanners', mainBanners);
      StoreCategories.set('smallBanners', smallBanners);
    }
    // end set store categories main Banner and small Banner
    // set Main Image
    mainImage.set('image', storeMainImage)

    let policies = []

    if (!_.isUndefined(storefront_setting.privacy_policy) && !_.isNull(storefront_setting.privacy_policy)) {
      policies.push(storefront_setting.privacy_policy.policy);
    }

    if (!_.isUndefined(storefront_setting.shipping_policy) && !_.isNull(storefront_setting.shipping_policy)) {
      policies.push(storefront_setting.shipping_policy.policy);
    }

    if (!_.isUndefined(storefront_setting.warranty_policy) && !_.isNull(storefront_setting.warranty_policy)) {
      policies.push(storefront_setting.warranty_policy.policy);
    }

    storePolicies.set('policy', policies);
    apiStatus(res, 'Vue Storefront: Custom Call found', 200)
  })
  app.post('category-link', (req, res) => {
    // start set to product banners link in vue storefront
    let children_data = req.body.children_data
    let storeCode = req.body.storeCode
    const StoreCategories = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/banners/${storeCode}_store_categories.json`)});
    let MainBanners = !_.isUndefined(StoreCategories.get('mainBanners')) ? StoreCategories.get('mainBanners') : [];
    let TopAndBottomSideBanners = _.isUndefined(StoreCategories.get('smallBanners')) ? StoreCategories.get('smallBanners') : [];
    if (children_data.length >= 1 && MainBanners.length > 0) {
      MainBanners[0].link = `/${_.get(_.find(children_data, ['name', _.get(_.find(MainBanners, 'title'), 'title')]), 'url_path')}`;
      StoreCategories.set('mainBanners', MainBanners);
      if (children_data.length >= 2 && TopAndBottomSideBanners.length > 0) {
        TopAndBottomSideBanners[0].link = `/${_.get(_.find(children_data, ['name', _.get(_.find(TopAndBottomSideBanners, 'title'), 'title')]), 'url_path')}`;
        StoreCategories.set('smallBanners', TopAndBottomSideBanners);
        if (children_data.length >= 3 && TopAndBottomSideBanners.length > 1) {
          TopAndBottomSideBanners[1].link = `/${_.get(_.find(children_data, ['name', _.get(_.find(TopAndBottomSideBanners, 'title'), 'title')]), 'url_path')}`;
          StoreCategories.set('smallBanners', TopAndBottomSideBanners);
        }
      }
    }
    apiStatus(res, 'Vue Storefront: Custom Call found', 200)
    // end set to product banners
  })
  app.post('product-link', (req, res) => {
    // start set to product banners link in vue storefront
    let products = req.body.products;
    let storeCode = req.body.storeCode
    const StoreCategories = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/banners/${storeCode}_store_categories.json`)});
    let productBanners = [];
    let category_ids = [];
    if (StoreCategories.has('mainBanners')) {
      category_ids.push(StoreCategories.get('mainBanners.0.category_id'));
    }
    if (StoreCategories.has('smallBanners')) {
      category_ids.push(StoreCategories.get('smallBanners.0.category_id'));
    }
    if (StoreCategories.has('smallBanners')) {
      category_ids.push(StoreCategories.get('smallBanners.1.category_id'));
    }
    _.forEach(products, (product) => {
      if (_.includes(category_ids, _.get(_.find(_.get(product, '_source.category'), 'category_id'), 'category_id'))) {
        let link = !_.isUndefined(product._source.url_path) ? product._source.url_path : product._source.url_key;
        let Banner = {
          'title': product._source.name,
          'subtitle': product._source.description,
          'image': config.magento2.imgUrl + product._source.image, // need to magento url which is in config of api
          'link': `/p/${product._source.sku}/${link}`,
          'category': product._source.category
        };
        productBanners.push(Banner);
      }
    });
    StoreCategories.set('productBanners', productBanners);
    apiStatus(res, 'Vue Storefront: Custom Call found', 200)
    // end set to product banners
  })
  app.post('disable-store', (req, res) => {
    let storeData = req.body.storeData;
    let status = storeData.status;
    if (storefront.has(`storeViews.${storeData.store_code}.disabled`)) {
      storefront.set(`storeViews.${storeData.store_code}.disabled`, status)
    }
    apiStatus(res, 200);
  })
  app.post('delete-store', (req, res) => {
    let storeData = req.body
    const mainImage = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/banners/${storeData.storeCode}_main-image.json`)});
    const StoreCategories = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/banners/${storeData.storeCode}_store_categories.json`)});
    const storePolicies = new Store({path: path.resolve(`../vue-storefront/src/themes/default/resource/policies/${storeData.storeCode}_store_policies.json`)});
    if (storefront.has(`storeViews.${storeData.storeCode}`)) {
      storefront.del(`storeViews.${storeData.storeCode}`)
      storefront.set('storeViews.mapStoreUrlsFor', _.pull(storefront.get('storeViews.mapStoreUrlsFor'), storeData.storeCode))
      mainImage.unlink()
      StoreCategories.unlink()
      storePolicies.unlink()
    } else {
      console.log('Store does not exist', storeData)
      apiStatus(res, 500);
    }
  })
  app.post('/backup-config', (req, res) => {
    console.log('/backup-config', config)
    apiStatus(res, config, 200);
  })
};
