import { Context } from '@vue-storefront/core';

export interface CommentType {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface GetCommentsParams {
  _limit: number;
}

export interface GetCommentsSuccess {
  data: CommentType[];
}

export interface GetCommentsError {
  error: any;
}

export interface GetCommentsResponse
  extends Partial<GetCommentsSuccess>,
    Partial<GetCommentsError> {}

export default async function getComments(
  context: Context,
  params: GetCommentsParams
): Promise<GetCommentsResponse> {
  const endpoint = 'https://jsonplaceholder.typicode.com/comments';

  const searchParams = Object.entries(params)
    .reduce((params, [key, val]) => [...params, `${key}=${val}`], [])
    .join('&');

  const target = `${endpoint}?${searchParams}`;

  return fetch(target)
    .then((res) => res.json())
    .then((data: CommentType[]) => ({ data }))
    .catch((error) => ({ error }));
}
