'use client';

import { Dispatch, SetStateAction, useCallback, useRef } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';

interface ImageCropperProps {
  imagePath: string;
  addGameForm: FormData;
  setImagePath: Dispatch<SetStateAction<string | null>>;
}

export default function ImageCropper({ imagePath, addGameForm, setImagePath }: ImageCropperProps) {
  const cropperRef = useRef<ReactCropperElement>(null);
  const croppedUrl = useRef<string>('');

  const uploadImage = useCallback(() => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        if (blob) addGameForm.append('file', blob);
        setImagePath(null);
      });
    }
  }, [addGameForm, setImagePath]);

  return (
    <>
      {/* <div className="fixed h-screen w-screen top-0 left-0 z-5 bg-black opacity-20" /> */}
      <div className="fixed z-50">
        <Cropper
          src={imagePath}
          style={{ height: 400 }}
          initialAspectRatio={3 / 4}
          aspectRatio={3 / 4}
          guides={false}
          viewMode={2}
          background={true}
          modal={true}
          ref={cropperRef}
        />
        <button
          type="button"
          className="bg-orange-400 text-white font-bold p-5 hover:bg-orange-500 transition-colors"
          onClick={() => uploadImage()}
        >
          Recortar
        </button>
      </div>
    </>
  );
}
