/* eslint-disable no-unused-vars */
// 'use client';

import { Input } from './ui/input';
import {
  FormControl,
  // FormDescription,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from './ui/form';

import { FormFieldCategory } from './forms/PatientForm';
import { Control } from 'react-hook-form';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { E164Number } from 'libphonenumber-js/core';

export type CustomFormFieldPropType = {
  fieldCategory: FormFieldCategory;
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  isDisabled?: boolean;

  // dateFormat?: string;
  // showTimeSelect?: boolean;
  // children?: React.ReactNode;
  // renderSkeleton?: (field: any) => React.ReactNode;
};

// RenderControlFormInput for conditionally rendering the input form fields
const RenderControllerFormInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldPropType;
}) => {
  const { fieldCategory, placeholder, iconSrc, iconAlt } = props;

  switch (fieldCategory) {
    case FormFieldCategory.USER_INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400 '>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              height={24}
              width={24}
              className='m-2'
              priority
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      );

    case FormFieldCategory.EMAIL_INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400 '>
          {iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              height={24}
              width={24}
              className='m-2'
            />
          )}
          <FormControl>
            <Input
              placeholder={placeholder}
              {...field}
              className='shad-input border-0'
            />
          </FormControl>
        </div>
      );
      break;

    case FormFieldCategory.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='US'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined} //why field.value
            onChange={field.onChange}
            className='input-phone'
          />
        </FormControl>
      );

    default:
      break;
  }
};

//-------------------

// El control, retornado por useForm de react-hook-form, es un objeto que proporciona el acceso a métodos de manejo de formularios como la validación y el registro de los campos.

const CustomFormField = (props: CustomFormFieldPropType) => {
  const { fieldCategory, control, name, label, placeholder, iconSrc, iconAlt } =
    props;

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='flex-1'>
            {fieldCategory !== FormFieldCategory.CHECKBOX && !!label && (
              <FormLabel className='shad-input-label'>{label}</FormLabel>
            )}

            {/* form content */}
            <RenderControllerFormInput field={field} props={props} />

            <FormMessage className='shad-error'></FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
};

export default CustomFormField;
