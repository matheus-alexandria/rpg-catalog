'use client';
import { useCallback, useRef, useState } from 'react';
import { ReactCropperElement } from 'react-cropper';
import { useDropzone } from 'react-dropzone';
import 'cropperjs/dist/cropper.css';
import ImageCropper from '@/components/ImageCropper';

export default function Crop() {
  const cropperRef = useRef<ReactCropperElement>(null);
  const croppedUrl = useRef<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [imagePath, setImagePath] = useState<string | null>(null);

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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg']
    }
  });

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
    <>
      <div className="w-full h-screen bg-coolGray-900 flex justify-center items-center">
        {imagePath ? (
          <ImageCropper
            imagePath={imagePath}
            addGameForm={new FormData()}
            setImagePath={setImagePath}
          />
        ) : (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop your files</p>}
          </div>
        )}
      </div>
    </>
  );
}
