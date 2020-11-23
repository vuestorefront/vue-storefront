module.exports = {
	title: 'Vue Storefront Next',
	description: 'Vue Storefront 2 documentation',
	head: [
		['link', { rel: 'icon', href: '/favicon.png' }]
	],
	themeConfig: {
		logo: 'https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Demo', link: 'https://vsf-next-demo.storefrontcloud.io' }
		],
		sidebar: {
			'/commercetools/': [
				{
					title: 'Essentials',
					collapsable: false,
					children: [
						['/commercetools/', 'Introduction'],
						['/commercetools/getting-started', 'Getting Started'],
						['/commercetools/api-client', 'API Client'],
						['/commercetools/composables', 'Composables'],
						['https://www.notion.so/vuestorefront/6017d5a553904d0bbdcdf0f37d388c2b?v=a618b57067f34e68944145ade66da3a3', 'Feature list'],
						['/commercetools/maintainers', 'Maintainers and support'],
						['/commercetools/changelog', 'Changelog']
					]
				},
				{
					title: 'Composables',
					collapsable: false,
					children: [
						['/commercetools/use-product', 'Products'],
						['/commercetools/use-review', 'Reviews'],
						['/commercetools/use-user-shipping', 'Shipping addresses'],
						['/commercetools/use-user-billing', 'Billing addresses'],
						['/commercetools/use-facet', 'Faceting'],
						['/commercetools/use-cart', 'Cart'],
						['/commercetools/use-wishlist', 'useWishlist']

					]
				},
				{
					title: 'Enterprise (paid)',
					collapsable: false,
					children: [
						['/commercetools/enterprise/user-groups', 'User groups'],
						['/commercetools/enterprise/use-user-shipping', 'Shipping addresses'],
						['/commercetools/enterprise/use-user-billing', 'Billing addresses'],
						['/commercetools/enterprise/use-review', 'Reviews'],
						['/commercetools/enterprise/use-wishlist', 'Wishlist']
					]
				},
				{
					title: 'Theme',
					collapsable: false,
					children: [
						['/commercetools/auth-middleware', 'Auth Middleware']
					],
				}
			],
			'/aboutyou/': [
				{
					title: 'Essentials',
					collapsable: false,
					children: [
						['/aboutyou/', 'Introduction'],
						['/aboutyou/getting-started', 'Getting Started'],
						['/aboutyou/api-client', 'API Client'],
						['/aboutyou/composables', 'Composables'],
						['/aboutyou/feature-list', 'Feature list']
					]
				},
				{
					title: 'Composables',
					collapsable: false,
					children: [
						['/aboutyou/use-cart', 'useCart'],
						['/aboutyou/use-product', 'useProduct'],
						['/aboutyou/use-wishlist', 'useWishlist'],
					]
				}
			],
			'/shopify/': [
				{
					title: 'Essentials',
					collapsable: false,
					children: [
						['/shopify/', 'Introduction'],
						['/shopify/getting-started', 'Getting Started'],
						['/shopify/api-client', 'API Client'],
						['/shopify/composables', 'Composables'],
						['/shopify/feature-list', 'Feature list'],
						['/shopify/maintainers', 'Maintainers and support']
					]
				},
				{
					title: 'Composables',
					collapsable: false,
					children: [
						['/shopify/use-cart', 'useCart'],
						['/shopify/use-category', 'useCategory'],
						['/shopify/use-content', 'useContent'],
						['/shopify/use-product', 'useProduct'],
						['/shopify/use-search', 'useSearch'],
						['/shopify/use-user', 'useUser'],
						['/shopify/use-user-orders', 'useUserOrders'],
					]
				}, {
					title: 'Other',
					collapsable: false,
					children: [
						['/shopify/checkout', 'Checkout']
					],
				}
			],
			'/': [
				{
					title: 'General',
					collapsable: false,
					children: [
						['/general/getting-started', 'Getting started'],
						['/general/key-concepts', 'Key concepts'],
						['/general/architecture', 'Architecture'],
						['/general/i18n', 'i18n'],
						['/general/faceting', 'Faceting'],
						['/general/logging', 'Logging'],
						['/general/performance', 'Performance']
					]
				},
				{
					title: 'eCommerce platforms',
					collapsable: false,
					children: [
						['/commercetools/', 'Commercetools'],
						['/shopify/', 'Shopify'],
						['/aboutyou/', 'About you'],
						['https://shopware-pwa-docs.netlify.com/#introduction-to-shopware-pwa', 'Shopware'],
						['https://github.com/DivanteLtd/vue-storefront', 'Magento']
					]
				},
				{
					title: 'Build integration',
					collapsable: true,
					children: [
						['/integrate/ecommerce', 'eCommerce'],
						['/general/cms', 'CMS'],
						['/integrate/api-middleware', 'API middleware'],
					]
				},
				{
					title: 'Contributing',
					collapsable: true,
					children: [
						['/contributing/', 'Contributing'],
						['/contributing/api-design-philosophy', 'Rules and conventions'],
						['/contributing/themes', 'Working with themes'],
						['/contributing/server-side-rendering', 'Server-side rendering'],
						['/contributing/changelog', 'Core Changelog']
					]
				},
			],
		}
	}
}
