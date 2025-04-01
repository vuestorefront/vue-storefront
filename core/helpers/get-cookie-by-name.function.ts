export function getCookieByName (name: string, cookieString: string | undefined): string | undefined {
  if (!cookieString) {
    return;
  }

  const matches = cookieString.match(new RegExp(
    `(?:^|; )${name}=([^;]*)`
  ));

  if (!matches || !matches[1]) {
    return;
  }

  return matches[1];
}
