import Link from 'next/link';
import React from 'react';

const FooterLayout = () => {
  return (
    <footer className={'flex flex-col gap-1 pb-2 w-full bottom-1'}>
      <div className='text-dark-600 font-regular text-[0.75rem] xl:text-sm text-center '>
        Made with 💚 by CADR. Educational Purposes
      </div>
    </footer>
  );
};

export default FooterLayout;
