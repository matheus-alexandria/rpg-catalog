'use client';
import { useRef } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';

export default function Crop() {
  const cropperRef = useRef<ReactCropperElement>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      console.log(cropper.getCroppedCanvas().toDataURL());
    }
  };

  return (
    <Cropper
      src="https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg"
      style={{ height: 400, width: '100%' }}
      // Cropper.js options
      initialAspectRatio={3 / 4}
      guides={false}
      crop={onCrop}
      ref={cropperRef}
    />
  );
}
