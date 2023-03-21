export default interface BodypartApiResponse {
  id: number,
  code: string,
  name: string,
  is_required: number,
  max_values: number,
  sn: number,
  detailing_flag_text?: string,
  child_bodyparts?: BodypartApiResponse[]
}
