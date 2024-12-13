import { Doctors } from '@/constants';
import { SelectItem } from '@/components/ui/select';
import Image from 'next/image';
// import { SelectItem } from "./ui/select"

const DoctorSelectItem = () => {
  return (
    <>
      {Doctors.map((doc, i) => (
        <SelectItem value={doc.name} key={doc.name + '_' + i}>
          <div className='flex cursor-pointer gap-2 items-center'>
            <Image
              src={doc.image}
              alt={`Dr. ${doc.name}`}
              width={36}
              height={36}
              className={'rounded-full border border-dark-500'}
            />
            <p>{`Dr. ${doc.name}`}</p>
          </div>
        </SelectItem>
      ))}
    </>
  );
};

export default DoctorSelectItem;
