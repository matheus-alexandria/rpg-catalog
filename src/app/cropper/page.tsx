'use client';
import { useCallback, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { useDropzone } from 'react-dropzone';
import 'cropperjs/dist/cropper.css';

export default function Crop() {
  const cropperRef = useRef<ReactCropperElement>(null);
  const croppedUrl = useRef<string>('');
  const [file, setFile] = useState<File>();
  const [imagePath, setImagePath] = useState<string | null>(null);
  const onCrop = () => {
    const cropper = cropperRef.current?.cropper;
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => {
        console.log(blob);
      });
    }
  };
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFile(file);

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          setImagePath(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <div className="w-full h-screen bg-coolGray-900 flex justify-center items-center">
        {imagePath && (
          <Cropper
            src={imagePath}
            style={{ height: 400 }}
            initialAspectRatio={3 / 4}
            aspectRatio={3 / 4}
            guides={false}
            viewMode={2}
            background={false}
            modal={false}
            crop={onCrop}
            ref={cropperRef}
          />
        )}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag 'n' drop some files here, or click to select files</p>
          )}
        </div>
      </div>
    </>
  );
}
