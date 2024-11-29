import * as sdk from 'node-appwrite';

// import {Client} from 'node-appwrite'
// const client = new Client()

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  
  NEXT_PUBLIC_BUCKET_ID: BUCKET_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;


export const client = new sdk.Client();

// console.log('from appwrite.config.ts:', ENDPOINT, PROJECT_ID, API_KEY)

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);
// client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

//create specific instances of 'appwrite services so the application can use them to interact with the Appwrite backend

export const databases = new sdk.Databases(client); //perform CRUD of documents in database
export const users = new sdk.Users(client); //managing user-related operations: registration, login, and profile administration.
export const messaging = new sdk.Messaging(client); //sending and managing notifications or messages
export const storage = new sdk.Storage(client); //Used to upload, list, download, and delete files

// client is previously configured with the server endpoint and project, allowing these instances to perform requests to the backend



