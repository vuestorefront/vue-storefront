import { LinkType } from './link-type.value';

export default interface LinkField {
  id: string,
  url: string,
  linktype: LinkType,
  fieldtype: string,
  cached_url: string,
  story?: {
    name: string,
    id: number,
    uuid: string,
    slug: string,
    full_slug: string,
    url: string
  }
}
