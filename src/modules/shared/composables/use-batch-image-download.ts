import { ImageHandlerService } from 'src/modules/file-storage';

export interface ImageZipEntry {
  filename: string,
  url: string
}

function triggerBlobDownload (blob: Blob, filename: string): void {
  const objectUrl = URL.createObjectURL(blob);

  try {
    const link = document.createElement('a');
    link.href = objectUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}

export function useBatchImageDownload (imageHandlerService: ImageHandlerService) {
  async function downloadImagesAsZip (
    entries: ImageZipEntry[],
    zipFilename: string
  ): Promise<void> {
    if (!entries || entries.length === 0) {
      return;
    }

    const jszipModule: any = await import('jszip');
    const JSZipCtor = jszipModule?.default;

    const zip = new JSZipCtor();

    const blobs = await Promise.all(entries.map(async (entry) => {
      const imageUrl = imageHandlerService.getOriginalImageUrl(entry.url);
      const response = await fetch(imageUrl);

      return response.blob();
    }));

    for (let index = 0; index < entries.length; index++) {
      const entry = entries[index];
      const blob = blobs[index];

      zip.file(entry.filename, blob);
    }

    const zipBlob: Blob = await zip.generateAsync({ type: 'blob' });
    triggerBlobDownload(zipBlob, zipFilename);
  }

  return {
    downloadImagesAsZip
  };
}
