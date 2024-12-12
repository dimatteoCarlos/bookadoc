//app/page.tsx

'use server';

import Logo from '@/components/Logo';
import Image from 'next/image';
import Footer from '@/components/Footer';
import PatientForm from '@/components/forms/PatientForm';
import { PasskeyModal } from '@/components/PasskeyModal';

export default async function Home({ searchParams }: SearchParamPropsType) {
  const awaitedSearchParams = await searchParams;

  const isAdmin = awaitedSearchParams?.admin === 'true';
  console.log('awaitedSearchParams:', awaitedSearchParams);

  return (
    <main className={'flex h-screen max-h-screen'}>
      {isAdmin && <PasskeyModal />}

      <section className='remove-scrollbar container '>
        <div className='sub-container max-w-[496px] flex justify-between  items-start'>
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
