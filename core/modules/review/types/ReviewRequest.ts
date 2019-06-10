import Review from './Review';

export interface ReviewRequest {
  review: Review,
  [k: string]: any
}
