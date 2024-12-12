import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseStringify<T>(obj: T) {
  //stringify - Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  //parse - Converts a JavaScript Object Notation (JSON) string, into an object.

  // console.log('desde utils>', JSON.parse(JSON.stringify(obj)))
  return JSON.parse(JSON.stringify(obj));
}

export function getFileName(filePath: string): string {
  const regex = /[^/\\]+(?=\.[^/\\]+$)/;
  const match = filePath.match(regex);
  return match ? match[0] : '';
}

//El método estático URL.createObjectURL() crea un DOMString que contiene una URL que representa al objeto pasado como parámetro. La vida de la URL está ligado al document de la ventana en la que fue creada. El nuevo objeto URL representa al objeto File especificado o al objeto Blob.

export const convertFileToUrl = (file: File) => {
  console.log(
    'File:',
    File,
    'name:',
    file.name,
    'size:',
    (file.size * Math.pow(1024, -2)).toFixed(2) + 'MB',
    'type:',
    file.type,
    'lastModified:',
    new Date(file.lastModified).toLocaleString()
  );
  return URL.createObjectURL(file);
};

// ------

// FORMAT DATE TIME
export const formatDateTime = (
  dateString: Date | string,
  timeZone: string = Intl.DateTimeFormat().resolvedOptions().timeZone
) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    // weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: 'short', // abbreviated month name (e.g., 'Oct')
    day: 'numeric', // numeric day of the month (e.g., '25')
    year: 'numeric', // numeric year (e.g., '2023')
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false),
    timeZone: timeZone, // use the provided timezone
  };

  const dateDayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'short', // abbreviated weekday name (e.g., 'Mon')
    year: 'numeric', // numeric year (e.g., '2023')
    month: '2-digit', // abbreviated month name (e.g., 'Oct')
    day: '2-digit', // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'short', // abbreviated month name (e.g., 'Oct')
    year: 'numeric', // numeric year (e.g., '2023')
    day: 'numeric', // numeric day of the month (e.g., '25')
    timeZone: timeZone, // use the provided timezone
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric', // numeric hour (e.g., '8')
    minute: 'numeric', // numeric minute (e.g., '30')
    hour12: true, // use 12-hour clock (true) or 24-hour clock (false)
    timeZone: timeZone, // use the provided timezone
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    'en-US',
    dateTimeOptions
  );

  const formattedDateDay: string = new Date(dateString).toLocaleString(
    'en-US',
    dateDayOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    'en-US',
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    'en-US',
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateDay: formattedDateDay,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};
//---------------
export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

//------------------------
// Función para verificar la disponibilidad de localStorage
export const isLocalStorageAvailable = () => {
  try {
    return typeof window !== 'undefined' && window.localStorage;
  } catch (err) {
    console.error('Error checking localStorage availability:', err);
    return false;
  }
};

// Función para obtener la clave cifrada desde localStorage
export const getEncryptedKey = () => {
  if (isLocalStorageAvailable()) {
    return window.localStorage.getItem('accessKey');
  }
  console.warn('localStorage is not available');
  return null;
};

//------------------------