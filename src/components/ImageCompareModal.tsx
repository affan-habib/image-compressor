import React, { useState, useEffect } from 'react';
import { Portal } from './Modal/Portal';
import { ImageControls } from './Modal/ImageControls';
import { CompareImage } from './Modal/CompareImage';

interface ImageCompareModalProps {
  originalImage: File;
  compressedBlob?: Blob;
  onClose: () => void;
}

export function ImageCompareModal({ originalImage, compressedBlob, onClose }: ImageCompareModalProps) {
  const [zoom, setZoom] = useState(1);
  const [urls, setUrls] = useState<{ original: string; compressed: string }>({ original: '', compressed: '' });

  useEffect(() => {
    const originalUrl = URL.createObjectURL(originalImage);
    const compressedUrl = compressedBlob ? URL.createObjectURL(compressedBlob) : '';
    
    setUrls({ original: originalUrl, compressed: compressedUrl });

    return () => {
      URL.revokeObjectURL(originalUrl);
      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
    };
  }, [originalImage, compressedBlob]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.25, 0.5));

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
        <div className="relative w-[90vw] h-[90vh] bg-white dark:bg-gray-800 rounded-lg p-4">
          <ImageControls
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            onClose={onClose}
          />

          <div className="h-full pt-12 pb-4">
            <div className="grid grid-cols-2 gap-4 h-full">
              <CompareImage
                title="Original"
                imageUrl={urls.original}
                zoom={zoom}
              />
              <CompareImage
                title="Compressed"
                imageUrl={urls.compressed}
                zoom={zoom}
              />
            </div>
          </div>
        </div>
      </div>
    </Portal>
  );
}