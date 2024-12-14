// StatColumn
'use client';

import { ColumnDef } from '@tanstack/react-table';

import { AppointmentType } from '@/types/appwrite.types';
import StatusBadge from '../shared/StatusBadge';
import { formatDateTime } from '@/lib/utils';
import { Doctors } from '@/constants';
import Image from 'next/image';
import AppointmentModal from '../shared/AppointmentModal';

export const StatColumn: ColumnDef<AppointmentType>[] = [
  {
    accessorKey: 'ID',
    cell: ({ row }) => <div className='text-14-medium'>{row.index + 1}</div>,
    header: '#',
  },
  {
    accessorKey: 'patient',header:'Patient',
    cell: ({ row }) => {
      const appointment = row.original;
      return (
        <p className='text-[12px] font-normal'>{appointment.patient.name}</p>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <div className='min-w-[115px]'>
        <StatusBadge status={row.original.status} />
      </div>
    ),
  },
  {
    accessorKey: 'schedule',
    header: 'Appointment',
    cell: ({ row }) => (
      <p className=' text-[12px] font-normal min-w-[100px]'>
        {formatDateTime(row.original.schedule).dateTime}
      </p>
    ),
  },
  {
    accessorKey: 'primaryPhysician',
    header: 'Doctor',

    cell: ({ row }) => {
      const doctor = Doctors.find(
        (doc) => doc.name === row.original.primaryPhysician
      );

      return (
        <div className='flex items-center gap-3'>
          {!!doctor ? (
            <>
              {' '}
              <Image
                src={doctor?.image!}
                alt={`Dr. ${doctor!.name}`}
                width={36}
                height={36}
                className={'rounded-full border border-dark-500 size-8'}
              />
              <p className='whitespace-nowrap text-[12px] font-normal'>{`Dr. ${
                doctor!.name
              }`}</p>
            </>
          ) : (
            <p className='whitespace-nowrap font-normalize text-gray-500 text-[12px]'>
              Not Assigned
            </p>
          )}
        </div>
      );
    },
  },

  {
    id: 'actions',
    header: () => <div className='pl-4'>Actions</div>,

    // cell:({row:{original:data}})=>{

    cell: ({ row }) => {
      const { patient, userId } = row.original;
      // console.log({ patient, userId });

      return (
        <div className='flex gap-1'>
          <AppointmentModal
            patientId={patient.$id}
            appointment={row.original}
            action={'schedule'}
            userId={userId}
            // title='Schedule Appointment'
            // description='Please confirm the following details to schedule.'
          />
          <AppointmentModal
            patientId={patient.$id}
            appointment={row.original}
            action={'cancel'}
            userId={userId}
            // title='Cancel Appointment'
            // description='Are you sure?'
          />
        </div>
      );
    },
  },
];
