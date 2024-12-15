'use client';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldCategory } from '../shared/CustomFormField';

import FormSubmitButton from '../shared/FormSubmitButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getAppointmentActionSchema } from '@/lib/validationFormSchema';
import DoctorSelectItem from '../shared/DoctorSelectItem';
import clsx from 'clsx';
import {
  createAppointment,
  updateActionAppointment,
  // updateAppointemnet,
} from '@/lib/actions/appointment.actions';
import { AppointmentType } from '@/types/appwrite.types';
import { buttonLabels, statusObj } from '@/constants';
//-----------------------

//---------------------
export type AppointmentFormPropType = {
  appointmentAction: 'create' | 'cancel' | 'schedule'; //AppointmentActionType

  //create appointment & update appointment
  userId: string;
  patientId: string;

  // update appointment
  existentAppointment?: AppointmentType;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  // setOpen?:(open:boolean)=>void;
};

const AppointmentForm = ({
  userId,
  patientId,
  appointmentAction,
  existentAppointment,
  setOpen,
}: AppointmentFormPropType) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = getAppointmentActionSchema(appointmentAction);

  const form = useForm<z.infer<typeof formSchema.validationSchema>>({
    resolver: zodResolver(formSchema.validationSchema),

    defaultValues: {
      ...formSchema.defaultValues,
      primaryPhysician:
        existentAppointment?.primaryPhysician ??
        formSchema.defaultValues.primaryPhysician,

      schedule:
        appointmentAction === 'create'
          ? new Date(new Date().setDate(new Date().getDate() + 1))
          : new Date(existentAppointment!.schedule) ??
            new Date(formSchema.defaultValues.schedule),

      reason: existentAppointment?.reason ?? formSchema.defaultValues.reason,
      note: existentAppointment?.note ?? formSchema.defaultValues.note,

      cancellationReason: !existentAppointment
        ? formSchema.defaultValues.cancellationReason
        : existentAppointment!.cancellationReason ??
          formSchema.defaultValues.cancellationReason,
    },
  });

  //------------------------
  const onSubmit = async (
    values: z.infer<typeof formSchema.validationSchema>
  ) => {
    setIsLoading(true);

    const { primaryPhysician, schedule, reason, note, cancellationReason } =
      values;

    try {
      if (appointmentAction === 'create' && patientId) {
        const appointmentData = {
          userId,
          patient: patientId,
          primaryPhysician,
          schedule: new Date(schedule),
          reason: reason!,
          note,
          status: statusObj[appointmentAction] as StatusType,
          cancellationReason,
        };

        const newAppointment = await createAppointment(appointmentData);

        if (newAppointment) {
          form.reset();
          router.replace(
            `/patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
        }
      } else {
        const appointmentId = existentAppointment!.$id;

        const appointmentToUpdateInfo = {
          userId,
          appointmentId,
          appointment: {
            primaryPhysician,
            schedule,
            status: statusObj[appointmentAction] as StatusType, //status according to the action cancel or schedule
            cancellationReason,
          },
          appointmentAction,
        };

        const updatedAppointment = await updateActionAppointment(
          appointmentToUpdateInfo
        );

        if (updatedAppointment) {
          setOpen && setOpen(false);
          form.reset();
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  const buttonLabel = buttonLabels[appointmentAction] || 'Submit Appointment';

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='form__container flex-1 space-y-6 mb-1 '
      >
        {appointmentAction === 'create' && (
          <section className='mb-3 space-y-2'>
            <h1 className='header'>Book your Appointment 📅</h1>
            <p className='text-dark-700'>
              Request the appointment in 10 seconds
            </p>
          </section>
        )}

        {appointmentAction !== 'cancel' && (
          <>
            <CustomFormField
              fieldCategory={FormFieldCategory.SELECT}
              control={form.control}
              name='primaryPhysician'
              label='Doctor'
              placeholder='Select a Doctor'
            >
              <DoctorSelectItem />
            </CustomFormField>

            <CustomFormField
              fieldCategory={FormFieldCategory.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected appointment date in office hours 8 am to 5 pm'
              showTimeSelect
              dateFormat='dd/MM/yyyy - h:mm aa'
              showYearDropdown={false}
            />

            <div
              className={clsx(
                'flex  gap-4  ',
                appointmentAction === 'create' && 'xl:flex-row'
              )}
            >
              <CustomFormField
                fieldCategory={FormFieldCategory.TEXTAREA}
                control={form.control}
                name='reason'
                label='Reason for the appointment'
                placeholder='ex.: reason of consultation'
                isDisabled={appointmentAction === 'schedule'}
              />
              <CustomFormField
                fieldCategory={FormFieldCategory.TEXTAREA}
                control={form.control}
                name='note'
                label='Comments / notes'
                placeholder='ex.: Urgent meeting came up'
                // isDisabled={appointmentAction === 'schedule'}
              />
            </div>
          </>
        )}

        {appointmentAction === 'cancel' && (
          <>
            <CustomFormField
              fieldCategory={FormFieldCategory.DATE_PICKER}
              control={form.control}
              name='schedule'
              label='Expected appointment date in office hours 8 am to 5 pm'
              showTimeSelect
              dateFormat='dd/MM/yyyy - h:mm aa'
              showYearDropdown={false}
            />
            <CustomFormField
              fieldCategory={FormFieldCategory.TEXTAREA}
              control={form.control}
              name='cancellationReason'
              label='Reason for cancellation'
              placeholder='ex.: Urgent meeting came up'
            />
          </>
        )}

        <FormSubmitButton
          isLoading={isLoading}
          className={clsx(
            'w-full shad-primary-btn',
            appointmentAction == 'cancel' && 'shad-danger-btn'
          )}
        >
          {buttonLabel}
        </FormSubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
