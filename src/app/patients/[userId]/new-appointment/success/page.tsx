///app/patients/[userid]/new-appointment/success/page.tsx
'use server';
import Logo from '@/components/Logo';
import { Doctors } from '@/constants';
import Image from 'next/image';
import { Search } from 'lucide-react';

const Success = async ({ searchParams, params }: SearchParamPropsType) => {
  const { userId } = params;

  console.log('userId:', userId, 'searchParams', searchParams);

  const appoinmentId = searchParams?.appointmentId || ('' as string);
  const appointmentDocument = await getAppointment(appoinmentId)

  const doctor = Doctors.find(
    (doc) => doc.name === appointmentDocument.primaryPhysician
  );

  return (
    <>
      <div className='flex h-screen max-h-screen px-[5%] bordered'>
        <div className='success-img'>
          <Logo logoPath={'/assets/icons/logo-full.svg'} />

          <section className='flex flex-col items-center'>
            <Image
              src='assets/gifs/success.gif '
              height={300}
              width={280}
              alt='success'
            />
            <h2 className='header mb-6 max-w-full text-center'>
              Your <span className='text-green-500'>appointment request</span>
              has been successfully submitted!
            </h2>
            <p>We&apos;ll be in touch shortly to confirm</p>
          </section>

          <section className='request-details'>
            <p>Requested appointment details:</p>
            <div className='flex items-center gap-3'>
              <Image
                src={doctor.image!}
                alt='doctor'
                width={100}
                height={100}
                className='size-6'
              />
              <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Success;
