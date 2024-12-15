import { z } from 'zod';

//-------date time validation ------
import { format, isValid, setHours, setMinutes } from 'date-fns';
const dateFormat = 'dd/MM/yyyy - h:mm a';

const validateBusinessHours = (date: Date) => {
  const startOfDay = setHours(setMinutes(date, 0), 8); //8:00 am}
  const endOfDay = setHours(setMinutes(date, 0), 17); //5:00pm}
  // console.log('Business Hours:', date, 'from:', startOfDay, ' to:', endOfDay);
  return date >= startOfDay && date <= endOfDay;
};

export const minAvailableDate = new Date(
  new Date().setDate(new Date().getDate() + 1)
);

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

  birthDate: z.coerce.date(), //VERFICIAR FECHAS DE MAYORIA DE EDAD
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

// *******************

// base schema with common fields
const BaseAppointmentSchema = z.object({
  primaryPhysician: z.string().min(2, 'Select at least one doctor'),

  //---------------------------

  schedule: z
    .date()
    .refine(
      (val) => {
        // Verificar si la fecha es válida antes de hacer la validación adicional

        if (!isValid(val)) {
          console.error(val, ' is not a valid date');
          return false; //
        }

        //Comprabar si la fecha es valida y esta dentro del rango de horas

        const result = isValid(val) && validateBusinessHours(val);

        return result;
      },

      { message: 'Schedule must be between 8:00 am and 5:00 pm' }
    )
    .refine(
      (val) => {
        if (val < new Date(minAvailableDate)) {
          return false;
        }
        return true;
      },
      {
        message: `Our available dates are after : ${format(
          minAvailableDate,
          'dd/MM/yyyy'
        )}`,
      }
    ),
  //---------------------------

  note: z.string().max(500).optional(),
  cancellationReason: z.string().optional(),
});

export const CreateAppointmentSchema = BaseAppointmentSchema.extend({
  reason: z
    .string()
    .min(2, 'Reason must be at least 2 characters')
    .max(500, 'Reason must be at most 500 characters'),
});

export const ScheduleAppointmentSchema = BaseAppointmentSchema.extend({
  reason: z.string().optional(),
});

export const CancelAppointmentSchema = BaseAppointmentSchema.extend({
  primaryPhysician: z.string().optional(),
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
  schedule: new Date(new Date().setDate(new Date().getDate() + 1)),
  reason: '',
  note: '',
  cancellationReason: 'only valid when cancelling',
};

export function getAppointmentActionSchema(type: AppointmentActionType) {
  const schemaAppointmentAction = {
    create: CreateAppointmentSchema,
    cancel: CancelAppointmentSchema,
    schedule: ScheduleAppointmentSchema,
  };

  const result = {
    validationSchema: schemaAppointmentAction[type],
    defaultValues: appointmentFormDefaultValues,
  };

  return result;
}
