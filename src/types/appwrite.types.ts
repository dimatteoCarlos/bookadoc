//El módulo `Models` organiza los tipos de datos que Appwrite usa para representar usuarios, documentos, archivos, bases de datos, sesiones, equipos, y más. Estos modelos son esenciales para manejar las respuestas de las APIs de manera estructurada, especialmente en proyectos TypeScript. 

//#### **3. `Document`**Representa un documento almacenado en una colección.
/*- **Campos principales:**
  - `$id`: ID único del documento.
  - `$collectionId`: ID de la colección a la que pertenece.
  - `$databaseId`: ID de la base de datos.
  - `data`: Objeto con los datos del documento.
*/


import { Models } from "node-appwrite";

export interface Patient extends Models.Document {
  userId: string;
  name: string;
  email: string;
  phone: string;
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

export interface Appointment extends Models.Document {
  patient: Patient;
  schedule: Date;
  status: Status;
  primaryPhysician: string;
  reason: string;
  note: string;
  userId: string;
  cancellationReason: string | null;
}