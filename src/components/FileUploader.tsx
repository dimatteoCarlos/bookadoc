'use client';

import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { convertFileToUrl } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';

type FileUploaderPropsType = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

const FileUploader = ({ files, onChange }: FileUploaderPropsType) => {
  // const [loadedFiles, setLoadedFiles] = useState(files);

  //from react-dropzone
  // 'onDrop' se ejecuta cuando se sueltan archivos en la zona de carga.
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
    // setLoadedFiles(acceptedFiles);
  }, []);

  const resetFiles = () => {
    onChange([]);
    // setLoadedFiles([]);
  };

  // 'getRootProps' y 'getInputProps' se utilizan para obtener las propiedades del contenedor y del input de archivos.
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    multiple: false,
  });
  return (
    <div {...getRootProps()} className={'file-upload '}>
      {/* Usa los 'inputProps' para establecer las propiedades del input que permite seleccionar archivos. */}
      <input {...getInputProps()} />
      {files && files?.length > 0 ? (
      // {loadedFiles && loadedFiles?.length > 0 ? (
        <>
          <Image
            // src={convertFileToUrl(loadedFiles[0])}
            src={convertFileToUrl(files[0])}
            alt='uploaded image'
            className=' uploadedImage overflow-hidden object-cover max-h-[400px]NO' //object-contain
            width={800}
            height={800}
          />

          <button type='button' onClick={resetFiles} className='reset-button'>
            Reset
          </button>
        </>
      ) : (
        <>
          <Image
            src='/assets/icons/upload.svg'
            alt='upload'
            width={40}
            height={40}
          />

          <div className='file_upload_label'>
            <p className=' text-14-regular'>
              <span className='text-green-500'>Click to Upload</span> or drag
              and drop
            </p>{' '}
            <p className='text-12-regular'>
              SVG, PNG, JPG or GIF  (file size less than 1MB)
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
