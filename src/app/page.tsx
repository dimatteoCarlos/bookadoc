import PatientForm from '@/components/forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={'flex h-screen max-h-screen'}>
      {/* {isAdmin && <PassKeyModal/>} */}

      <section className='remove-scrollbar container my-auto*  bordered'>
        <div className='sub-container justify-between  items-center sm:items-start max-w-[496px]'>
          <Image
            src='/assets/icons/logo-full.svg'
            alt='logo'
            priority
            height={1000}
            width={1000}
            className='w-fit h-10 mb-12 cursor-pointer'
          />
          <PatientForm />

          <footer className={'text-14-regular h-[3rem] flex flex-col gap-1  '}>
            <div className='flex justify-between '>
              <p className='justify-items-end text-dark-600 xl:text-left text-[0.75rem]  xl:text-sm '>
                &copy; 2024. Educational Purposes.
              </p>

              <Link href='/?admin=true ' className={'text-green-400'}>
                {' '}
                &nbsp; Admin
              </Link>
            </div>

            <div className='text-dark-600 font-semibold  text-[0.75rem] xl:text-sm xl:text-left text-center'>
              Made with 💚 by CADR
            </div>
          </footer>
        </div>
      </section>

      <Image
        className={'side-img sm:block max-w-[50%]'}
        src='/assets/images/onboarding-img.png'
        height={1000}
        width={1000}
        alt='onboarding patient'
      />
    </main>
  );
}
