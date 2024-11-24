'use client';

// import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserFormValidationObj } from '@/lib/validationFormSchema';

import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import FormSubmitButton from '../FormSubmitButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

//Create validation schema
const formSchema = UserFormValidationObj;

export enum FormFieldCategory {
  USER_INPUT = 'input',
  EMAIL_INPUT = 'email',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
}

// export type ControlType = {
//   control: ReturnType<typeof useForm>['control'];
// };

const PatientForm = () => {
  // router: Initializes the Next.js router to allow navigation after the form is successfully submitted.
  // const router = useRouter();
  // isLoading: State to track whether the form is being processed (useful for showing loading indicators).
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define your form.
  // useForm: Initializes the form handling. The generic <z.infer<typeof UserFormValidation>> ensures the form follows the Zod validation schema.

  const form = useForm<z.infer<typeof formSchema.validationSchema>>({
    // resolver: Sets up the form to use the Zod schema validation (i.e. UserFormValidation).
    resolver: zodResolver(formSchema.validationSchema),
    // defaultValues: Sets initial values for the form fields (empty strings for name, email, and phone).
    defaultValues: formSchema.defaultValues,
  });

  // 2. Define a submit handler.

  // console.log('esto es form:', form);

  const onSubmit = async (
    values: z.infer<typeof formSchema.validationSchema>
  ) => {
    setIsLoading(true);
    try {
      // const { name, email, phone } = values;

      const user = { ...values };

      console.log(user);
      // const newUser= await createUser(user)
      // if (newUser){router.push(`/patients/${newUser.$id}/register`)}
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  //field category and its schema

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex-1 space-y-6 mb-4 '
      >
        <section className='mb-12 space-y-4'>
          <h1 className='header'>Hi there 👋</h1>
          <p className='text-dark-700'>Schedule your appointment.</p>
        </section>

        {/* <div className='form__fields flex flex-col gap-4'> */}
        {/* Input full name */}
        <CustomFormField
          fieldCategory={FormFieldCategory.USER_INPUT}
          control={form.control}
          name='name'
          label='Full name'
          placeholder='name & lastname'
          iconSrc='/assets/icons/user.svg'
          iconAlt='user'
        />

        {/* Input email */}
        <CustomFormField
          fieldCategory={FormFieldCategory.EMAIL_INPUT}
          control={form.control}
          name='email'
          label='Email address'
          placeholder='email@provider.dom'
          iconSrc='/assets/icons/email.svg'
          iconAlt='email'
        />
        {/* Input email */}
        <CustomFormField
          fieldCategory={FormFieldCategory.PHONE_INPUT}
          control={form.control}
          name='phone'
          label='Phone number'
          placeholder='(555) 123-4567'
        />

        <FormSubmitButton isLoading={isLoading}>Get Started</FormSubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
