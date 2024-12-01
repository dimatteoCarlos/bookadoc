import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className={'text-14-regular h-[3rem] flex flex-col gap-1  py-3'}>
      <div className='flex justify-between '>
        <p className='justify-items-end text-dark-600 xl:text-left text-[0.75rem]  xl:text-sm '>
          &copy; 2024 bookadoc
        </p>

        <Link href='/?admin=true ' className={'text-green-400'}>
          {' '}
          &nbsp; Admin
        </Link>
      </div>

      <div className='text-dark-600 font-semibold  text-[0.75rem] xl:text-sm xl:text-left text-center'>
        Made with 💚 by CADR. Educational Purposes.
      </div>
    </footer>
  );
};

export default Footer;
