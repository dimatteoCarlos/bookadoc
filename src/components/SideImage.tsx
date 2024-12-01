import { getFileName } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type SideImagePropType = { imageUrl: string, className:string};

const SideImage = ({ imageUrl, className }: SideImagePropType) => {
  return (
    <Image
      src={imageUrl}
      height={1000}
      width={1000}
      className={`side-img md:block  max-w-[390px]X ${className}`}
      alt={getFileName(imageUrl)}
    />
  );
};

export default SideImage;
