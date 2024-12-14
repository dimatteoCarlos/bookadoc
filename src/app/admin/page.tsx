import StatCard from '@/components/statcard/StatCard';
import Image from 'next/image';
import Link from 'next/link';
import { StatusIcon, statusObj } from '@/constants';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import { StatTable } from '@/components/statTable/StatTable';
import { StatColumn } from '@/components/statTable/StatColumn';

//---------------

//----------------

const AdminPage = async () => {
  const appointmentsStat = await getRecentAppointmentList(); //fix ts

  const { total_appointments_count, recentAppointments, countByStatus } =
    appointmentsStat;

  // console.log("🚀 ~ AdminPage ~ recentAppointments:", recentAppointments)

  const statCards = [
    {
      status: statusObj.total,
      count: total_appointments_count ?? 0,
      label: 'Total',
      icon: StatusIcon.total,
    },
    {
      status: statusObj.schedule,
      count: countByStatus[statusObj.schedule],
      label: 'Scheduled',
      icon: StatusIcon.scheduled,
    },
    {
      status: statusObj.create,
      count: countByStatus[statusObj.create] ?? 0,
      label: 'Pending',
      icon: StatusIcon.pending,
    },
    {
      status: statusObj.cancel,
      count: countByStatus[statusObj.cancel] ?? 0,
      label: 'Cancelled',
      icon: StatusIcon.cancelled,
    },
  ];

  return (
    <>
      <div className='admin__page mx-auto flex max-w-7xl flex-col space-y-14 '>
        <header className='admin-header'>
          <Link href='/' className='cursor-pointer'>
            <Image
              src='/assets/icons/logo-full.svg'
              height={32}
              width={162}
              alt='logo'
              className='h-8 w-fit'
            ></Image>
          </Link>
          <p className='text-16-semibold'>Admin</p>
        </header>
        <div className='admin__board--container flex justify-center '>
          <main className='admin-main max-w-[800px] flex items-center '>
            <section className='w-full space-y-4'>
              <h1 className='header'>Admin Board</h1>
              <p className='text-dark-700'>Managing Appointments</p>
            </section>

            <section className='admin-stat grid grid-cols-4'>
              {statCards.map((card, i) => (
                <StatCard {...card} key={i} />
              ))}
            </section>

            <StatTable data={recentAppointments} columns={StatColumn} />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
