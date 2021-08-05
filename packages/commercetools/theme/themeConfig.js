// default configuration for links and images
const defaultConfig = {
  home: {
    bannerA: {
      link: '/',
      image: {
        mobile: '/homepage/bannerB.webp',
        desktop: '/homepage/bannerF.webp'
      }
    },
    bannerB: {
      link: '/',
      image: '/homepage/bannerE.webp'
    },
    bannerC: {
      link: '/',
      image: '/homepage/bannerC.webp'
    },
    bannerD: {
      link: '/',
      image: '/homepage/bannerG.webp'
    }
  }
};
// configuration used for links and images for demo purposes
const demoConfig = {
  home: {
    bannerA: {
      link: '/c/women/women-clothing-skirts',
      image: {
        mobile: '/homepage/bannerB.webp',
        desktop: '/homepage/bannerF.webp'
      }
    },
    bannerB: {
      link: '/c/women/women-clothing-dresses',
      image: '/homepage/bannerE.webp'
    },
    bannerC: {
      link: '/c/women/women-clothing-shirts',
      image: '/homepage/bannerC.webp'
    },
    bannerD: {
      link: '/c/women/women-shoes-sandals',
      image: '/homepage/bannerG.webp'
    }
  }
};

export default (() => {
  if (process.env.IS_DEMO) {
    return demoConfig;
  }
  return defaultConfig;
})();
