'use client';
import { z } from 'zod';

import { zodResolver } from '@hookform/resolvers/zod';

import { useForm } from 'react-hook-form';

import { Form } from '@/components/ui/form';
import CustomFormField, { FormFieldCategory } from '../CustomFormField';

import FormSubmitButton from '../FormSubmitButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

// import { getAppointmentActionSchema } from '@/lib/validationsFormSchema';

import { getAppointmentActionSchema } from '@/lib/validationFormSchema';
import { getAppointmentSchema } from '@/lib/validationFormSchema';
import DoctorSelectItem from '../DoctorSelectItem';
import clsx from 'clsx';
import { createAppointment } from '@/lib/actions/appointment.actions';

const statusObj = {
  cancel: 'cancelled',
  schedule: 'scheduled',
  create: 'pending',
  default: 'pending',
};

const buttonLabels = {
  cancel: 'Cancel Appointment',
  schedule: 'Schedule Appointment',
  create: 'Submit Appointment',
  default: 'Submit Appointment',
};

export type AppointmentFormPropType = {
  userId: string;
  patientId: string;
  appointmentAction: 'create' | 'cancel' | 'schedule'; //AppointmentActionType
};

const AppointmentForm = ({
  userId,
  patientId,
  appointmentAction,
}: // appointment,
// setOpen,

AppointmentFormPropType) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const formSchema = getAppointmentActionSchema(appointmentAction);
  // const formSchema = getAppointmentSchema(appointmentAction);

  // console.log(appointmentAction);

  // console.log(
  //   'buttonLabel:',
  //   buttonLabels[appointmentAction],
  //   'status:',
  //   statusObj[appointmentAction]
  // );

  const form = useForm<z.infer<typeof formSchema.validationSchema>>({
    resolver: zodResolver(formSchema.validationSchema),

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
    /*//@ts-ignore
     defaultValues: formSchema.defaultValues,*/

    defaultValues: {
      primaryPhysician: '',
      schedule: new Date(Date.now()),
      reason: '',
      note: '',
      cancellationReason: '',
    },

    // defaultValues: appointmentFormDefaultValues
    // defaultValues: formSchema.defaultValues,
  });
  //------------------------
  const onSubmit = async (
    // values: z.infer<typeof formSchema>
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

        console.log('appointmentData:', appointmentData);

        const newAppointment = await createAppointment(appointmentData);
        console.log("🚀 ~ newAppointment:", newAppointment)
        


        if (newAppointment) {
          form.reset();
          router.push(
            `patients/${userId}/new-appointment/success?appointmentId=${newAppointment.$id}`
          );
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
        className='form__container flex-1 space-y-6 mb-4 '
      >
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Book your Appointment 📅</h1>
          <p className='text-dark-700'>
            Request a new appointment in 10 seconds
          </p>
        </section>

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

              //how to limit the time value to office hours?
            />

            <div
              className={clsx(
                'flex flex-col gap-6',
                appointmentAction === 'create' && 'xl:flex-row'
              )}
            >
              <CustomFormField
                fieldCategory={FormFieldCategory.TEXTAREA}
                control={form.control}
                name='reason'
                label='Appointment reason'
                placeholder='ex.: Annual/Monthly check-up'
                isDisabled={appointmentAction === 'schedule'}
              />

              <CustomFormField
                fieldCategory={FormFieldCategory.TEXTAREA}
                control={form.control}
                name='note'
                label='Comments / notes'
                placeholder='ex.: Urgent meeting came up'
                isDisabled={appointmentAction === 'schedule'}
              />
            </div>
          </>
        )}

        {appointmentAction !== 'cancel' && (
          <>
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
            appointmentAction === 'cancel' && 'shad-danger-btn'
          )}
        >
          {buttonLabel}
        </FormSubmitButton>
      </form>
    </Form>
  );
};

export default AppointmentForm;
