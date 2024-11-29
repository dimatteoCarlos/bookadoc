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
