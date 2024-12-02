import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringify(obj: any) {
  //stringify - Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  //parse - Converts a JavaScript Object Notation (JSON) string, into an object.
  return JSON.parse(JSON.stringify(obj));
}

export function getFileName(filePath: string): string {
  const regex = /[^/\\]+(?=\.[^/\\]+$)/;
  const match = filePath.match(regex);
  return match ? match[0] : '';
}


//El método estático URL.createObjectURL() crea un DOMString que contiene una URL que representa al objeto pasado como parámetro. La vida de la URL está ligado al document de la ventana en la que fue creada. El nuevo objeto URL representa al objeto File especificado o al objeto Blob.

export const convertFileToUrl=(file:File)=> {
  console.log('File:', File, 'name:', file.name, 'size:', file.size, 'type:', file.type, 'lastModified:', (new Date(file.lastModified)).toLocaleString(), )
  return URL.createObjectURL(file)
}


