//CREATE APPWRITE APPOINTMENT 02:56:25
'use server';
import { ID, Models } from 'node-appwrite';

import {
  DATABASE_ID,
  databases_module,
  APPOINTMENT_COLLECTION_ID,
  ENDPOINT,
  PROJECT_ID,
  users_module,
  BUCKET_ID,
} from '../appwrite.config';
import { parseStringify } from '../utils';

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

    console.log('Reg Action parseStringify: ', newAppointment);

    return parseStringify<Models.Document>(newAppointment);
  } catch (error) {
    console.error(error);
  }
};

//------------

//GET APPOINTMENT formatDateTime appointment.schedule .dateTime? que es asChild Buttno, variant outline
export async function getAppointment(documentId: string) {
  try {
    const document = await databases_module.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      documentId
    );
    return parseStringify(document);
  } catch (error) {
    console.error(
      `error occurred while getting the appointment document:, ${documentId}`,
      error
    );

    // throw new Error('could not get the document');
  }
}
