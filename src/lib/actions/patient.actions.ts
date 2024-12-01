//CREATE APPWRITE USER
'use server';
import { ID, Query } from 'node-appwrite';

import { users_module } from '../appwrite.config';
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
          Query.equal('email', [user.email]),
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

//Query es un módulo del SDK de Appwrite que te permite construir filtros para buscar o consultar datos en la base de datos o en listas de usuarios. Funciona creando consultas específicas basadas en condiciones

//ID es un módulo utilitario del SDK de Appwrite. Su propósito es generar valores únicos para identificadores (IDs) cuando trabajas con usuarios, documentos, archivos, etc.

//users es una instancia del modulo Users. Users: Es el módulo del SDK que administra los usuarios registrados.
