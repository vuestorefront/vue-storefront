export default ({ request, options }) => {
  // Remove leading slash and get URL params
  const params = new URLSearchParams(request.url.replace(/^\//, ''));

  if (params.get('key') !== options.key) {
    throw new Error('Invalid or missing invalidation key.');
  }

  if (!params.get('tags') || !params.get('tags').length) {
    throw new Error('Missing invalidation tags.');
  }

  return params.get('tags').split(',');
};
