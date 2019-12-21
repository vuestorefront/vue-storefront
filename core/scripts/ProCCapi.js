const path = require('path')
const bodyParser = require('body-parser');
const apiStatus = require('./utils/api-status')
const Store = require('data-store')
const _ = require('lodash')
const request = require('request')

let config_active
let storefrontConfig
if (process.env.NODE_ENV === 'development') {
  storefrontConfig = new Store({path: path.resolve('./config/local.json')});
} else {
  storefrontConfig = new Store({path: path.resolve('./config/production.json')});
}
console.log('START process.env.NODE_ENV: ', process.env.NODE_ENV)
console.log('START storefrontConfig: ', storefrontConfig.clone())
console.log('START storefrontConfig: ')

module.exports = (config, app) => {
  config_active = config
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

  app.post('/test', (req, res) => {

    apiStatus(res, testKebab(), 200)
  })
  app.post('/updateStorefrontSettings', (req, res) => {
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
    //   StoreBanners.unlink();
    // }
    //  I DONT UNDERSTAND !  start set the store config file
    // if ((storefrontConfig.has(`storeViews.${store_data.storeCode}`))) {
    //   storefrontConfig.del(`storeViews.${store_data.storeCode}`);
    //   // mainImage.unlink();
    //   // StoreBanners.unlink();
    // }

    // end set store config file

    apiStatus(res, 'Vue Storefront: /updateStorefrontSettings Success', 200)
  })
  app.post('/category-link', async (req, res) => {
    console.log('/category-link STARTED')
    let storeData
    if (req.body.storefront_url && req.body.store_categories) { // DEPRECATED
      storeData = req.body;
    } else if (req.body.storeCode) {
      storeData = await getStoreData(req.body.storeCode)
    } else {
      return apiStatus(res, 'Bad Data Input', 400);
    }
    // set Store Categories
    console.log(storeData, 'setStoreCategoryBanners DATA:')
    setStoreCategoryBanners(storeData)

    apiStatus(res, 'Vue Storefront: /category-link Success', 200);
    // end set to product banners
  })
  app.post('/product-link', (req, res) => {
    // start set to product banners link in vue storefront
    let products = req.body.products;
    let storeCode = req.body.storeCode
    let imagesRootURL = req.body.imagesRootURL
    console.log(products, 'setProductBanners DATA:', storeCode, imagesRootURL)
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
    const StoreBanners = new Store({path: path.resolve(config.themeDir + `/resource/banners/${storeData.storeCode}_store_banners.json`)});
    const storePolicies = new Store({path: path.resolve(config.themeDir + `/resource/policies/${storeData.storeCode}_store_policies.json`)});
    // TODO: Add better check for all assets of the store -> return success if it is missing
    if (storefrontConfig.has(`storeViews.${storeData.storeCode}`)) {
      storefrontConfig.del(`storeViews.${storeData.storeCode}`)
      storefrontConfig.set('storeViews.mapStoreUrlsFor', _.pull(storefrontConfig.get('storeViews.mapStoreUrlsFor'), storeData.storeCode))
      mainImage.unlink()
      StoreBanners.unlink()
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
  const storePolicies = new Store({path: path.resolve(config_active.themeDir + `/resource/policies/${storeData.storefront_url}_store_policies.json`)});

  // Reset the file to avoid bad config
  if(storePolicies && storePolicies.get('policy'))storePolicies.unlink();

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
  const mainImage = new Store({path: path.resolve(config_active.themeDir + `/resource/banners/${storeCode}_main-image.json`)});

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

  // Reset the file to avoid bad config
  if(mainImage && mainImage.get('image'))mainImage.del('image');

  mainImage.set('image', storeMainImage)
  return mainImage.get('image');
}

function getStoreData (storeCode) {
  return new Promise(async (resolve, reject) => {
    request({
      uri: config_active.PROCC.API + '/api/storefront/getStoreDataVSF/' + storeCode,
      method: 'GET'
    }, (_err, _res, _resBody) => {
      console.log('GETTING URL: ', config_active.PROCC.API + '/api/storefront/getStoreDataVSF/' + storeCode)
      console.log('_resBody', _resBody)
      if (_err)reject(_err)
      let obj = JSON.parse(_resBody)
      console.log('getStoreData _resBody', obj)
      resolve(obj.storeData);
    })
  });
}

function setStoreCategoryBanners (storeData) {
  let storeCode = storeData.storefront_url
  const StoreBanners = new Store({path: path.resolve(config_active.themeDir + `/resource/banners/${storeCode}_store_banners.json`)});
  console.log('storefrontConfig themeDir', config_active.themeDir)
  console.log('storefrontConfig path', path.resolve(config_active.themeDir + `/resource/banners/${storeCode}_store_banners.json`))
  console.log('storeData.store_categories', storeData.store_categories)
  // start set store categories main Banner and samll Banners
  let top3Categories = _.take(_.orderBy(_.filter(storeData.store_categories, {'isCategoryCreatedInMagento': true}), 'updatedAt', 'desc'), 3)
  let countCategories = top3Categories.length;
  let mainBanners = [];
  let smallBanners = [];
  if (countCategories >= 1 && top3Categories[0] && top3Categories[0].cover_photo) {
    mainBanners = [
      {
        'title': top3Categories[0].name,
        'subtitle': top3Categories[0].description,
        'title_color': top3Categories[0].name_color,
        'subtitle_color': top3Categories[0].description_color,
        'image': top3Categories[0].cover_photo.optimized,
        // 'link': '/' + kebabForLink(top3Categories[0].name) + '/' + kebabForLink(top3Categories[0].name),
        'link': '/c/' + kebabForLink(top3Categories[0].name),
        'storeCode': storeData.storefront_url,
        'productCount': top3Categories[0].products.length,
        'category_id': parseInt(top3Categories[0].magento_category_id)
      }
    ];
    if (countCategories >= 2 && top3Categories[1] && top3Categories[1].cover_photo) {
      smallBanners = [
        {
          'title': top3Categories[1].name,
          'subtitle': top3Categories[1].description,
          'title_color': top3Categories[1].name_color,
          'subtitle_color': top3Categories[1].description_color,
          'image': top3Categories[1].cover_photo.optimized,
          // 'link': '/' + kebabForLink(top3Categories[1].name) + '/' + kebabForLink(top3Categories[1].name),
          'link': '/c/' + kebabForLink(top3Categories[1].name),
          'storeCode': storeData.storefront_url,
          'productCount': top3Categories[1].products.length,
          'category_id': parseInt(top3Categories[1].magento_category_id)
        }
      ]
      if (countCategories >= 3 && top3Categories[2] && top3Categories[2].cover_photo) {
        smallBanners.push({
          'title': top3Categories[2].name,
          'subtitle': top3Categories[2].description,
          'title_color': top3Categories[2].name_color,
          'subtitle_color': top3Categories[2].description_color,
          'image': top3Categories[2].cover_photo.optimized,
          // 'link': '/' + kebabForLink(top3Categories[2].name) + '/' + kebabForLink(top3Categories[2].name),
          'link': '/c/' + kebabForLink(top3Categories[2].name),
          'storeCode': storeData.storefront_url,
          'productCount': top3Categories[2].products.length,
          'category_id': parseInt(top3Categories[2].magento_category_id)
        });
      }
    }
    console.log(mainBanners, ' mainBanners data');
    console.log(smallBanners, ' smallBanners data');

    // Reset the file to avoid bad config
    if(StoreBanners && StoreBanners.get('mainBanners'))StoreBanners.del('mainBanners');
    if(StoreBanners && StoreBanners.get('smallBanners'))StoreBanners.del('smallBanners');

    StoreBanners.set('mainBanners', mainBanners);
    StoreBanners.set('smallBanners', smallBanners);
  }
  // end set store categories main Banner and small Banner

  // DEBUG LOGGING
  console.log('mainBanners GET', StoreBanners.get('mainBanners'));
  console.log('smallBanners GET', StoreBanners.get('smallBanners'));
  console.log('BANNERS END -----======]]]')
  // DEBUG LOGGING

  return {
    mainBanners: StoreBanners.get('mainBanners'),
    smallBanners: StoreBanners.get('smallBanners')
  };
}

function setProductBanners (products, storeCode, imagesRootURL) {
  const StoreBanners = new Store({path: path.resolve(config_active.themeDir + `/resource/banners/${storeCode}_store_banners.json`)});

  let productBanners = [];

  for (let product of products) {
    console.log('/product-link loop product', _.get(product, '_source'))
    let link = !_.isUndefined(product._source.url_path) ? product._source.url_path : product._source.url_key;
    let Banner = {
      'title': product._source.name,
      'subtitle': product._source.description,
      'image': imagesRootURL + product._source.image, // need to magento url which is in config of api
      'link': `/p/${product._source.sku}/${link}`,
      'category': product._source.category
    };
    productBanners.push(Banner);
    // }
  }

  // Reset the file to avoid bad config
  if(StoreBanners && StoreBanners.get('productBanners'))StoreBanners.del('productBanners');

  StoreBanners.set('productBanners', productBanners);
  // console.log('productBanners', productBanners)
  console.log('productBanners2', StoreBanners.get('productBanners'))
  console.log('productBanners3 -----======]]]')
  return StoreBanners.get('productBanners')
}

function setMapStoreUrlsFor (storeData) {
  let storeCode = storeData.storefront_url
  let mapStoreUrlsFor = storefrontConfig.get('storeViews.mapStoreUrlsFor');

  if ((!_.includes(mapStoreUrlsFor, storeCode)) || (!_.includes(storefrontConfig.get('storeViews.mapStoreUrlsFor'), storeCode))) {
    // set value in mapStoreUrlsFor
    mapStoreUrlsFor = _.concat(mapStoreUrlsFor, storeCode)

    // Reset the file to avoid bad config
    if(mapStoreUrlsFor)storefrontConfig.del('storeViews.mapStoreUrlsFor')

    storefrontConfig.set('storeViews.mapStoreUrlsFor', mapStoreUrlsFor);
  }
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
      host: config_active.api.url + '/api/catalog',
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


// Need this kebabcase, because lodash.kebabCase is doing it in a different way (numbers == words)
function kebabForLink(string){
  function split(text) {
    let words = text.match(/[A-Za-z0-9]+/g) || [];

    if (words.length === 1 && words[0].length === text.length) {
      if (/[a-z]/.test(text)) {
        words = splitCamelCase(text);
      }
    }
    return words;
  }

  function splitCamelCase(text) {
    let foundFirstUpperCase = /[A-Z]/.exec(text);
    if (!foundFirstUpperCase) {
      return [text];
    }

    let pattern = /[A-Z][a-z0-9]*/g;

    // PascalCase
    if (foundFirstUpperCase.index === 0) {
      return text.match(pattern);
    }

    // camelCase
    let words = text.slice(foundFirstUpperCase.index).match(pattern);
    words.unshift(text.slice(0, foundFirstUpperCase.index));
    return words;
  }

  function kebabCase(text) {
    return join(split(text));
  }

  function join(words) {
    if (!words.length) {
      return '';
    }

    let ret = String(words[0]).toLowerCase();

    for (let i = 1, n = words.length; i < n; i++) {
      ret += '-' + String(words[i]).toLowerCase();;
    }

    return ret;
  }

  Object.defineProperties(kebabCase, {
    split: {
      enumerable: true,
      value: split,
    },
    join: {
      enumerable: true,
      value: join,
    },
  });

  return kebabCase(string)
}

function testKebab () {
  console.time('testKebab took')
  let array = ['GG 5', 'GG-5', 'GG 5-5', 'GG 5.5', 'GG5', 'GG5 66.5-7']
  let result = []
  for (let key in array){
    let word1 = array[key]
    let word2 = kebabForLink(word1)
    let res = 'testKebab TEST '+key+'  -  word1: '+word1+'  -  word2: '+word2
    console.log(res)
    result.push(res)
  }
  console.timeEnd('testKebab took')
  return result
}
testKebab()
