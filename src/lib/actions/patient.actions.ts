
'use server';
import { ID, Query, Models } from 'node-appwrite';
import { InputFile } from 'node-appwrite/file';

import {
  BUCKET_ID,
  DATABASE_ID,
  databases_module,
  ENDPOINT,
  PATIENT_COLLECTION_ID,
  PROJECT_ID,
  storage_module,
  users_module,
} from '../appwrite.config';
import { parseStringify } from '../utils';
import { PatientType } from '@/types/appwrite.types';

//CREATE APPWRITE USER

export const createUser = async (user: CreateUserParamsType) => {
  console.log('execute crateUser');

  try {
    const { email, name, phone } = user;

    console.log('action:', email, name, phone);

    const newuser = await users_module.create(
      'unique()',
      // ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    ); // ordered arg from appwrite
    console.log('newUser:', newuser);

    return parseStringify(newuser);
  } catch (error: any) {
    
    //Check existing user

    if (error) {
      if (error && error?.code === 409) {
        const documents = await users_module.list([
          Query.equal('email', [user.email]), //should be unique
        ]);

        console.log('document already exists:', documents);

        return documents?.users[0];
      }
      console.error('An error has occurred while creating a new user:', error);
    }
  }
};

//GET USER

export async function getUser(userId: string) {
  try {
    const user = await users_module.get(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    // console.log('user:', user);
    return parseStringify(user) as UserType;
  } catch (error) {
    console.error(
      'An error occurred while retrieving the user details:',
      error
    );
  }
}

/*appwrite returns: {
  "$id": "user1234",
  "$createdAt": "2024-01-01T00:00:00.000Z",
  "$updatedAt": "2024-12-06T10:00:00.000Z",
  "email": "user@example.com",
  "name": "John Doe",
  "registration": {
    "provider": "email",
    "date": "2024-01-01T00:00:00.000Z"
  },
  "prefs": {
    // Preferencias del usuario, si están configuradas
  }
}
  */

//REGISTER PATIENT

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParamsType) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let fileUploaded;


    if (identificationDocument) {
      //sintaxis of InputFile from appwrite: The InputFile class in the Appwrite Node.js SDK is a file object used to represent a file that is going to be uploaded

      // InputFile.fromBlob(blob: Blob, fileName: string): InputFile

      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('blobFileName') as string
      );

      fileUploaded = await storage_module.createFile(
        BUCKET_ID!,
        ID.unique(),
        inputFile
      );
      console.log('File uploaded successfully:', fileUploaded);

      // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases_module#createDocument

      const newPatient = await databases_module.createDocument(
        DATABASE_ID!,
        PATIENT_COLLECTION_ID!,
        ID.unique(),
        {
          identificationDocumentId: fileUploaded?.$id ? fileUploaded.$id : null,
          identificationDocumentUrl: fileUploaded?.$id
            ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${fileUploaded.$id}/view?project=${PROJECT_ID}`
            : null,
          ...patient,
        }
      );

      // console.log(
      //   'Reg Action parseStringify: ',
      //   parseStringify<Models.Document>(newPatient)
      // );

      return parseStringify<Models.Document>(newPatient);
    }
  } catch (error: any) {
    console.error('An error occurred while registering a new patient:', error);

    // return { success: false, error: error.message || "An internal error occurred. Please try again later." };
  }
};

//GET PATIENT

export async function getPatient(userId: string) {
  try {
    const patientDocuments = await databases_module.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,

      [
        Query.equal('userId', [userId]), //
      ]
    );

    return parseStringify(patientDocuments.documents[0]) as PatientType;
  } catch (error) {
    console.log(
      'An error occurred while retrieving the patient documents of ',
      userId,
      ' ',
      error
    );
  }
}

//Query es un módulo del SDK de Appwrite que te permite construir filtros para buscar o consultar datos en la base de datos o en listas de usuarios. Funciona creando consultas específicas basadas en condiciones

//ID es un módulo utilitario del SDK de Appwrite. Su propósito es generar valores únicos para identificadores (IDs) cuando trabajas con usuarios, documentos, archivos, etc.

//users es una instancia del modulo Users. Users: Es el módulo del SDK que administra los usuarios registrados.
