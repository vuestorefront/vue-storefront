export default interface Attribute {
  attribute_code?: string,
  attribute_id?: number | string
}

export interface AttributesMetadata {
  is_visible_on_front: string,
  is_visible: boolean,
  default_frontend_label: string,
  attribute_id: number,
  entity_type_id: string,
  id: number,
  frontend_input: string,
  is_user_defined: boolean,
  is_comparable: string,
  attribute_code: string,
  options: AttributesMetadataOptions[]
}

export interface AttributesMetadataOptions {
  label: string,
  value: string
}
