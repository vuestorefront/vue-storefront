export interface PageStateItem {
  identifier: string,
  routeName: string,
  content: string,
  language: string,
  metaTitle: string,
  metaDescription: string,
  metaTags: string
}

export default interface PageState {
  items: PageStateItem[]
}
