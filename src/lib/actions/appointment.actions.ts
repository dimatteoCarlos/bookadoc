//CREATE APPWRITE APPOINTMENT
'use server';
import { ID, Models, Query } from 'node-appwrite';

import {
  DATABASE_ID,
  databases_module,
  APPOINTMENT_COLLECTION_ID,
  // ENDPOINT,
  // PROJECT_ID,
  // users_module,
  // BUCKET_ID,
} from '../appwrite.config';
import { parseStringify } from '../utils';
import { AppointmentType } from '@/types/appwrite.types';

export const createAppointment = async (
  appointment: CreateAppointmentParamsType
) => {
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

//GET APPOINTMENT
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
  }
}

//----------------
// GETRECENTAPPOINTMENT LIST

type Counts = {
  scheduled: number;
  pending: number;
  cancelled: number;
};

let countByStatus: Counts = {
  scheduled: 0,
  pending: 0,
  cancelled: 0,
};

//GET RECENT APPOINTMENTS

export const getRecentAppointmentList = async () => {
  try {
    /* The response for a - listDocuments of database appwrite - request with a query will contain:
        total: The total number of matching documents in the collection (ignoring pagination).
        documents: An array of documents that match the query conditions.
        cursor: A cursor that can be used for pagination.
    */
    const response = await databases_module.listDocuments(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      [Query.orderDesc('$createdAt')]
    );

    const recentAppointments = response.documents as AppointmentType[];

    for (const appointment of recentAppointments) {
      const statusKey = appointment.status;
      countByStatus[statusKey]++;
    }

    const data = {
      total_appointments_count: response.total,
      recentAppointments,
      countByStatus,
    };

    return parseStringify(data);
    
  } catch (error) {
    console.error('Error occurred while retrieving the recent appointments');
  }
};
