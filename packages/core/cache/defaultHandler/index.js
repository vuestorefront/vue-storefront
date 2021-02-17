export default ({ request, options }) => {
  // Remove leading slash and get URL params
  const params = new URLSearchParams(request.url.replace(/^\//, ''));

  if (params.get('key') !== options.key) {
    return [];
  }

  if (!params.get('tags') || !params.get('tags').length) {
    return [];
  }

  return params.get('tags').split(',');
};
