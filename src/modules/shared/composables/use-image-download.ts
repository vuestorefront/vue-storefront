import { ImageHandlerService } from 'src/modules/file-storage';

export function useImageDownload (imageHandlerService: ImageHandlerService) {
  async function downloadImage (
    url: string,
    filename: string
  ): Promise<void> {
    if (!imageHandlerService) {
      throw new Error('Image Handler Service is not defined');
    }

    const urlWithoutBucket = url.split('/')[1];
    const imageUrl = urlWithoutBucket
      ? imageHandlerService.getOriginalImageUrl(urlWithoutBucket)
      : imageHandlerService.getOriginalImageUrl(url);

    const response = await fetch(imageUrl);

    const imageBlob = await response.blob();
    const imageObjectUrl = URL.createObjectURL(imageBlob);

    try {
      const link = document.createElement('a');
      link.href = imageObjectUrl;
      link.download = filename;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      URL.revokeObjectURL(imageObjectUrl);
    }
  }

  return {
    downloadImage
  };
}
