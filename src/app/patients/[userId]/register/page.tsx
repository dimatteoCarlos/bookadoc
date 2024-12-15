//app/register/page.tsx

'use server';

import Footer from '@/components/shared/Footer';
import Logo from '@/components/shared/Logo';
import SideImage from '@/components/shared/SideImage';
import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';

const Register = async ({ params, ...searchParams }: SearchParamPropsType) => {
  const { userId } = await params;
  // console.log(typeof searchParams, await searchParams, 'userId:', userId);

  const user = await getUser(userId);

  return (
    <main className='h-screen flex max-h-screen '>
      <section className='remove-scrollbar container'>
        <div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
          <Logo logoPath={'/assets/icons/logo-full.svg'} />

          <RegisterForm user={user!} />

          <Footer />
        </div>
      </section>

      <SideImage
        imageUrl='/assets/images/register-img.png'
        className='max-w-[350px]'
      />
    </main>
  );
};

export default Register;
