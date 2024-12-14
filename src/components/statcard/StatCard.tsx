import { statusObj } from '@/constants';
import clsx from 'clsx';
import Image from 'next/image';

type StatCardPropsType = {
  status: StatusType | 'all';
  count: number;
  label: string;
  icon: string;
};

const StatCard = ({ status, count = 0, label, icon }: StatCardPropsType) => {
  
  return (
    <div
      className={clsx('stat-card max-w-full', {
        'bg-appointments': status === statusObj.schedule || status === 'all',
        'bg-pending': status === statusObj.create,
        'bg-cancelled': status === statusObj.cancel,
      })}
    >
      <div className='flex items-center gap-6'>
        <Image
          src={icon}
          alt={`appointment:${status}`}
          height={32}
          width={32}
          className='size-8 w-fit'
        />
        <h2 className='text-32-bold text-white'>{count}</h2>
      </div>
      <p className='text-20-regular'>{label}</p>
    </div>
  );
};

export default StatCard;
