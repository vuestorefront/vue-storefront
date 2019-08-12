export default interface SpotifyState {
  relatedArtists: RelatedArtistsStateList
}

export interface RelatedArtistsStateList {
  [categoryId: number]: string[]
}
