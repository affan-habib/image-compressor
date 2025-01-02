import { ZoomIn, ZoomOut, X } from 'lucide-react';

interface ImageControlsProps {
  onZoomIn: () => void;
  onZoomOut: () => void;
  onClose: () => void;
}

export function ImageControls({ onZoomIn, onZoomOut, onClose }: ImageControlsProps) {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <button
        onClick={onZoomOut}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <ZoomOut className="w-5 h-5" />
      </button>
      <button
        onClick={onZoomIn}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <ZoomIn className="w-5 h-5" />
      </button>
      <button
        onClick={onClose}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}