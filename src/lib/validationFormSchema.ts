import { z } from 'zod';

//-------date time validation ------
import { parse, isValid, setHours, setMinutes } from 'date-fns';
const dateFormat = 'dd/MM/yyyy - h:mm a';

const validateBusinessHours = (date: Date) => {
  const startOfDay = setHours(setMinutes(date, 0), 8); //8:00 am}
  const endOfDay = setHours(setMinutes(date, 0), 17); //5:00pm}
  console.log(date, startOfDay, endOfDay);
  return date >= startOfDay && endOfDay;
};

export const UserFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),
});

//phone:z.string().refine((phone)=>/^\+?[1-9]\d{1-14}$/.test(phone))

export const UserFormValidationObj = {
  validationSchema: UserFormValidation,
  defaultValues: { name: '', email: '', phone: '' },
};

export const PatientFormValidation = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .refine((phone) => /^\+\d{10,15}$/.test(phone), 'Invalid phone number'),

  //coerce: Es un método de Zod que permite forzar la conversión de un valor a un tipo específico, en lugar de solo validar si el valor ya es del tipo esperado.

  birthDate: z.coerce.date(),
  gender: z.enum(['male', 'female', 'other']),
  address: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(500, 'Address must be at most 500 characters'),
  occupation: z
    .string()
    .min(2, 'Occupation must be at least 2 characters')
    .max(500, 'Occupation must be at most 500 characters'),
  emergencyContactName: z
    .string()
    .min(2, 'Contact name must be at least 2 characters')
    .max(50, 'Contact name must be at most 50 characters'),
  emergencyContactNumber: z
    .string()
    .refine(
      (emergencyContactNumber) => /^\+\d{10,15}$/.test(emergencyContactNumber),
      'Invalid phone number'
    ),
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  insuranceProvider: z
    .string()
    .min(2, 'Insurance name must be at least 2 characters')
    .max(50, 'Insurance name must be at most 50 characters'),
  insurancePolicyNumber: z
    .string()
    .min(2, 'Policy number must be at least 2 characters')
    .max(50, 'Policy number must be at most 50 characters'),
  allergies: z.string().optional(),
  currentMedication: z.string().optional(),
  familyMedicalHistory: z.string().optional(),
  pastMedicalHistory: z.string().optional(),
  identificationType: z.string().optional(),
  identificationNumber: z.string().optional(),
  identificationDocument: z.custom<File[]>().optional(),
  treatmentConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to treatment in order to proceed',
    }),
  disclosureConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to disclosure in order to proceed',
    }),
  privacyConsent: z
    .boolean()
    .default(false)
    .refine((value) => value === true, {
      message: 'You must consent to privacy in order to proceed',
    }),
});

export const PatientFormDefaultValues = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  birthDate: new Date(Date.now()),
  gender: 'male' as GenderType,
  address: '',
  occupation: '',
  emergencyContactName: '',
  emergencyContactNumber: '',
  primaryPhysician: '',
  insuranceProvider: '',
  insurancePolicyNumber: '',
  allergies: '',
  currentMedication: '',
  familyMedicalHistory: '',
  pastMedicalHistory: '',
  identificationType: 'Birth Certificate',
  identificationNumber: '',
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const PatientFormValidationObj = {
  validationSchema: PatientFormValidation,

  defaultValues: PatientFormDefaultValues,
};

//-------------

export const CreateAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),

  // schedule: z.string().refine(
  //   (val) => {
  //     const parseDate = parse(val, dateFormat, new Date());

  //     //Comprabar si la fecha es valida y esta dentro del rango de horas
  //     return isValid(parseDate) && validateBusinessHours(parseDate);
  //   },
  //   { message: 'Schedule must be between 8:00 am and 5:00 pm' }
  // ),

  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const ScheduleAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CancelAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),
  schedule: z.coerce.date(),
  reason: z.string().optional(),
  note: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export function getAppointmentSchema(type: string) {
  switch (type) {
    case 'create':
      return CreateAppointmentSchema;
    case 'cancel':
      return CancelAppointmentSchema;
    default:
      return ScheduleAppointmentSchema;
  }
}

// *******************

// Esquema base con campos comunes
const BaseAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),

  schedule: z.coerce.date().refine(
    (val) => {
      const parseDate = parse(val.toISOString(), dateFormat, new Date());
      // Verificar si la fecha es válida antes de hacer la validación adicional

      if (!isValid(parseDate)) {
        return false; // Retornar `false` si la fecha es inválida
      }

      //Comprabar si la fecha es valida y esta dentro del rango de horas
      return isValid(parseDate) && validateBusinessHours(parseDate);
    },
    { message: 'Schedule must be between 8:00 am and 5:00 pm' }
  ),
  note: z.string().optional(),
  cancellationReason: z.string().optional(),
});

export const CreateAppointmentSchemaII = BaseAppointmentSchema.extend({
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export const ScheduleAppointmentSchemaII = BaseAppointmentSchema.extend({
  reason: z.string().optional(),
});

export const CancelAppointmentSchemaII = BaseAppointmentSchema.extend({
  reason: z.string().optional(),
  cancellationReason: z
    .string()
    .min(2, 'Cancellation reason must be at least 2 characters')
    .max(500, 'Cancellation reason must be at most 500 characters'),
});

export type appointmentInfoType = {
  primaryPhysician: string;
  schedule: Date;
  reason?: string;
  note?: string;
  cancellationReason?: string;
};

export const appointmentFormDefaultValues = {
  primaryPhysician: '',
  schedule: new Date(),
  reason: '',
  note: '',
  cancellationReason: '',
};

export function getAppointmentActionSchema(type: AppointmentActionType) {
  const schemaAppointmentAction = {
    create: CreateAppointmentSchemaII,
    cancel: CancelAppointmentSchemaII,
    schedule: ScheduleAppointmentSchemaII,
  };

  const result = {
    validationSchema: schemaAppointmentAction[type],
    defaultValues: appointmentFormDefaultValues,
  };
  return result;
}
