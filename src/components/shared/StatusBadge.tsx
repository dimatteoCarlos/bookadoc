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

  return (
    <div className={clsx('status-badge', bubleStyle[status])}>
      <Image
        src={StatusIcon[status]}
        alt='doctor'
        width={24}
        height={24}
        className='h-fit w-3'
      />
      <p
        className={clsx('text-12-semibold capitalize', {
          'text-green-500': status === statusObj.scheduled,
          'text-blue-500': status === statusObj.create,
          'text-red-500': status === statusObj.cancelled,
        })}
      >
        {' '}
        {status}
      </p>
    </div>
  );
};

export default StatusBadge;
