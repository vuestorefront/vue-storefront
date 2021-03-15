module.exports = {
	title: 'Vue Storefront Next',
	base: '/v2/',
	description: 'Vue Storefront 2 documentation',
	head: [
		['link', { rel: 'icon', href: '/favicon.png' }]
	],
	themeConfig: {
		logo: 'https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Demo', link: 'https://vsf-next-demo.storefrontcloud.io' },
			{ text: 'Integrations', link: '/integrations/' },
			{ text: 'Migration guide', link: '/migrate/' },
			{ text: 'Roadmap', link: 'https://www.notion.so/vuestorefront/Vue-Storefront-2-Next-High-level-Roadmap-201cf06abb314b84ad01b7b8463c0437'}
		],
		sidebar: {
			'/migrate/': [
				{
					title: 'Migration guide 2.3.0-rc.1',
					children: [
						['/migrate/2.3.0-rc.1/overview', 'Overview'],
						['/migrate/2.3.0-rc.1/integrators', 'Integrators'],
						['/migrate/2.3.0-rc.1/commercetools', 'commercetools']
					]
				},
				{
					title: 'Migration guide 2.2.0',
					children: [
						['/migrate/2.2.0/overview', 'Overview'],
						['/migrate/2.2.0/integrators', 'Integrators'],
						['/migrate/2.2.0/projects', 'Projects'],
					]
				},
				{
					title: 'Migration guide 2.1.0-rc.1',
					children: [
						['/migrate/2.1.0-rc.1/overview', 'Overview'],
						['/migrate/2.1.0-rc.1/integrators', 'Integrators'],
						['/migrate/2.1.0-rc.1/projects', 'Projects'],
					]
				}
			],
			'/commercetools/': [
				{
					title: 'Essentials',
					collapsable: false,
					children: [
						['/commercetools/', 'Introduction'],
						['/commercetools/getting-started', 'Getting started'],
						['/commercetools/configuration', 'Configuration'],
						['/commercetools/authorization-strategy', 'Authentication'],
						['/enterprise/feature-list', 'Feature list'],
						['/commercetools/maintainers', 'Maintainers and support'],
						['/commercetools/changelog', 'Changelog']
					]
				},
				{
					title: 'Composables',
					collapsable: false,
					children: [
						['/commercetools/composables/use-product', 'useProduct'],
						['/commercetools/composables/use-review', 'useReview '],
						['/commercetools/composables/use-user', 'useUser'],
						['/commercetools/composables/use-user-shipping', 'useUserShipping'],
						['/commercetools/composables/use-user-billing', 'useUserBilling'],
						['/commercetools/composables/use-user-order', 'useUserOrder'],
						['/commercetools/composables/use-facet', 'useFacet'],
						['/commercetools/composables/use-cart', 'useCart'],
						['/commercetools/composables/use-wishlist', 'useWishlist'],
						['/commercetools/composables/use-category', 'useCategory']
					]
				},
				{
					title: 'API Client',
					collapsable: false,
					children: [
						['/commercetools/api-client-reference', 'Methods reference']
					]
				},
				{
					title: 'Extensions',
					collapsable: false,
					children: [
						['/commercetools/extensions/user-groups', 'User groups']
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
						['/shopify/use-user-order', 'useUserOrders'],
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
					title: 'In a nutshell',
					collapsable: false,
					children: [
						['/general/getting-started', 'Getting started'],
						['/general/key-concepts', 'Key concepts'],
						['/general/enterprise', 'Enterprise']
					]
        },
				{
					title: 'Guide [WIP]',
					collapsable: false,
					children: [
						['/guide/theme', 'Theme'],
						['/guide/configuration', 'Configuration'],
						['/guide/composables', 'Composables'],
						['/guide/authentication', 'Authentication'],
            ['/guide/user-profile', 'User profile']
					]
				},
				{
					title: 'Advanced [WIP]',
					collapsable: false,
					children: [
						['/advanced/context', 'Application Context'],
						['/advanced/internationalization', 'Internationalization'],
						['/advanced/performance', 'Performance'],
						['/advanced/ssr-cache', 'SSR Cache'],
						['/advanced/logging', 'Logging'],
						['/advanced/architecture', 'Architecture']
					]
				},
				{
					title: 'Build integration',
					collapsable: true,
					children: [
						['/integrate/integration-guide', 'eCommerce'],
						['/integrate/cms', 'CMS'],
						['/integrate/cache-driver', 'Cache driver']
					]
				},
				{
					title: 'Contributing',
					collapsable: true,
					children: [
						['/contributing/', 'Contributing'],
						['/contributing/api-design-philosophy', 'Rules and conventions'],
						['/contributing/creating-changelog', 'Creating changelog'],
						['/contributing/themes', 'Working with themes'],
						['/contributing/server-side-rendering', 'Server-side rendering'],
						['/contributing/changelog', 'Core Changelog']
					]
				},
			],
		}
	}
}
