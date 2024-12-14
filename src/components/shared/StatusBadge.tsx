import { StatusIcon, statusObj } from '@/constants';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';



const StatusBadge = ({ status }: { status: StatusType }) => {
  const bubleStyle = {
    scheduled: 'bg-green-600',
    pending: 'bg-blue-600',
    cancelled: 'bg-red-600',
  };

  // const StatusIconTable:{[key in StatusType]:string} = {
  //   ...StatusIcon,
  //   scheduled: '/assets/icons/check.svg',
  // };
  const StatusIconTable: { [key in StatusType]: string } = {
    scheduled: '/assets/icons/check.svg',  // Sobrescribe el valor de 'scheduled'
    pending: StatusIcon.pending,           // Usa el valor de 'pending' de StatusIcon
    cancelled: StatusIcon.cancelled,       // Usa el valor de 'cancelled' de StatusIcon
  };

  return (
    <div className={clsx('status-badge', bubleStyle[status])}>
      <Image
        src={StatusIconTable[status]}
        alt='doctor'
        width={32}
        height={32}
        className='h-fit w-4'
      />
      <p
        className={clsx('text-14-semibold capitalize', {
          'text-green-500': status === statusObj.schedule,
          'text-blue-500': status === statusObj.create,
          'text-red-500': status === statusObj.cancel,
        })}
      >
        {' '}
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
