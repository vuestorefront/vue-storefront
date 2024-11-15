
export function getPolarisScript (appConfig: any) {
  if (!appConfig.privacyPolicy.enablePolaris) {
    return '';
  }

  const options = appConfig.analytics.id
    ? `<script>
            window.polarisOptions = {
              GoogleAnalyticsTrackingId: "${appConfig.analytics.id}"
            };
        </script>`
    : '';

  return `
        ${options}
        <script src="https://polaris.truevaultcdn.com/static/polaris.js" defer></script>
      `
};
