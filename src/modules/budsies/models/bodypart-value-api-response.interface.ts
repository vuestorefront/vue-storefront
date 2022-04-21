export default interface BodypartValueApiResponse {
  id: number,
  code: string,
  name: string,
  content_type_id: number,
  color?: string,
  image?: string,
  group?: string | 'default',
  is_default: number,
  sn: number
}
