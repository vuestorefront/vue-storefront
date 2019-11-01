export const twitterify = (text: string): string => {
  return text
    .replace(/\n/gi, '<br/>')
    .replace(/([\w]+?:\/\/[\w]+[^\s\n\r\t<\s]*)/gi, '<a href="$1" target="_blank" class="t-text-twitter">$1</a>')
    .replace(/((www|ftp)\.[^\s\t\n\r<\s]*)/gi, '<a href="https://$1" target="_blank" class="t-text-twitter">$1</a>')
    .replace(/@(\w+)/gi, '<a href="https://www.twitter.com/$1" target="_blank" class="t-text-twitter">@$1</a>')
    .replace(/#(\w+)/gi, '<a href="https://search.twitter.com/search?q=$1" target="_blank" class="t-text-twitter">#$1</a>')
}
