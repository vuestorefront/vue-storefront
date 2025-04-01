export interface CountdownBanner {
  date: string,
  version: string,
  title: string,
  description: string,
  blacklist_urls: string[],
  style: {
    text_color: string,
    numbers_color: string,
    background_color: string
  }
}
