const path = require('path')
const bodyParser = require('body-parser');
const apiStatus = require('./utils/api-status')
const Store = require('data-store')
const _ = require('lodash')
const request = require('request')

let storefrontConfig
if (process.env.NODE_ENV === 'development') {
  storefrontConfig = new Store({path: path.resolve('./config/local.json')});
} else {
  storefrontConfig = new Store({path: path.resolve('./config/production.json')});
}

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
    // Setting VSF configs for new store
    // set Store Policies
    setStorePolicies(storeData)
    // set Main Image
    setStoreMainImage(storeData)

    // set Store Categories - DISABLED DUE TO also running it separately in /category-link
    // setStoreCategoryBanners(storeData)

    // Set 'mapStoreUrlsFor' to enable routing to the store
    setMapStoreUrlsFor(storeData)

    // set Store Data
    setStoreData(storeData)

    // I DONT UNDERSTAND ! If Store has then delete store related all the data
    // if ((storefrontConfig.has(`storeViews.${store_data.storeCode}`))) {
    //   storefrontConfig.del(`storeViews.${store_data.storeCode}`);
    //   mainImage.unlink();
    //   StoreCategories.unlink();
    // }
    //  I DONT UNDERSTAND !  start set the store config file
    // if ((storefrontConfig.has(`storeViews.${store_data.storeCode}`))) {
    //   storefrontConfig.del(`storeViews.${store_data.storeCode}`);
    //   // mainImage.unlink();
    //   // StoreCategories.unlink();
    // }

    // Set 'mapStoreUrlsFor' to enable routing to the store

    // end set store config file

    apiStatus(res, 'Vue Storefront: /create-store Success', 200)
  })
  app.post('/category-link', async (req, res) => {
    let storeData
    if (req.body.storefront_url && req.body.store_categories) {
      storeData = req.body;
    } else if (req.body.storeCode) {
      storeData = await getStoreData(req.body.storeCode)
    } else {
      return apiStatus(res, 'Bad Data Input', 400);
    }
    // set Store Categories
    setStoreCategoryBanners(storeData)

    // start set to product banners link in vue storefront
    // let children_data = req.body.children_data
    // let storeCode = req.body.storeCode
    // const StoreCategories = new Store({path: path.resolve(config.themeDir + `/resource/banners/${storeCode}_store_categories.json`)});
    // let MainBanners = !_.isUndefined(StoreCategories.get('mainBanners')) ? StoreCategories.get('mainBanners') : [];
    // let smallBanners = !_.isUndefined(StoreCategories.get('smallBanners')) ? StoreCategories.get('smallBanners') : [];
    //
    // console.log('setCategoryBanner req.body', req.body);
    // console.log('setCategoryBanner children_data', children_data);
    //
    // if (children_data.length >= 1) {
    //   MainBanners[0].link = `/${_.get(_.find(children_data, ['name', _.get(_.find(MainBanners, 'title'), 'title')]), 'url_path')}`;
    //   StoreCategories.set('mainBanners', MainBanners);
    //   if (children_data.length >= 2) {
    //     smallBanners[0].link = `/${_.get(_.find(children_data, ['name', _.get(_.find(smallBanners, 'title'), 'title')]), 'url_path')}`;
    //     StoreCategories.set('smallBanners', smallBanners);
    //     if (children_data.length >= 3) {
    //       smallBanners[1].link = `/${_.get(_.find(children_data, ['name', _.get(_.find(smallBanners, 'title'), 'title')]), 'url_path')}`;
    //       StoreCategories.set('smallBanners', smallBanners);
    //     }
    //   }
    // }
    //
    // console.log('MainBanners', MainBanners)
    // console.log('smallBanners', smallBanners)

    apiStatus(res, 'Vue Storefront: /category-link Success', 200);
    // end set to product banners
  })
  app.post('/product-link', (req, res) => {
    // start set to product banners link in vue storefront
    let products = req.body.products;
    let storeCode = req.body.storeCode
    let imagesRootURL = req.body.imagesRootURL
    setProductBanners(products, storeCode, imagesRootURL)

    apiStatus(res, 'Vue Storefront: /product-link Success', 200);
    // end set to product banners
  })

  app.post('/disable-store', (req, res) => {
    // TODO: add authentication for these API Calls
    let storeData = req.body.storeData;
    let status = storeData.status;
    if (storefrontConfig.has(`storeViews.${storeData.store_code}.disabled`)) {
      storefrontConfig.set(`storeViews.${storeData.store_code}.disabled`, status)
    }
    apiStatus(res, 200);
  })
  app.post('/delete-store', (req, res) => {
    // TODO: add authentication for these API Calls
    let storeData = req.body
    const mainImage = new Store({path: path.resolve(config.themeDir + `/resource/banners/${storeData.storeCode}_main-image.json`)});
    const StoreCategories = new Store({path: path.resolve(config.themeDir + `/resource/banners/${storeData.storeCode}_store_categories.json`)});
    const storePolicies = new Store({path: path.resolve(config.themeDir + `/resource/policies/${storeData.storeCode}_store_policies.json`)});
    if (storefrontConfig.has(`storeViews.${storeData.storeCode}`)) {
      storefrontConfig.del(`storeViews.${storeData.storeCode}`)
      storefrontConfig.set('storeViews.mapStoreUrlsFor', _.pull(storefrontConfig.get('storeViews.mapStoreUrlsFor'), storeData.storeCode))
      mainImage.unlink()
      StoreCategories.unlink()
      storePolicies.unlink()
    } else {
      console.log('Store does not exist', storeData)
      apiStatus(res, 500);
    }
  })
  app.post('/backup-config', (req, res) => {
    // TODO: add authentication for these API Calls
    console.log('/backup-config', config)
    apiStatus(res, config, 200);
  })
  app.post('/rebuild-storefront', async (req, res) => {
    // TODO: add authentication for these API Calls
    console.log('/rebuild-storefront')
    console.log('Rebuilding Vue Storefront ~ 3 min')
    await exec('yarn', ['build-silent'], { shell: true }, true, true);
    apiStatus(res, config, 200);
  });
};

function setStorePolicies (storeData) {
  let storefront_setting = storeData.storefront_setting
  const storePolicies = new Store({path: path.resolve(storefrontConfig.get('themeDir') + `/resource/policies/${storeData.storefront_url}_store_policies.json`)});

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
  return storePolicies.get('policy');
}

function setStoreMainImage (storeData) {
  let storeCode = storeData.storefront_url
  let storefront_setting = storeData.storefront_setting
  const mainImage = new Store({path: path.resolve(storefrontConfig.get('themeDir') + `/resource/banners/${storeCode}_main-image.json`)});

  // Main Image Object
  let storeMainImage = {
    'working_hours': storefront_setting.working_hours,
    'title': storefront_setting.banner.title,
    'subtitle': storefront_setting.banner.subtitle,
    'title_color': storefront_setting.banner.title_color,
    'subtitle_color': storefront_setting.banner.subtitle_color,
    'logo': storefront_setting.store_logo.original,
    'link': storefront_setting.banner.link,
    'image': storefront_setting.banner.banner_photo.optimized,
    'contact_information': storefront_setting.contact_information,
    'about_text': storefront_setting.about_text,
    'brand': storeData.brand._id,
    'is_cc_store': storeData.brand.is_cc
  };

  mainImage.set('image', storeMainImage)
  return mainImage.get('image');
}

function getStoreData (storeCode) {
  return new Promise(async (resolve, reject) => {
    request({
      uri: 'http://' + storefrontConfig.get('PROCC.API') + '/api/storefront/getStoreDataVSF/' + storeCode,
      method: 'GET'
    }, (_err, _res, _resBody) => {
      if (_err)reject(_err)
      let obj = JSON.parse(_resBody)
      console.log('getStoreData _resBody', obj)
      resolve(obj.storeData);
    })
  });
}
function setStoreCategoryBanners (storeData) {
  let storeCode = storeData.storefront_url
  const StoreCategories = new Store({path: path.resolve(storefrontConfig.get('themeDir') + `/resource/banners/${storeCode}_store_categories.json`)});
  console.log('storefrontConfig themeDir', storefrontConfig.get('themeDir'))
  console.log('storefrontConfig path', path.resolve(storefrontConfig.get('themeDir') + `/resource/banners/${storeCode}_store_categories.json`))
  console.log('storeData.store_categories', storeData.store_categories)
  // start set store categories main Banner and samll Banners
  let magentoStoreCategories = _.take(_.orderBy(_.filter(storeData.store_categories, {'isCategoryCreatedInMagento': true}), 'createdAt', 'desc'), 3)
  let countCategories = magentoStoreCategories.length;
  let mainBanners = [];
  let smallBanners = [];
  if (countCategories >= 1 && magentoStoreCategories[0] && magentoStoreCategories[0].cover_photo) {
    mainBanners = [
      {
        'title': magentoStoreCategories[0].name,
        'subtitle': magentoStoreCategories[0].description,
        'title_color': magentoStoreCategories[0].name_color,
        'subtitle_color': magentoStoreCategories[0].description_color,
        'image': magentoStoreCategories[0].cover_photo.optimized,
        'link': '/' + _.kebabCase(magentoStoreCategories[0].name) + '/' + _.kebabCase(magentoStoreCategories[0].name),
        'storeCode': storeData.storefront_url,
        'productCount': magentoStoreCategories[0].products.length,
        'category_id': parseInt(magentoStoreCategories[0].magento_category_id)
      }
    ];
    if (countCategories >= 2 && magentoStoreCategories[1] && magentoStoreCategories[1].cover_photo) {
      smallBanners = [
        {
          'title': magentoStoreCategories[1].name,
          'subtitle': magentoStoreCategories[1].description,
          'title_color': magentoStoreCategories[1].name_color,
          'subtitle_color': magentoStoreCategories[1].description_color,
          'image': magentoStoreCategories[1].cover_photo.optimized,
          'link': '/' + _.kebabCase(magentoStoreCategories[1].name) + '/' + _.kebabCase(magentoStoreCategories[1].name),
          'storeCode': storeData.storefront_url,
          'productCount': magentoStoreCategories[1].products.length,
          'category_id': parseInt(magentoStoreCategories[1].magento_category_id)
        }
      ]
      if (countCategories >= 3 && magentoStoreCategories[2] && magentoStoreCategories[2].cover_photo) {
        smallBanners.push({
          'title': magentoStoreCategories[2].name,
          'subtitle': magentoStoreCategories[2].description,
          'title_color': magentoStoreCategories[2].name_color,
          'subtitle_color': magentoStoreCategories[2].description_color,
          'image': magentoStoreCategories[2].cover_photo.optimized,
          'link': '/' + _.kebabCase(magentoStoreCategories[2].name) + '/' + _.kebabCase(magentoStoreCategories[2].name),
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

  // DEBUG LOGGING
  console.log('mainBanners', StoreCategories.get('mainBanners'))
  console.log('smallBanners', StoreCategories.get('smallBanners'))
  console.log('BANNERS END -----======]]]')
  // DEBUG LOGGING

  return {
    mainBanners: StoreCategories.get('mainBanners'),
    smallBanners: StoreCategories.get('smallBanners')
  };
}

function setMapStoreUrlsFor (storeData) {
  let storeCode = storeData.storefront_url
  let mapStoreUrlsFor = storefrontConfig.get('storeViews.mapStoreUrlsFor');
  if ((!_.includes(mapStoreUrlsFor, storeCode)) || (!_.includes(storefrontConfig.get('storeViews.mapStoreUrlsFor'), storeCode))) {
    // set value in mapStoreUrlsFor
    mapStoreUrlsFor = _.concat(mapStoreUrlsFor, storeCode)
    storefrontConfig.set('storeViews.mapStoreUrlsFor', mapStoreUrlsFor);
  }
}

function setProductBanners (products, storeCode, imagesRootURL) {
  const StoreCategories = new Store({path: path.resolve(storefrontConfig.get('themeDir') + `/resource/banners/${storeCode}_store_categories.json`)});
  let productBanners = [];

  // I DONT UNDERSTAND THIS CODE
  // let category_ids = [];
  // if (StoreCategories.has('mainBanners')) {
  //   category_ids.push(StoreCategories.get('mainBanners.0.category_id'));
  // }
  // if (StoreCategories.has('smallBanners')) {
  //   category_ids.push(StoreCategories.get('smallBanners.0.category_id'));
  // }
  // if (StoreCategories.has('smallBanners')) {
  //   category_ids.push(StoreCategories.get('smallBanners.1.category_id'));
  // }

  for (let product of products) {
    console.log('/product-link loop product', _.get(product, '_source'))
    let link = !_.isUndefined(product._source.url_path) ? product._source.url_path : product._source.url_key;
    let Banner = {
      'title': product._source.name,
      'subtitle': product._source.description,
      'image': imagesRootURL + product._source.image, // need to magento url which is in config of api
      'link': `/p/${link}`,
      'category': product._source.category
    };
    productBanners.push(Banner);
    // }
  }
  StoreCategories.set('productBanners', productBanners);
  // console.log('productBanners', productBanners)
  // console.log('productBanners2', StoreCategories.get('productBanners'))
  console.log('productBanners3 -----======]]]')
  return StoreCategories.get('productBanners')
}

function setStoreData (storeData) {
  let store_data = getDefaultStoreData(storeData)
  storefrontConfig.set(`storeViews.${storeData.storefront_url}`, store_data);
}

function getDefaultStoreData (storeData) {
  // TODO: Dynamicly change this data according to origin of the owner of the store (country)
  return {
    storeCode: storeData.storefront_url,
    storeName: _.startCase(storeData.magento_store_name),
    disabled: false,
    storeId: parseInt(storeData.magento_store_id),
    name: _.startCase(storeData.magento_store_name),
    url: `/${storeData.storefront_url}`,
    appendStoreCode: true,
    elasticsearch: {
      host: storefrontConfig.get('api.url') + '/api/catalog',
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
  };
}

const spawn = require('child_process').spawn;
function exec (cmd, args, opts, enableLogging = false, limit_output = false) {
  return new Promise((resolve, reject) => {
    let child = spawn(cmd, args, opts);
    child.on('close', (data) => {
      resolve(data);
    });

    child.on('error', (error) => {
      console.error(error);
      reject(error);
    });

    let log_counter = 0
    if (enableLogging) {
      console.log('child = spawn(cmd, args, opts)', cmd, args, opts)
      child.stdout.on('data', (data) => {
        if (limit_output) {
          let data2 = data.toString()
          data2.replace(' ', '')
          if (Number.isInteger(log_counter / 400) && data2.length > 10) {
            console.log('stdout: ', data.toString());
          }
          log_counter++
        } else {
          console.log('stdout: ', data.toString());
        }
      });
    }
    child.stderr.on('data', (data) => {
      if (limit_output) {
        let data_str = data.toString()
        if ((Number.isInteger(log_counter / 400) && data_str.length > 10) || data_str.indexOf('Error') !== -1) {
          console.log('stderrO: ', data.toString());
        }
        log_counter++
      } else {
        console.log('stderr ERROR: ', data.toString());
      }
    })
  })
}
