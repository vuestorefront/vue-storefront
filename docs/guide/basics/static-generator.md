# Static Pages Generator

Vue Storefront supports static (HTML) page generation rendering mode from version 1.11. By generating the static pages you avoids the need of running `core/scripts/server.js` and you can deploy your site statically to any hosting like Netlify, Github pages or Amazon S3.

:::warning Important notice
Please note, that the `vue-storefront-api` endpoint should still be available for the application as the client's side rendering still uses the API to fetch the data.
:::

The server rendered pages are being stored to disk files into `/static` folder.


## Available Commands

To generate the static version of your site first you must build the application in production mode:

```
yarn build
```

Then you can run the static page generator:

```
yarn generate all
```

After this command being executed you can find all your category, product and CMS pages - also including the Home Page (`index.html`) rendered in the `/static` folder.

Because of the absolute links being used by Vue Storefront and the CORS mode the generated files **will only work being served from HTTP server** and the `file://` protocol won't allow you to browse the site.

There is a static files hosting included and you can run it by executing:

```
yarn static-server
```

Now you can open your browser and navigate to `http://localhost:3000` which URL is just hosting the `/static` folder.

## Deployment
All your website and assets are placed under `/static` folder. Please deploy this folder to your hosting provider (root directory of the domain only!).


:::warning Important notice
Static Pages generator is an experimental feature and probably still requires some tweaks / improvements. Please do use it carefully.
:::
