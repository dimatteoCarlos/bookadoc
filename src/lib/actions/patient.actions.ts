//CREATE APPWRITE USER
'use server'
import { ID, Query } from 'node-appwrite';

import { users } from '../appwrite.config';
import { parseStringify } from '../utils';

export const createUser = async (user: CreateUserParams) => {
console.log('paso por aqui')

  try {
    const { email, name, phone } = user;

    console.log('action:', email, name, phone);

    const newuser = await users.create(
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
      const documents = await users.list([Query.equal('email', [user.email])]);

      console.log('documents:', documents);
      return documents?.users[0];
    }
    console.error('An error has occurred while creating a new user:', error);
  }
  
};
}

//Query es un módulo del SDK de Appwrite que te permite construir filtros para buscar o consultar datos en la base de datos o en listas de usuarios. Funciona creando consultas específicas basadas en condiciones

//ID es un módulo utilitario del SDK de Appwrite. Su propósito es generar valores únicos para identificadores (IDs) cuando trabajas con usuarios, documentos, archivos, etc.

//users es una instancia del modulo Users. Users: Es el módulo del SDK que administra los usuarios registrados.

//test creatUser with JWT , or bycrypt
