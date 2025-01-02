import React, { useState } from 'react';
import { ImageIcon, Download } from 'lucide-react';
import { DropZone } from './components/DropZone';
import { ImagePreview } from './components/ImagePreview';
import { QualitySelector } from './components/QualitySelector';
import { TopBar } from './components/TopBar';
import { compressImage, type CompressionQuality } from './utils/compression';
import { downloadAllImages } from './utils/download';

interface ImageItem {
  file: File;
  compressedBlob?: Blob;
  progress: number;
}

export default function App() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [quality, setQuality] = useState<CompressionQuality>('high');

  const handleCompression = async (file: File) => {
    try {
      setImages(prev =>
        prev.map(img =>
          img.file === file ? { ...img, progress: 0, compressedBlob: undefined } : img
        )
      );

      const compressedBlob = await compressImage(file, {
        quality,
        onProgress: (progress) => {
          setImages(prev =>
            prev.map(img =>
              img.file === file ? { ...img, progress } : img
            )
          );
        }
      });

      setImages(prev =>
        prev.map(img =>
          img.file === file ? { ...img, compressedBlob } : img
        )
      );
    } catch (error) {
      console.error('Error compressing image:', error);
    }
  };

  const handleDrop = (files: File[]) => {
    const newImages = files.map(file => ({ file, progress: 0 }));
    setImages(prev => [...prev, ...newImages]);
    files.forEach(handleCompression);
  };

  const removeImage = (file: File) => {
    setImages(prev => prev.filter(img => img.file !== file));
  };

  const handleQualityChange = (newQuality: CompressionQuality) => {
    setQuality(newQuality);
    images.forEach(img => handleCompression(img.file));
  };

  const handleDownloadAll = () => {
    downloadAllImages(images);
  };

  const hasCompressedImages = images.some(img => img.compressedBlob);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <TopBar />
      <div className="pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <ImageIcon className="mx-auto h-12 w-12 text-blue-500" />
            <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white">
              Image Compressor
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Compress your images while maintaining quality
            </p>
          </div>

          <div className="mb-6">
            <QualitySelector quality={quality} onChange={handleQualityChange} />
          </div>

          <DropZone onDrop={handleDrop} />

          {images.length > 0 && (
            <div className="mt-8">
              {hasCompressedImages && (
                <button
                  onClick={handleDownloadAll}
                  className="mb-4 flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download All Compressed Images
                </button>
              )}
              
              <div className="space-y-4">
                {images.map((img) => (
                  <ImagePreview
                    key={img.file.name}
                    originalImage={img.file}
                    compressedBlob={img.compressedBlob}
                    onRemove={() => removeImage(img.file)}
                    compressionProgress={img.progress}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}