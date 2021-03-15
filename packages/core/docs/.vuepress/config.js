module.exports = {
	title: 'Vue Storefront Next',
	base: '/v2/',
	description: 'Vue Storefront 2 documentation',
	head: [
		['link', { rel: 'icon', href: '/favicon.png' }]
	],
	configureWebpack: (config) => {
		config.module.rules = config.module.rules.map(rule => ({
			...rule,
			use: rule.use && rule.use.map(useRule => ({
				...useRule,
				options: useRule.loader === 'url-loader' ?
					/**
					  Hack for loading images properly.
					  ref: https://github.com/vuejs/vue-loader/issues/1612#issuecomment-559366730
					 */
					{  ...useRule.options, esModule: false } :
					useRule.options
			}))
		}))
	},
	themeConfig: {
		logo: 'https://camo.githubusercontent.com/48c886ac0703e3a46bc0ec963e20f126337229fc/68747470733a2f2f643968687267346d6e767a6f772e636c6f756466726f6e742e6e65742f7777772e76756573746f726566726f6e742e696f2f32383062313964302d6c6f676f2d76735f3062793032633062793032633030303030302e6a7067',
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Demo', link: 'https://vsf-next-demo.storefrontcloud.io' },
			{ text: 'Migration guide', link: '/migrate/' },
			{ text: 'Roadmap', link: 'https://www.notion.so/vuestorefront/Vue-Storefront-2-Next-High-level-Roadmap-201cf06abb314b84ad01b7b8463c0437'}
		],
		sidebar: {
			'/migrate/': [
				{
					title: 'Migration guide RC.1',
					children: [
						['/migrate/rc1', 'Overview'],
						['/migrate/integrators-rc1', 'Integrators'],
						['/migrate/projects-rc1', 'Projects'],
					]
				},
				{
					title: 'Migration guide 2.2.0',
					children: [
						['/migrate/2.2.0', 'Overview'],
						['/migrate/integrators-2.2.0', 'Integrators'],
						['/migrate/projects-2.2.0', 'Projects'],
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
						['/commercetools/use-product', 'useProduct'],
						['/commercetools/use-review', 'useReview '],
						['/commercetools/use-user', 'useUser'],
						['/commercetools/use-user-shipping', 'useUserShipping'],
						['/commercetools/use-user-billing', 'useUserBilling'],
						['/commercetools/use-user-order', 'useUserOrder'],
						['/commercetools/use-facet', 'useFacet'],
						['/commercetools/use-cart', 'useCart'],
						['/commercetools/use-wishlist', 'useWishlist'],
						['/commercetools/use-category', 'useCategory']
					]
				},
				{
					title: 'Extensions',
					collapsable: false,
					children: [
						['/commercetools/user-groups', 'User groups']
					]
				},
				{
					title: 'Theme',
					collapsable: false,
					children: [
						['/commercetools/auth-middleware', 'Auth Middleware']
					],
				},
				{
					title: 'API Client Reference',
					collapsable: true,
					children: [
						['/commercetools/api-client-reference', 'API Client Reference']
					]
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
            ['/guide/user-profile', 'User profile'],
                        ['/guide/authentication', 'Authentication']
					]
				},
				{
					title: 'Advanced [WIP]',
					collapsable: false,
					children: [
						['/advanced/architecture', 'Architecture'],
						['/advanced/context', 'Application Context'],
						['/advanced/calling-platform-api', 'Calling Platform API'],
						['/advanced/server-middleware', 'Server Middleware'],
						['/advanced/internationalization', 'Internationalization'],
						['/advanced/performance', 'Performance'],
						['/advanced/ssr-cache', 'SSR Cache'],
						['/advanced/logging', 'Logging']
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
						['/integrate/integration-guide', 'Integration guide'],
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
