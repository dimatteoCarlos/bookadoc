import Image from 'next/image';
export type LogoPropType = { logoPath: string };
const Logo = ({ logoPath }: LogoPropType) => {
  return (
    <Image
      // src='/assets/icons/logo-full.svg'
      src={logoPath}
      alt='logo'
      priority
      height={1000}
      width={1000}
      className='w-fit h-10 mb-12 cursor-pointer'
    />
  );
};

export default Logo;
