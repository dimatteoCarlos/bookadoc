/* eslint-disable no-unused-vars */
// 'use client';

import {
  FormControl,
  // FormDescription,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Label } from './ui/label';

import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  // SelectGroup,
  // SelectItem,
  // SelectLabel,
} from '@/components/ui/select';

import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Control } from 'react-hook-form';
import Image from 'next/image';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';

import { E164Number } from 'libphonenumber-js/core';
import { Input } from './ui/input';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { GenderOptions } from '@/constants';
// import { SelectLabel } from '@radix-ui/react-select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

export enum FormFieldCategory {
  USER_INPUT = 'input',
  EMAIL_INPUT = 'email',
  TEXTAREA = 'textarea',
  PHONE_INPUT = 'phoneInput',
  CHECKBOX = 'checkbox',
  DATE_PICKER = 'datePicker',
  SELECT = 'select',
  SKELETON = 'skeleton',
  GENDER = 'gender',
}

export type CustomFormFieldPropType = {
  fieldCategory: FormFieldCategory;
  control: Control<any>;
  name: string;
  label?: string;
  placeholder?: string;
  iconSrc?: string;
  iconAlt?: string;
  isDisabled?: boolean;
  showTimeSelect?: boolean;
  showYearDropdown?: boolean;
  renderSkeleton?: (field: any) => React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  dateFormat?: string;
};

// RenderControlFormInput for conditionally rendering the input form fields
const RenderControllerFormInput = ({
  field,
  props,
}: {
  field: any;
  props: CustomFormFieldPropType;
}) => {
  const {
    fieldCategory,
    placeholder,
    iconSrc,
    iconAlt,
    showTimeSelect,
    showYearDropdown,
    renderSkeleton,
    children,
    isDisabled,
    name,
    label,
    className,
    dateFormat,
  } = props;

  switch (fieldCategory) {
    case FormFieldCategory.USER_INPUT:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400'>
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
              className='shad-input border-0 '
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
              className='m-2 w-6 h-auto object-contain'
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

    case FormFieldCategory.TEXTAREA:
      return (
        <div className='flex rounded-md border border-dark-500 bg-dark-400 w-full'>
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
            <Textarea
              placeholder={placeholder}
              {...field}
              className={`shad-textArea border-0 resize-none w-full`}
              disabled={isDisabled}
              maxLength='255'
              rows='5'
            />
          </FormControl>
        </div>
      );

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

    //------------
    case FormFieldCategory.DATE_PICKER:
      return (
        <div className='datepicker_wrapper flex rounded-md border border-dark-500 bg-dark-400'>
          <Image
            src='/assets/icons/calendar.svg'
            alt='user'
            className='mx-2'
            height={24}
            width={24}
          />

          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'dd/MM/yyyy'}
              showTimeSelect={showTimeSelect ?? false}
              showYearDropdown={showYearDropdown ?? true}
              scrollableMonthYearDropdown
              //dateFormat = 'Pp'
              // timeFormat='p'
            />
          </FormControl>
        </div>
      );

    case FormFieldCategory.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldCategory.SELECT:
      return (
        <FormControl>
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger className='shad-select-trigger'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent className='shad-select-content'>
              {children}
            </SelectContent>
          </Select>
        </FormControl>
      );

    case FormFieldCategory.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              className='checkbox'
            />
            <label>{label}</label>
          </div>
        </FormControl>
      );

    case FormFieldCategory.GENDER:
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className='radio-group flex h-11 gap-6 xl:justify-between '
          >
            {GenderOptions.map((gender, i) => (
              <div className='radio-group' key={gender + i}>
                <RadioGroupItem value={gender} id={gender} className={''} />
                <Label htmlFor={gender} className='cursor-pointer '>
                  {gender}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </FormControl>
      );

    default:
      break;
  }
};

//-------------------

// El control, retornado por useForm de react-hook-form, es un objeto que proporciona el acceso a métodos de manejo de formularios como la validación y el registro de los campos.

const CustomFormField = (props: CustomFormFieldPropType) => {
  const { fieldCategory, control, name, label, isDisabled} = props;

  return (
    <div className='customFormField w-full'>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className='flex-1 '>
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
