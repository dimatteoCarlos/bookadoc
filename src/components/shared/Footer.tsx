import Link from 'next/link';
import React from 'react';
import FooterLayout from './FooterLayout';

const Footer = () => {
  return (
    <footer
      className={'text-14-regular  flex flex-col gap-1 w-full max-w-[550px]'}
    >
      <div className='flex justify-between  '>
        <p className='justify-items-end text-dark-600 xl:text-left text-[0.75rem]  xl:text-sm '>
          &copy; 2024 BookaDoc
        </p>

        <Link
          href='/?admin=true '
          className={
            'text-green-400 hover:bg-dark-400 px-2 py-1 text-center rounded-md'
          }
        >
          {' '}
          &nbsp; Admin
        </Link>
      </div>

      <FooterLayout />
    </footer>
  );
};

export default Footer;
