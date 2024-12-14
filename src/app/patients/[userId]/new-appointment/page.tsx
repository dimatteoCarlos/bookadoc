//app/new-appointment/page.tsx

'use server';

import Footer from '@/components/shared/Footer';
import Logo from '@/components/shared/Logo';
import SideImage from '@/components/shared/SideImage';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';

const NewAppointment = async ({
  params,
  // ...searchParams
}: SearchParamPropsType) => {
  const { userId } = await params;

  const patientInfo = await getPatient(userId);



  return (
    <main className='h-screen flex max-h-screen '>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Logo logoPath={'/assets/icons/logo-full.svg'} />

          <AppointmentForm
            appointmentAction='create'
            userId={userId}
            patientId={patientInfo!.$id}
          />

          <Footer />
        </div>
      </section>

      <SideImage
        imageUrl='/assets/images/appointment-img-orig.png'
        // imageUrl='/assets/images/appointment-img-2.png'
        className='max-w-[40%]'
      />
    </main>
  );
};

export default NewAppointment;
