import Image from 'next/image';
import Link from 'next/link';
export type LogoPropType = { logoPath: string };
const Logo = ({ logoPath = '/assets/icons/logo-full.svg'}: LogoPropType) => {
  return (
    <Link href={'/'}>
      <Image
        src={logoPath}
        alt='logo'
        priority
        height={1000}
        width={1000}
        className='w-fit h-10 mb-12 cursor-pointer'
      />
    </Link>
  );
};

export default Logo;
