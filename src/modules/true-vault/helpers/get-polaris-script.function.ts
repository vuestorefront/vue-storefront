
export function getPolarisScript (appConfig: any) {
  if (!appConfig.privacyPolicy?.polarisId) {
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
        <script src="https://polaris.truevaultcdn.com/static/pc/${appConfig.privacyPolicy.polarisId}/polaris.js" defer></script>
      `
};
