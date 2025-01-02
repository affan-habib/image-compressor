import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload } from 'lucide-react';

interface DropZoneProps {
  onDrop: (files: File[]) => void;
}

export function DropZone({ onDrop }: DropZoneProps) {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    }
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${isDragActive 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
        }
        dark:bg-gray-800`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center text-gray-600 dark:text-gray-300">
        <Upload className="w-12 h-12 mb-4" />
        {isDragActive ? (
          <p className="text-lg">Drop the images here...</p>
        ) : (
          <>
            <p className="text-lg mb-2">Drag & drop images here, or click to select files</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Supports PNG, JPG, JPEG, GIF, and WebP
            </p>
          </>
        )}
      </div>
    </div>
  );
}