export default ({ request, options }) => {
  // Remove leading slash and get URL params
  const params = new URLSearchParams(request.url.replace(/^\//, ''));
  const tags = params.get('tags') || '';

  if (params.get('key') !== options.key || !tags) {
    return [];
  }

  return tags.split(',');
};
