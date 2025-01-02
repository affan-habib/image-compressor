import React from 'react';
import type { CompressionQuality } from '../utils/compression';

interface QualitySelectorProps {
  quality: CompressionQuality;
  onChange: (quality: CompressionQuality) => void;
}

export function QualitySelector({ quality, onChange }: QualitySelectorProps) {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Compression Quality
      </label>
      <div className="flex space-x-2">
        {(['high', 'medium', 'low'] as const).map((q) => (
          <button
            key={q}
            onClick={() => onChange(q)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
              ${quality === q
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
          >
            {q.charAt(0).toUpperCase() + q.slice(1)}
          </button>
        ))}
      </div>
      <p className="text-sm text-gray-500">
        {quality === 'high' && 'Best quality, larger file size (up to 2MB)'}
        {quality === 'medium' && 'Balanced quality and size (up to 1MB)'}
        {quality === 'low' && 'Smallest file size (up to 0.5MB)'}
      </p>
    </div>
  );
}