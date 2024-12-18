'use client';

export type TitleFormPropType = { formTitle: string };

export const TitleForm = ({ formTitle='Welcome ' }: TitleFormPropType) => {
  return (
    <div className='mb-9 space-y-1'>
      <h2 className='sub-header'>{formTitle}</h2>
    </div>
  );
};
