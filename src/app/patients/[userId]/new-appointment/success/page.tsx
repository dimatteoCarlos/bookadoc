///app/patients/[userid]/new-appointment/success/page.tsx
//example url: http://localhost:3000/patients/675720cecbf362041d3f/new-appointment/success?appointmentId=6757316d002a41bebf75

'use server';
import Logo from '@/components/Logo';
import { Doctors } from '@/constants';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

// import { buttonVariants } from '@/components/ui/button';
import { getAppointment } from '@/lib/actions/appointment.actions';

const Success = async ({ params, searchParams }: SearchParamPropsType) => {
  const { userId } = await params; // this is necessary in next js 14
  const awaitedSearchParams = await searchParams; // this is necessary in next js 14

  const appointmentId = (awaitedSearchParams?.appointmentId as string) || '';
  const appointmentDocument = await getAppointment(appointmentId);
  // console.log('🚀 ~ Success ~ appointmentDocument:', appointmentDocument);

  const doctor = Doctors.find(
    (doctor) => doctor.name == appointmentDocument.primaryPhysician
  );
  // console.log('🚀 ~ Success ~ doctor:', doctor);

  return (
    <>
      <div className='flex  px-[5%] h-screen max-h-screen border-red-800 border-'>
        <div className='success-img'>
          <Logo logoPath={'/assets/icons/logo-full.svg'} />

          <section className='flex flex-col items-center'>
            <Image
              src='/assets/gifs/success.gif'
              height={300}
              width={280}
              alt='success'
            />
            <h2 className='header mb-6 max-w-[600px] text-center '>
              Your <span className='text-green-500'>appointment request </span>
              has been successfully submitted!
            </h2>
            <p>We&apos;ll be in touch shortly to confirm</p>
          </section>

          <section className='request-details'>
            <p>Requested appointment details:</p>
            <div className='flex items-center gap-3'>
              {doctor && (
                <>
                  <Image
                    src={doctor!.image}
                    alt='doctor'
                    width={100}
                    height={100}
                    className='size-10'
                  />
                  <p className='whitespace-nowrap'>Dr. {doctor?.name}</p>
                </>
              )}
            </div>

            <div className='flex gap-2'>
              <Image
                src='/assets/icons/calendar.svg'
                width={32}
                height={32}
                alt='calendar'
              />
              <p> {formatDateTime(appointmentDocument.schedule).dateTime}</p>
            </div>
          </section>
          {/* The asChild parameter can be set to nest a link component. */}

          <section className='flex flex-col items-center  w-full gap-10'>
            <Button variant='outline' className='shad-primary-btn' asChild>
              <Link href={`/patients/${userId}/new-appointment`}>
                New Appoinment
              </Link>
            </Button>

            <Footer />
          </section>
          {/* The buttonVariants helper can be used to create a link that looks like a button. */}
          {/* <Link
            href={`/patients/${userId}/new-appointment`}
            className={buttonVariants({ variant: 'outline' })}
          >
            New Appoinment
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default Success;
