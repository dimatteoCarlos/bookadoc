import StatCard from '@/components/statcard/StatCard';
import Image from 'next/image';
import Link from 'next/link';
import { StatusIcon, statusObj } from '@/constants';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import {StatTable} from '@/components/statTable/StatTable';
import { StatColumn,  Payment } from '@/components/statTable/StatColumn';

//---------------

//----------------

const AdminPage = async () => {


  const appointmentsStat = await getRecentAppointmentList();
  const { total_appointments_count, recentAppointments, countByStatus } =
    appointmentsStat;

  const statCards = [
    {
      status: statusObj.total,
      count: total_appointments_count ?? 0,
      label: 'Total',
      icon: StatusIcon.total,
    },
    {
      status: statusObj.schedule,
      count: countByStatus[statusObj.scheduled] ?? 0,
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
      count: countByStatus[statusObj.cancelled] ?? 0,
      label: 'Cancelled',
      icon: StatusIcon.cancelled,
    },
  ];

  return (
    <>
      <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
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

        <main className='admin-main'>
          <section className='w-full space-y-4'>
            <h1 className='header'>Admin Board</h1>
            <p className='text-dark-700'>Managing Appointments</p>
          </section>

          <section className='admin-stat'>
            {statCards.map((card, i) => (
              <StatCard {...card} key={i} />
            ))}
          </section>

          <StatTable data = {recentAppointments} columns={StatColumn} />

        </main>
      </div>
    </>
  );
};

export default AdminPage;
