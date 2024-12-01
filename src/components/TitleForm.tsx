'use client';
import { TitleFormPropType } from './forms/RegisterForm';

export const TitleForm = ({ formTitle }: TitleFormPropType) => {
  return (
    <div className='mb-9 space-y-1'>
      <h2 className='sub-header'>{formTitle}</h2>
    </div>
  );
};
