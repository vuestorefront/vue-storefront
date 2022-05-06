import { BodyPartValueContentType } from './body-part-value-content-type.value';

export default interface BodypartOption {
  id: string,
  label: string,
  value: string,
  isSelected: boolean,
  contentTypeId: BodyPartValueContentType,
  group: string | 'default',
  color?: string,
  image?: string
}
