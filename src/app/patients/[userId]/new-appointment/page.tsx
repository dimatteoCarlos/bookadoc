'use server';

import Footer from '@/components/Footer';
import Logo from '@/components/Logo';
import SideImage from '@/components/SideImage';
import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient, getUser } from '@/lib/actions/patient.actions';

const NewAppointment = async ({
  params,
  ...searchParams
}: SearchParamPropsType) => {
  const { userId } = await params;

  const patientInfo = await getPatient(userId);

  const user = await getUser(userId);

  console.log(
    typeof searchParams,
    await searchParams,
    'userId:',
    userId,
    user,
    patientInfo
  );

  //appointmentAction: create, cancel, update
  return (
    <main className='h-screen flex max-h-screen '>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Logo logoPath={'/assets/icons/logo-full.svg'} />

          <AppointmentForm
            appointmentAction='create'
            userId={userId}
            patientId={patientInfo.$id}
          />

          <Footer />
        </div>
      </section>

      <SideImage
        imageUrl='/assets/images/appointment-img-2.png'
        className='max-w-[40%]'
      />
    </main>
  );
};

export default NewAppointment;

//logo/title/p Request a new appointment in 10 seconds. .Doctr searchIcon select. . label/textarea label/textarea Reason for appointment ex: Annual monthly check-up.  Additional comments/notes. ex:Prefer afternoon appointments, if possible

//Expected appointment date. calendarIcon Datepicker time showing Select you appointment date

// Submit and continue
