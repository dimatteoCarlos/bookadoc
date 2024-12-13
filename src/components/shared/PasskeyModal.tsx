'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp';

import {
  decryptKey,
  encryptKey,
  isLocalStorageAvailable,
  getEncryptedKey,
} from '@/lib/utils';

//----------------------------------------
export const PasskeyModal = () => {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [encryptedKey, setEncryptedKey] = useState<string | null>(null);

  // Verifica al inicio, si la clave cifrada está disponible y es válida, y la asigna al estado
  useEffect(() => {
    const key = getEncryptedKey();
    if (key) {
      setEncryptedKey(key);
    } else {
      setOpen(true); // Si no existe un accessKey, solicita el passkey y Muestra el modal
    }
  }, []);

  // Este useEffect se ejecuta cuando se actualiza `encryptedKey` o path
  useEffect(() => {
    if (!encryptedKey) return;

    try {
      const accessKey = decryptKey(encryptedKey);
      // console.log('Decrypted accessKey:', accessKey);

      if (accessKey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY?.toString()) {
        setOpen(false);
        setSuccessMsg('passkey accepted access granted'); //mejorar con un success message
        console.log('passkey accepted and access granted');
        router.replace('/admin'); // Redirigir si la clave es correcta
      } else {
        setOpen(true); // Mostrar el modal si la clave es incorrecta
        setError('passkey is invalid');
      }
    } catch (err) {
      console.error('Error during decryption:', err);
      setError('Failed to decrypt the key. Please try again.');
      setOpen(true); // Si hay un error en la desencriptación, mostrar el modal
      if (isLocalStorageAvailable()) {
        localStorage.removeItem('accessKey'); // Eliminar clave incorrecta
      }
    }
  }, [encryptedKey, path]);

  //-------------
  const closeModal = () => {
    setOpen(false);
    router.replace('/'); // Redirigir al inicio cuando se cierra el modal
  };
  //-------------
  const validatePasskey = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    if (!passkey) {
      setError('Please enter the passkey.');
      return;
    }

    try {
      if (passkey === process.env.NEXT_PUBLIC_ADMIN_PASSKEY) {
        const encryptedKey = encryptKey(passkey);

        if (isLocalStorageAvailable()) {
          window.localStorage.setItem('accessKey', encryptedKey);
        } else {
          throw new Error('localStorage is not available');
        }

        setOpen(false); // Cerrar el modal si el passkey es válido

        router.replace('/admin');
      } else {
        setError('Invalid passkey. Please try again.');
      }
    } catch (err) {
      console.error('Error during passkey validation:', err);
      setError(
        'An error occurred while validating the passkey. Please try again.'
      );
    }
  };

  //---------------------

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className='shad-alert-dialog'>
        <AlertDialogHeader>
          <AlertDialogTitle className='flex items-start justify-between'>
            Admin Access Verification
            <Image
              src='/assets/icons/close.svg'
              alt='close'
              width={20}
              height={20}
              onClick={closeModal}
              className='cursor-pointer'
            />
          </AlertDialogTitle>
          <AlertDialogDescription>
            To access the admin page, please enter the passkey.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div>
          <InputOTP
            maxLength={6}
            value={passkey}
            onChange={(value) => setPasskey(value)}
          >
            <InputOTPGroup className='shad-otp'>
              <InputOTPSlot className='shad-otp-slot' index={0} />
              <InputOTPSlot className='shad-otp-slot' index={1} />
              <InputOTPSlot className='shad-otp-slot' index={2} />
              <InputOTPSlot className='shad-otp-slot' index={3} />
              <InputOTPSlot className='shad-otp-slot' index={4} />
              <InputOTPSlot className='shad-otp-slot' index={5} />
            </InputOTPGroup>
          </InputOTP>

          {error && (
            <p className='shad-error text-14-regular mt-4 flex justify-center'>
              {error}
            </p>
          )}
          {successMsg && (
            <p className='shad-success text-14-regular mt-4 flex justify-center'>
              {successMsg}
            </p>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogAction
            onClick={validatePasskey}
            className='shad-primary-btn w-full'
          >
            Enter Admin Passkey
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
