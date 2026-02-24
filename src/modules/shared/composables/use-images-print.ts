import { ImageHandlerService } from 'src/modules/file-storage';

function createHiddenIframe (): HTMLIFrameElement {
  const iframe = document.createElement('iframe');

  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  iframe.style.visibility = 'hidden';

  document.body.appendChild(iframe);

  return iframe;
}

function buildPrintHtml (imageUrls: string[]): string {
  const imagesHtml = imageUrls.map((url) => {
    return `
      <div class="page">
        <img src="${url}" alt="" />
      </div>
    `;
  }).join('');

  return `<!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <style>
          @page { size: letter; margin: 0; }
          html, body { height: 100%; margin: 0; padding: 0; }
          .page {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            page-break-after: always;
            break-after: page;
          }
          img {
            max-width: 100vw;
            max-height: 100vh;
            object-fit: contain;
          }
        </style>
      </head>
      <body>
        ${imagesHtml}
      </body>
    </html>`;
}

async function waitForImagesToLoad (doc: Document): Promise<void> {
  const images = Array.prototype.slice.call(doc.images || []) as HTMLImageElement[];

  await Promise.all(images.map((img) => {
    return new Promise<void>((resolve, reject) => {
      if (img.complete && img.naturalWidth > 0) {
        resolve();
        return;
      }

      img.onload = () => resolve();
      img.onerror = () => reject(new Error('Failed to load image'));
    });
  }));
}

export function useImagesPrint (imageHandlerService: ImageHandlerService) {
  async function printImages (imageUrls: string[]): Promise<void> {
    if (!imageUrls || imageUrls.length === 0) {
      return;
    }

    const resolvedUrls = imageUrls.map((url) => imageHandlerService.getOriginalImageUrl(url));

    const iframe = createHiddenIframe();

    try {
      const contentWindow = iframe.contentWindow;
      const doc = contentWindow && contentWindow.document;

      if (!doc || !contentWindow) {
        throw new Error('Print iframe is not available');
      }

      doc.open();
      doc.write(buildPrintHtml(resolvedUrls));
      doc.close();

      await waitForImagesToLoad(doc);

      contentWindow.focus();
      contentWindow.print();
    } finally {
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    }
  }

  return {
    printImages
  };
}
