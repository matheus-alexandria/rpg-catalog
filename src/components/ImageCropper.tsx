'use client';

import { useCallback, useRef } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';

interface ImageCropperProps {
  file: File | null;
  imagePath: string;
}

export default function ImageCropper({ file, imagePath }: ImageCropperProps) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const croppedUrl = useRef<string>('');

  const uploadImage = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper && file) {
      const form = new FormData();
      form.append('file', file);
      cropper.getCroppedCanvas().toBlob((blob) => {
        fetch('/api/v1/games/upload', {
          method: 'POST',
          body: form
        });
      });
    }
  }, [file]);

  return (
    <div>
      <Cropper
        src={imagePath}
        style={{ height: 400 }}
        initialAspectRatio={3 / 4}
        aspectRatio={3 / 4}
        guides={false}
        viewMode={2}
        background={false}
        modal={false}
        ref={cropperRef}
      />
      <button
        type="button"
        className="bg-orange-400 text-white font-bold p-5"
        onClick={() => uploadImage()}
      >
        Recortar
      </button>
    </div>
  );
}
