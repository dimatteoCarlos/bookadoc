**Book_a_Doc** project

## This app was inspired by the public youtube video tutorial of JavaScript Mastery

# Book_a_Doc

**Book_a_Doc** is a patient management system designed to simplify patient registration, appointment scheduling, and medical records for healthcare providers.

## Table of Contents

1. [Description](#description)
2. [Features](#features)
3. [Prerequisites](#prerequisites)
4. [Installation](#installation)
5. [Usage](#usage)
6. [Available Scripts](#available-scripts)
7. [Technologies Used](#technologies-used)
8. [Contributing](#contributing)
9. [License](#license)

## Description

**Book_a_Doc** is a comprehensive solution for managing medical appointments and patient data. It allows healthcare providers to easily manage patient registrations, schedule appointments, and maintain medical records, all in one platform.

## Features

- **Patient Management**: Register patients with their personal and medical information.
- **Appointment Scheduling**: Manage and schedule medical appointments, view availability, and track upcoming appointments.
- **Medical Records**: Keep track of patient medical history and other relevant data.
- **User-friendly Interface**: Built with React, Next.js, and styled with Tailwind CSS, supporting dark and light themes.

## Prerequisites

Before running this project, ensure you have the following installed on your machine:

- **Node.js** (v16 or higher)
- **Yarn** or **npm** (package managers)
- **Git** (for cloning the repository)

## Installation

Follow these steps to set up the project on your local machine:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/bookadoc.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd bookadoc
   ```

3. **Install the dependencies**:
   Using **npm**:

   ```bash
   npm install
   ```

   Or using **yarn**:

   ```bash
   yarn install
   ```

## Usage

Once the dependencies are installed, you can start the development server using the following command:

```bash
npm run dev
```

Or if you're using **yarn**:

```bash
yarn dev
```

The app will be running on [http://localhost:3000](http://localhost:3000), where you can view it in your browser.

### Available Scripts

- **`dev`**: Starts the development server with Next.js.
- **`build`**: Builds the application for production.
- **`start`**: Starts the app in production mode.
- **`lint`**: Runs ESLint to check for code quality issues.

## Technologies Used

This project is built with the following technologies:

- **React** (v19) - JavaScript library for building user interfaces.
- **Next.js** (v15.0.3) - Framework for server-side rendering (SSR) and static site generation (SSG) in React.
- **Tailwind CSS** - Utility-first CSS framework for designing responsive interfaces.
- **Zod** - Type-safe schema validation library.
- **TypeScript** - Superset of JavaScript that adds static types.
- **Node.js** - JavaScript runtime environment.
- **Appwrite** - Backend-as-a-Service (BaaS) platform for authentication, databases, and file storage.

## Available Scripts

In the project directory, you can run the following scripts:

- **`dev`**: Starts the development server.
- **`build`**: Builds the application for production.
- **`start`**: Starts the app in production mode.
- **`lint`**: Runs the linting process using ESLint.

## Contributing

We welcome contributions! To contribute to the project, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your branch (`git push origin feature/new-feature`).
5. Open a Pull Request to have your changes reviewed and merged.

## License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

### Additional Notes

**Key Dependencies**:

- **@radix-ui/react**: A set of UI components designed with accessibility in mind.
- **@tanstack/react-table**: A powerful table library for managing dynamic data.
- **react-hook-form**: Library for handling form validation and management in React.
- **date-fns** & **react-datepicker**: Libraries for handling and selecting dates in the UI.

**Environment Variables**:  
The project relies on environment variables for configuration. Make sure to configure the required `.env` file with the necessary settings.

```env example:

NEXT_PUBLIC_API_URL=https://api.bookadoc.com
NEXT_PUBLIC_APPWRITE_ENDPOINT=https://appwrite.example.com
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

---

## DATA BASE STRUCTURE ON APPWRITE

---

## Database Structure

In **Appwrite**, it was defined **Collections** to store and organize the data used by the application. Below is an overview of the database structure for **Book_a_Doc**.

### 1. **Patients Collection**

This collection stores all the personal and medical information related to the patients.

#### Collection Name: `patients`

#### Attributes:

- **id**: (string, auto-generated by Appwrite) - A unique identifier for each patient.
- **first_name**: (string) - The first name of the patient.
- **last_name**: (string) - The last name of the patient.
- **date_of_birth**: (date) - The birth date of the patient.
- **gender**: (string) - The gender of the patient (e.g., "male", "female", "other").
- **email**: (string) - The email address of the patient.
- **phone_number**: (string) - The phone number of the patient.
- **address**: (string) - The address of the patient.
- **medical_history**: (array of strings) - An array containing medical conditions or previous illnesses.
- **emergency_contact**: (object) - Emergency contact details.
  - **name**: (string) - The name of the emergency contact.
  - **relationship**: (string) - The relationship of the emergency contact to the patient.
  - **phone_number**: (string) - Phone number of the emergency contact.
- **created_at**: (timestamp) - Timestamp when the patient was registered.
- **updated_at**: (timestamp) - Timestamp when the patient details were last updated.

#### Example Document:

```json
{
  "first_name": "John",
  "last_name": "Doe",
  "date_of_birth": "1990-01-01",
  "gender": "male",
  "email": "johndoe@example.com",
  "phone_number": "+1234567890",
  "address": "123 Main St, Anytown",
  "medical_history": ["Hypertension", "Asthma"],
  "emergency_contact": {
    "name": "Jane Doe",
    "relationship": "Spouse",
    "phone_number": "+0987654321"
  },
  "created_at": "2023-12-13T00:00:00Z",
  "updated_at": "2023-12-13T00:00:00Z"
}
```

### 2. **Appointments Collection**

This collection stores information related to appointments scheduled by patients and healthcare providers.

#### Collection Name: `appointments`

#### Attributes:

- **id**: (string, auto-generated by Appwrite) - A unique identifier for each appointment.
- **patient_id**: (string) - The unique identifier of the patient who has scheduled the appointment (foreign key to the `patients` collection).
- **doctor_name**: (string) - The name of the doctor or healthcare provider.
- **appointment_date**: (datetime) - The date and time of the appointment.
- **appointment_type**: (string) - Type of appointment (e.g., "General Checkup", "Follow-up", "Consultation").
- **status**: (string) - The status of the appointment (e.g., "scheduled", "completed", "cancelled").
- **created_at**: (timestamp) - Timestamp when the appointment was created.
- **updated_at**: (timestamp) - Timestamp when the appointment details were last updated.

#### Example Document:

```json
{
  "patient_id": "patient123",
  "doctor_name": "Dr. Sarah Smith",
  "appointment_date": "2023-12-14T10:30:00Z",
  "appointment_type": "General Checkup",
  "status": "scheduled",
  "created_at": "2023-12-13T00:00:00Z",
  "updated_at": "2023-12-13T00:00:00Z"
}
```

### 3. **Medical Records Collection**

This collection holds the medical records of each patient, such as prescriptions, test results, and medical notes from healthcare providers.

#### Collection Name: `medical_records`

#### Attributes:

- **id**: (string, auto-generated by Appwrite) - A unique identifier for each medical record.
- **patient_id**: (string) - The unique identifier of the patient (foreign key to the `patients` collection).
- **record_date**: (datetime) - The date when the record was created or updated.
- **record_type**: (string) - Type of record (e.g., "Prescription", "Lab Results", "Doctor's Notes").
- **details**: (string) - Detailed information about the record (e.g., prescription details, test results).
- **created_by**: (string) - The healthcare provider who created or updated the record (e.g., doctor name).
- **created_at**: (timestamp) - Timestamp when the record was created.
- **updated_at**: (timestamp) - Timestamp when the record was last updated.

#### Example Document:

```json
{
  "patient_id": "patient123",
  "record_date": "2023-12-10T00:00:00Z",
  "record_type": "Prescription",
  "details": "Paracetamol 500mg, take 1 tablet every 6 hours",
  "created_by": "Dr. Sarah Smith",
  "created_at": "2023-12-10T00:00:00Z",
  "updated_at": "2023-12-10T00:00:00Z"
}
```

### 4. **Users Collection (optional - next challenge)**

If your system includes users with roles like **admin**, **doctor**, or **patient**, you can have a collection to store user credentials and roles.

#### Collection Name: `users`

#### Attributes:

- **id**: (string, auto-generated by Appwrite) - Unique identifier for each user.
- **username**: (string) - Username for the user (e.g., doctor's name or email).
- **email**: (string) - Email address.
- **role**: (string) - User's role (e.g., "admin", "doctor", "patient").
- **password**: (string, hashed) - The user's hashed password (stored securely).
- **last_login**: (timestamp) - The last time the user logged in.
- **created_at**: (timestamp) - Timestamp when the user was created.
- **updated_at**: (timestamp) - Timestamp when the user details were last updated.

#### Example Document:

```json
{
  "username": "dr.johndoe",
  "email": "dr.johndoe@example.com",
  "role": "doctor",
  "password": "[hashed password]",
  "last_login": "2023-12-13T00:00:00Z",
  "created_at": "2023-12-01T00:00:00Z",
  "updated_at": "2023-12-13T00:00:00Z"
}
```

---

## Summary of Collections and Attributes

1. **Patients Collection**  
   Stores patient personal and medical information, such as names, birthdate, medical history, and emergency contacts.

2. **Appointments Collection**  
   Stores appointment data, linking patients with healthcare providers, appointment dates, and statuses.

3. **Medical Records Collection**  
   Stores medical records for each patient, such as prescriptions, lab results, and medical notes from healthcare providers.

4. **Users Collection (optional)**  
   Manages the authentication and roles for users, including doctors, admins, and patients.

---

## Summary of IDs Needed

Database ID
Example: database_id_example

Collection ID
Example:
patients_collection_id_example
appointments_collection_id_example
medical_records_collection_id_example

Document ID
Example: document_id_example

User ID (optional)
Example: user_id_example

In Book_a_Doc, it was used the react-dropzone library to enable a drag-and-drop file upload feature, allowing users to easily upload documents. This intuitive library integrates seamlessly with Appwrite Storage, where files are stored in the cloud. Appwrite Storage handles the efficient upload, management, and retrieval of files, such as medical records and images, ensuring fast and scalable access while maintaining necessary security standards.
