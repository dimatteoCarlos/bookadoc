//CREATE APPWRITE USER
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
    console.log('user:', user);
    return parseStringify(user);
  } catch (error) {
    console.error(
      'An error occurred while retrieving the user details:',
      error
    );
  }
}

//REGISTER PATIENT

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParamsType) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let fileUploaded;
    console.log(
      'type of ID:',
      typeof identificationDocument,
      'ID:',
      identificationDocument
    );

    if (identificationDocument) {
      //sintaxis of InputFile from appwrite: The InputFile class in the Appwrite Node.js SDK is a file object used to represent a file that is going to be uploaded
      // InputFile.fromBlob(blob: Blob, fileName: string): InputFile

      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get('blobFile') as Blob,
        identificationDocument?.get('blobFileName') as string
      );
      console.log('🚀 ~ inputFile:', inputFile);

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

      console.log(
        'docId:',
        newPatient.identificationDocumentId
        // 'docUrl:', newPatient.identificationDocumentUrl
      );

      console.log(
        'Reg Action parseStringify: ',
        parseStringify<Models.Document>(newPatient)
      );

      return parseStringify<Models.Document>(newPatient);
    }
  } catch (error :any) {
    console.error('An error occurred while registering a new patient:', error);
    // return { success: false, error: error.message || "An internal error occurred. Please try again later." };
 
  }
};

//Query es un módulo del SDK de Appwrite que te permite construir filtros para buscar o consultar datos en la base de datos o en listas de usuarios. Funciona creando consultas específicas basadas en condiciones

//ID es un módulo utilitario del SDK de Appwrite. Su propósito es generar valores únicos para identificadores (IDs) cuando trabajas con usuarios, documentos, archivos, etc.

//users es una instancia del modulo Users. Users: Es el módulo del SDK que administra los usuarios registrados.
