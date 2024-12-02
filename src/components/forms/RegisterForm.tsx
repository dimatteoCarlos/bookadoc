'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { PatientFormValidationObj } from '@/lib/validationFormSchema';

import { Form, FormControl } from '@/components/ui/form';
import { SelectGroup, SelectItem, SelectLabel } from '@/components/ui/select';

import CustomFormField, { FormFieldCategory } from '../CustomFormField';

import FormSubmitButton from '../FormSubmitButton';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Doctors, GenderOptions, IdentificationTypes } from '@/constants';

// import { registerPatient } from "@/lib/actions/patient.actions";
import { createUser } from '@/lib/actions/patient.actions';
import { TitleForm } from '../TitleForm';
import Image from 'next/image';
import FileUploader from '../FileUploader';
import { FileDiff, FileUp } from 'lucide-react';

/*
import { SelectItem } from "@/components/ui/select"; 
import { FileUploader } from "../FileUploader";
*/

export type TitleFormPropType = { formTitle: string };

//----------------------------
const RegisterForm = ({ user }: { user: UserType }) => {
  //-------------------
  //Create validation schema
  const formSchemaValidation = PatientFormValidationObj;
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchemaValidation.validationSchema>>({
    resolver: zodResolver(formSchemaValidation.validationSchema),
    defaultValues: formSchemaValidation.defaultValues,
  });

  // 2. Define a submit handler.
  const onSubmit = async (
    values: z.infer<typeof formSchemaValidation.validationSchema>
  ) => {
    setIsLoading(true);

    // Store file info in form data as

    try {
      // const { name, email, phone } = values;

      const user = { ...values };

      console.log('user:', user);

      const newUser = await createUser(user);
      console.log('newUser:', newUser);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log('endpoint:', process.env.NEXT_PUBLIC_ENDPOINT);
      console.log(error);
    }
    setIsLoading(false);
  };

  //field category and its schema

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='form__container flex-1 space-y-12 xmb-4 xw-full'
      >
        <section className='formHeader space-y-4'>
          <h1 className='header'>Your medical history 🩺</h1>
          <p className='text-dark-600 text-lg'>Let us know about yourself</p>
          <p className='text-dark-700 text-base'>
            Allow us to review your medical history to ensure we can provide a
            consultation tailored to your specific needs
          </p>
        </section>

        <section className='sectionForm__1 space-y-6'>
          <TitleForm formTitle='Personal Information' />

          {/* Input full name */}
          <CustomFormField
            fieldCategory={FormFieldCategory.USER_INPUT}
            control={form.control}
            name='name'
            label='Full Name'
            placeholder='name  lastname'
            iconSrc='/assets/icons/user.svg'
            iconAlt='user'
          />
          <div className='email_and_phone flex flex-col gap-6 xl:flex-row'>
            {/* Input email */}
            <CustomFormField
              fieldCategory={FormFieldCategory.EMAIL_INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='email@provider.com'
              iconSrc='/assets/icons/email.svg'
              iconAlt='email'
            />

            {/* Input phone */}
            <CustomFormField
              fieldCategory={FormFieldCategory.PHONE_INPUT}
              control={form.control}
              name='phone'
              label='Phone number'
              placeholder='(555) 123-4567'
            />
          </div>

          {/* {//---------------} */}

          {/* BirthDate & Gender */}

          <div className='birthDate_and_gender flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldCategory={FormFieldCategory.DATE_PICKER}
              control={form.control}
              name='birthDate'
              label='Date of Birth'
            />

            <CustomFormField
              fieldCategory={FormFieldCategory.GENDER}
              control={form.control}
              name='gender'
              label='Gender'
            />
          </div>

          {/* Address & Occupation */}

          <div className='address_and_occupation flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldCategory={FormFieldCategory.USER_INPUT}
              control={form.control}
              name='address'
              label='Address'
              placeholder='num st, num ave city'
            />

            <CustomFormField
              fieldCategory={FormFieldCategory.USER_INPUT}
              control={form.control}
              name='occupation'
              label='Occupation'
              placeholder='patient occupation'
            />
          </div>

          {/* Emergency Contact Name & Emergency Contact Number */}

          <div className='address_and_occupation flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldCategory={FormFieldCategory.USER_INPUT}
              control={form.control}
              name='emergencyContactName'
              label='Emergency Contact Name'
              placeholder="Guardian's name"
            />

            <CustomFormField
              fieldCategory={FormFieldCategory.PHONE_INPUT}
              control={form.control}
              name={'emergencyContactNumber'}
              label='Emergency Contact Number'
              placeholder='example: (555) 123-4567'
            />
          </div>
        </section>

        <section className='sectionForm__2 space-y-6'>
          <TitleForm formTitle='Medical Information' />

          <CustomFormField
            fieldCategory={FormFieldCategory.SELECT}
            control={form.control}
            name={'primaryPhysician'}
            label='Select Primary Physician'
            placeholder='Select a physician'
          >
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
          </CustomFormField>

          {/* INSURANCE & POLICY NUMBER */}
          <div className='flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldCategory={FormFieldCategory.USER_INPUT}
              control={form.control}
              name='insuranceProvider'
              label='Insurance provider'
              placeholder='ex.: BlueCross BlueShield'
            />

            <CustomFormField
              fieldCategory={FormFieldCategory.USER_INPUT}
              control={form.control}
              name='insurancePolicyNumber'
              label='Insurance policy number'
              placeholder='ex.: ABC123456789'
            />
          </div>

          {/* ALLERGY & CURRENT MEDICATIONS */}
          <div className='flex flex-col gap-6 xxl:flex-row'>
            <CustomFormField
              fieldCategory={FormFieldCategory.TEXTAREA}
              control={form.control}
              name='allergies'
              label='Allergies (if any)'
              placeholder='ex.:Peanuts, Pollen, AINES'
              className='bg-red-500 resize-none focus:outline-none '
            />

            <CustomFormField
              fieldCategory={FormFieldCategory.TEXTAREA}
              control={form.control}
              name='currentMedication'
              label='Current medications'
              placeholder='ex. medications'
            />
          </div>

          {/* FAMILY MEDICATION & PAST MEDICATIONS */}
          <div className='flex flex-col gap-6 xxl:flex-row'>
            <CustomFormField
              fieldCategory={FormFieldCategory.TEXTAREA}
              control={form.control}
              name='familyMedicalHistory'
              label=' Family medical history (if relevant)'
              placeholder='ex. from direct ancestors'
            />

            <CustomFormField
              fieldCategory={FormFieldCategory.TEXTAREA}
              control={form.control}
              name='pastMedicalHistory'
              label='Past medical history'
              placeholder='e.x.: Appendectomy in 2015, Asthma diagnosis in childhood'
            />
          </div>
        </section>

        <section className='sectionForm__3 space-y-4'>
          <TitleForm formTitle='Identification and Verification' />

          <div className='email_and_phone flex flex-col gap-6 xl:flex-row'>
            <CustomFormField
              fieldCategory={FormFieldCategory.SELECT}
              control={form.control}
              name='identificationType'
              label='Identification Type'
            >
              {IdentificationTypes.map((idtype, i) => (
                <SelectItem value={idtype} key={idtype + i}>
                  {idtype}
                </SelectItem>
              ))}
            </CustomFormField>

            <CustomFormField
              fieldCategory={FormFieldCategory.USER_INPUT}
              control={form.control}
              name='identificationNumber'
              label='Identification Number'
              placeholder={'valid identification number'}
            />
          </div>

          <CustomFormField
            fieldCategory={FormFieldCategory.SKELETON}
            control={form.control}
            name='identificationDocument'
            label='Identification Document'
            placeholder={'Scanned of Identification Document'}
            renderSkeleton={(field) => (
              <FormControl>
                <FileUploader
                  files={field.value}
                  onChange={field.onChange}
                ></FileUploader>
              </FormControl>
            )}
          />
        </section>

        <section className='sectionForm__4 space-y-4'>
          <TitleForm formTitle='Consent and Privacy' />

          <CustomFormField
            fieldCategory={FormFieldCategory.CHECKBOX}
            control={form.control}
            name='treatmentConsent'
            label='I consent to receive treatment for my health condition.'
          />

          <CustomFormField
            fieldCategory={FormFieldCategory.CHECKBOX}
            control={form.control}
            name='disclosureConsent'
            label='I consent to the use and disclosure of my health
            information for treatment purposes.'
          />

          <CustomFormField
            fieldCategory={FormFieldCategory.CHECKBOX}
            control={form.control}
            name='privacyConsent'
            label='I acknowledge that I have reviewed and agreed to the
            privacy policy'
          />
        </section>

        <FormSubmitButton isLoading={isLoading}>Get Started</FormSubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
