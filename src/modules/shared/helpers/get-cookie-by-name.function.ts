export default function getCookieByName (name: string): string | undefined {
  const matches = document.cookie.match(new RegExp(
    `(?:^|; )${name}=([^;]*)`
  ));

  if (!matches || !matches[1]) {
    return;
  }

  return matches[1];
}
