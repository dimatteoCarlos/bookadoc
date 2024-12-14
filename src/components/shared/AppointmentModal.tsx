import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';


import { useState } from 'react';
import { Button } from '../ui/button';
import AppointmentForm from '../forms/AppointmentForm';
import { AppointmentType } from '@/types/appwrite.types';

type AppointmentModalPropType = {
  patientId: string;
  action: 'schedule' | 'cancel' | 'create';
  userId: string;
  appointment?: AppointmentType;
  title?: string;
  description?: string;
};

const AppointmentModal = ({
  patientId,
  appointment,
  action,
  userId,
  // title,
  // description,
}: AppointmentModalPropType) => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>

        <DialogTrigger asChild>
          <Button
            variant='ghost'
            className={`capitalize  ${
              action === 'schedule' && 'text-green-500' 
            } ${action === 'cancel' && 'text-red-500'}`}
          >
            {action}

          </Button>
        </DialogTrigger>

        <DialogContent className='shad-dialog sm:max-w-md '>
          <DialogHeader className='mb-4 space-y-3'>
            <DialogTitle className='capitalize   '>
              <span
                className={`capitalize ${
                  action === 'schedule' && 'text-green-500'
                } ${action === 'cancel' && 'text-red-500'}`}
              >
                {action}
              </span>
              &nbsp; Appointment
            </DialogTitle>
            <DialogDescription>
              Please fill in the following details to {action} the appointment
            </DialogDescription>
          </DialogHeader>

          <AppointmentForm
            userId={userId}
            patientId={patientId}
            appointmentAction={action}
            existentAppointment={appointment}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentModal;
