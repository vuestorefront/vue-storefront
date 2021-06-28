import MetaTagsField from './metatags-field.interface';

export default interface PageData {
  description: unknown[],
  display_name?: boolean,
  body: any[],
  metatags: MetaTagsField

}
