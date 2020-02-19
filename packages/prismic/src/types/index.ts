type DateValue = string | number

interface Fragment {
  fragment: string;
}

interface FragmentValue<T = any> extends Fragment {
  value: T | T[]
}

interface FragmentValues<T = any> extends Fragment {
  values: T[]
}

interface FragmentBefore<T = DateValue> extends Fragment {
  before: T
}

interface FragmentAfter<T = DateValue> extends Fragment {
  after: T
}

interface FragmentBeforeAfter<T = DateValue> extends Fragment {
  before: T
  after: T
}

interface FragmentGeo<T = number> extends Fragment {
  latitude: number
  longitude: number
  radius: number
}

interface FragmentYear<T = number> extends Fragment {
  year: T
}

interface FragmentMonth<T = string | number> extends Fragment {
  month: T
}

interface FragmentDay<T> extends Fragment {
  day: T
}

interface FragmentHour<T = number> extends Fragment {
  hour: T
}

interface DocumentAndResults {
  documentId: string
  maxResults: number
}

export type PrismicQueryTypes =
& FragmentValue
& FragmentValues
& FragmentBefore
& FragmentAfter
& FragmentBeforeAfter
& FragmentGeo
& FragmentYear
& FragmentMonth
& FragmentDay<any>
& FragmentHour
& DocumentAndResults

export interface PrismicQuery {
  at?: FragmentValue<DateValue | DateValue[]>
  not?: FragmentValue<DateValue | DateValue[]>
  missing?: Fragment
  has?: Fragment
  any?: FragmentValues<DateValue>
  in?: FragmentValues<string>
  fulltext?: FragmentValue<string>
  similar?: DocumentAndResults
  dateBefore?: FragmentBefore
  dateAfter?: FragmentAfter
  dateBetween?: FragmentBeforeAfter
  dayOfMonth?: FragmentDay<number>
  dayOfMonthAfter?: FragmentDay<number>
  dayOfMonthBefore?: FragmentDay<number>
  dayOfWeek?: FragmentDay<string | number>
  dayOfWeekAfter?: FragmentDay<string | number>
  dayOfWeekBefore?: FragmentDay<string | number>
  month?: FragmentMonth
  monthBefore?: FragmentMonth
  monthAfter?: FragmentMonth
  year?: FragmentYear
  hour?: FragmentHour
  hourBefore?: FragmentHour
  hourAfter?: FragmentHour
  gt?: FragmentValue<number>
  lt?: FragmentValue<number>
  inRange?: FragmentBeforeAfter<number>
  near?: FragmentGeo
}

export type PrismicBlockType = 'text' | 'html' | 'image' | 'embed' | 'link'
export type PrismicBlock = Record<string, any>

// TODO: Find other block types
export type PrismicBlockText = Array<{
  type: string
  text: string | number
  spans: string[]
}>

export interface PrismicPage {
  alternate_langauges: any[]
  data?: PrismicBlock
  first_publication_date: string
  href: string
  id: string
  lang: string
  last_publication_date: string
  linked_documents: any[]
  slugs: string[]
  tags: string[]
  type: string
  uid: string
  body?: any[] // TODO: Extend in slices implementation
}

export interface PrismicDocument {
  results: PrismicPage[]
  page: number
  results_per_page: number
  results_size: number
  total_results_size: number
  total_pages: number
  next_page: string | null
  prev_page: string | null
}

export interface PrismicSlice {
  slice_type: string
  slice_label: string | null
  primary: PrismicBlock
  items: PrismicBlock[]
}
