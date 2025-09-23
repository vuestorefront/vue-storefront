export function getFeraScript (apiKey: string): string {
  return `
  <script>
    window.feraStandaloneMode = true;
    window.fera = window.fera || [];
    window.fera.push('loadPlatformAdapter', "magento2");
    window.fera.push('configure', {
      api_key: "${apiKey}",
      app_url: "https://app.fera.ai/",
      api_url: "https://app.fera.ai/api/",
    });
  </script>
  <script async="" type="application/javascript" src="https://cdn.fera.ai/js/v3/fera.js"></script>
  `;
}
