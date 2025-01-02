import imageCompression from 'browser-image-compression';

export type CompressionQuality = 'high' | 'medium' | 'low';

interface CompressionOptions {
  quality: CompressionQuality;
  onProgress: (progress: number) => void;
}

const qualitySettings = {
  high: { maxSizeMB: 2, quality: 0.9 },
  medium: { maxSizeMB: 1, quality: 0.8 },
  low: { maxSizeMB: 0.5, quality: 0.65 }
};

export async function compressImage(file: File, options: CompressionOptions): Promise<Blob> {
  const settings = qualitySettings[options.quality];
  
  return imageCompression(file, {
    maxSizeMB: settings.maxSizeMB,
    maxWidthOrHeight: 4096, // Increased to maintain high resolution
    useWebWorker: true,
    quality: settings.quality,
    onProgress: options.onProgress
  });
}