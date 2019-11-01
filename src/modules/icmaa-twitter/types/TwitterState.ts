export default interface SpotifyState {
  status: StatusStateListItem[]
}

export interface StatusStateListItem {
  screenName: string,
  status: StatusStateItem[]
}

export interface StatusStateItem {
  id: number,
  created_at: string,
  text: string,
  retweet_count: number,
  favorite_count: number,
  [key: string]: any
}
