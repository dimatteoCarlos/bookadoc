/* eslint-disable no-unused-vars */

declare type SearchParamPropsType = {
  params: { [key: string]: string };
  searchParams?: { [key: string]: string | string[] | undefined };
};

declare type GenderType = 'male' | 'female' | 'other';
declare type StatusType = 'pending' | 'scheduled' | 'cancelled';

declare interface CreateUserParamsType {
  name: string;
  email: string;
  phone: string;
}
declare type UserType = CreateUserParamsType & {
  $id: string;
};
// declare interface User extends CreateUserParamsType {
//   $id: string;
// }

declare interface RegisterUserParamsType extends CreateUserParamsType {
  userId: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  occupation: string;
  emergencyContactName: string;
  emergencyContactNumber: string;
  primaryPhysician: string;
  insuranceProvider: string;
  insurancePolicyNumber: string;
  allergies: string | undefined;
  currentMedication: string | undefined;
  familyMedicalHistory: string | undefined;
  pastMedicalHistory: string | undefined;
  identificationType: string | undefined;
  identificationNumber: string | undefined;
  identificationDocument: FormData | undefined;
  privacyConsent: boolean;
}

/*------------*/
declare type   AppointmentActionType = 'create' | 'cancel' | 'schedule'

declare type CreateAppointmentParamsType = {
  userId: string;
  patient: string;
  primaryPhysician?: string;
  reason?: string;
  schedule: Date;
  status: StatusType;
  note: string | undefined;
};

declare type UpdateAppointmentParamsType = {
  appointmentId: string;
  userId: string;
  timeZone?: string;
  appointment: Appointment;
  appointmentAction: AppointmentActionType
  ;

};
