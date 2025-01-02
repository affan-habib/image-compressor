import JSZip from 'jszip';

export async function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export async function downloadAllImages(images: { file: File; compressedBlob?: Blob }[]) {
  const compressedImages = images.filter(img => img.compressedBlob);
  if (compressedImages.length === 0) return;

  const zip = new JSZip();
  
  // Add each compressed image to the zip
  compressedImages.forEach(img => {
    if (img.compressedBlob) {
      zip.file(`compressed-${img.file.name}`, img.compressedBlob);
    }
  });

  // Generate the zip file
  const zipBlob = await zip.generateAsync({ type: 'blob' });
  
  // Download the zip file
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await downloadBlob(zipBlob, `compressed-images-${timestamp}.zip`);
}