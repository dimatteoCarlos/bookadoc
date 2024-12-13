import StatCard from '@/components/statcard/StatCard';
import Image from 'next/image';
import Link from 'next/link';
import { StatusIcon, statusObj } from '@/constants';
import { getRecentAppointmentList } from '@/lib/actions/appointment.actions';
import {StatTable} from '@/components/statTable/StatTable';
import { StatColumn,  Payment } from '@/components/statTable/StatColumn';

//---------------
async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    // ...
  ]
}
//----------------

const AdminPage = async () => {
  const data = await getData()
  console.log({data})

  const appointmentsStat = await getRecentAppointmentList();
  const { total_appointments_count, recentAppointments, countByStatus } =
    appointmentsStat;

  const statCards = [
    {
      status: statusObj.total,
      count: total_appointments_count ?? 0,
      label: 'Total appointments',
      icon: StatusIcon.total,
    },
    {
      status: statusObj.schedule,
      count: countByStatus[statusObj.scheduled] ?? 0,
      label: 'Scheduled appointments',
      icon: StatusIcon.scheduled,
    },
    {
      status: statusObj.create,
      count: countByStatus[statusObj.create] ?? 0,
      label: 'Pending appointments',
      icon: StatusIcon.pending,
    },
    {
      status: statusObj.cancel,
      count: countByStatus[statusObj.cancelled] ?? 0,
      label: 'Cancelled appointments',
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
            <h1 className='header'>Admin Dashboard</h1>
            <p className='text-dark-700'>Managing New Appointments</p>
          </section>

          <section className='admin-stat'>
            {statCards.map((card, i) => (
              <StatCard {...card} key={i} />
            ))}
          </section>

          {/* <StatTable data = {recentAppointments} columns={StatColumn} /> */}
          <StatTable data = {data} columns={StatColumn} />

        </main>
      </div>
    </>
  );
};

export default AdminPage;
