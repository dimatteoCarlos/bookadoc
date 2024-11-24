import React from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

export type FormSubmitButtonPropType = {
  isLoading: boolean;
  className?: string;
  children: React.ReactNode;
};

const FormSubmitButton = ({
  isLoading,
  children,
  className,
}: FormSubmitButtonPropType) => {
  return (
    <Button
      type='submit'
      className={className ?? 'shad-primary-btn w-full'}
      disabled={isLoading}
    >
      {isLoading ? (
        <div className='items-center gap-4 flex'>
          <Image
            className='animate-spin'
            src={'/assets/icons/loader.svg'}
            height={24}
            width={24}
            alt={'loader'}
          />
          Loading...
        </div>
      ) : (
        children
      )}
    </Button>
  );
};

export default FormSubmitButton;
