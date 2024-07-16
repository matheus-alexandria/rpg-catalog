'use client';
import { useCallback, useRef, useState } from 'react';
import { Cropper, ReactCropperElement } from 'react-cropper';
import { useDropzone } from 'react-dropzone';
import 'cropperjs/dist/cropper.css';

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
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

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
        {imagePath && (
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
              Upload
            </button>
          </div>
        )}
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop your files</p>}
        </div>
      </div>
    </>
  );
}
