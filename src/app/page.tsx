import Footer from '@/components/Footer';
import PatientForm from '@/components/forms/PatientForm';
import Logo from '@/components/Logo';
import Image from 'next/image';

export default function Home() {
  return (
    <main className={'flex h-screen max-h-screen'}>
      {/* {isAdmin && <PassKeyModal/>} */}

      <section className='remove-scrollbar container my-auto*  bordered'>
        <div className='sub-container max-w-[496px] flex justify-between  items-center sm:items-start '>
          <Logo logoPath={'/assets/icons/logo-full.svg'}></Logo>

          <PatientForm />

          <Footer />
        </div>
      </section>

      <Image
        className={'side-img sm:block max-w-[50%]'}
        src='/assets/images/onboarding-img.png'
        height={1000}
        width={1000}
        alt='onboarding patient'
        priority
      />
    </main>
  );
}
