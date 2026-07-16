interface HeaderContent {
  text?: string,
  type: string
}

export default function getHeaderId (
  headerSize: number,
  headerContent: HeaderContent[] | undefined
): string {
  var headerText = '';

  if (!!headerContent && Array.isArray(headerContent)) {
    headerContent.forEach((contentItem: HeaderContent) => {
      if (contentItem.type !== 'text') {
        return;
      }

      headerText = headerText + (headerText ? '-' : '') + contentItem.text || '';
    });
  }

  const preparedHeaderText = headerText.trim().replace(/\s+/g, '-');

  return 'h' + headerSize + '-' + preparedHeaderText;
}
