import Vue, { ComponentOptions, AsyncComponent } from 'vue'
import { RouteConfig } from 'vue-router/types/router'
import RedirectPage from './Redirect.vue'

export const UrlRewriteRoutes: RouteConfig[] = [
  {
    name: 'url-rewrite',
    path: '/stub',
    component: RedirectPage as unknown as ComponentOptions<Vue> | typeof Vue | AsyncComponent,
    props: route => ({
      targetPath: route.params.targetPath
    })
  }
]
