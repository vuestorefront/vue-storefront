export default (options) => process.env.NODE_ENV === 'production' || options.coreDevelopment;
