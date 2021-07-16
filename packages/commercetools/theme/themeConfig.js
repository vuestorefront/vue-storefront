// default configuration for links and images
const defaultConfig = {
  searchResults: {
    category: {
      link: '/'
    }
  }
};
// configuration used for links and images for demo purposes
const demoConfig = {
  searchResults: {
    category: {
      link: '/c/'
    }
  }
};
export default (() => {
  if (process.env.IS_DEMO) {
    return demoConfig;
  }
  return defaultConfig;
})();
