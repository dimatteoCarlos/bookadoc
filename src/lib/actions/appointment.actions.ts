//CREATE APPWRITE APPOINTMENT 02:55:25
'use server';
import { ID, Query, Models } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

import {
  BUCKET_ID,
  DATABASE_ID,
  databases_module,
  ENDPOINT,
  APPOINTMENT_COLLECTION_ID,
  PROJECT_ID,
  users_module,
} from '../appwrite.config';
import { parseStringify } from '../utils';
import NewAppointment from '../../app/patients/[userId]/new-appointment/page';

export const createAppointment = async (
  appointment: CreateAppointmentParamsType
) => {
  console.log('execute crateUser');

  try {
    const newAppointment = await databases_module.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    // console.log(
    //   'Reg Action parseStringify: ',
    //   parseStringify<Models.Document>(newPatient)
    // );

    return parseStringify<Models.Document>(newAppointment);
  } catch (error) {
    console.error(error);
  }
};
