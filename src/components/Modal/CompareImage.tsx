interface CompareImageProps {
  title: string;
  imageUrl: string;
  zoom: number;
}

export function CompareImage({ title, imageUrl, zoom }: CompareImageProps) {
  return (
    <div className="flex flex-col">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{title}</h3>
      <div className="relative flex-1 overflow-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <img
          src={imageUrl}
          alt={title}
          className="min-w-full min-h-full object-contain transition-transform origin-top-left"
          style={{ transform: `scale(${zoom})` }}
        />
      </div>
    </div>
  );
}