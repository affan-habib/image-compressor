import React from 'react';
import { Download, X } from 'lucide-react';
import { downloadBlob } from '../utils/download';

interface ImagePreviewProps {
  originalImage: File;
  compressedBlob?: Blob;
  onRemove: () => void;
  compressionProgress: number;
}

export function ImagePreview({ 
  originalImage, 
  compressedBlob, 
  onRemove,
  compressionProgress 
}: ImagePreviewProps) {
  const originalSizeInMB = (originalImage.size / (1024 * 1024)).toFixed(2);
  const compressedSizeInMB = compressedBlob 
    ? (compressedBlob.size / (1024 * 1024)).toFixed(2)
    : '0.00';

  const handleDownload = () => {
    if (compressedBlob) {
      downloadBlob(compressedBlob, `compressed-${originalImage.name}`);
    }
  };

  return (
    <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <button
        onClick={onRemove}
        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex items-start space-x-4">
        <img
          src={URL.createObjectURL(originalImage)}
          alt="Preview"
          className="w-24 h-24 object-cover rounded"
        />
        
        <div className="flex-1">
          <p className="font-medium truncate text-gray-900 dark:text-white" title={originalImage.name}>
            {originalImage.name}
          </p>
          
          <div className="mt-2 space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Original: {originalSizeInMB} MB
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Compressed: {compressedSizeInMB} MB
            </p>
            
            {compressionProgress < 100 && (
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${compressionProgress}%` }}
                />
              </div>
            )}
          </div>

          {compressedBlob && (
            <button
              onClick={handleDownload}
              className="mt-2 flex items-center space-x-1 text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <Download className="w-4 h-4" />
              <span>Download</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}