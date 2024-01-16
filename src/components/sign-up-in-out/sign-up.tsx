'use client';

import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input
} from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { FaUserAlt } from "react-icons/fa";
import { FcGoogle } from 'react-icons/fc';
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";


export default function SignUpForm() {
  const [formState, action] = useFormState(actions.signUp, {
    errors: {}
  });
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Card isBlurred className="w-full border-1 border-slate-400">
      <CardHeader className="text-xl flex justify-center font-bold">Inscription</CardHeader>
      <Divider/>
        <button 
          onClick={() => signIn("google", {callbackUrl: "/mon-profil", redirect: true})}
          className="flex items-center justify-center gap-4 rounded-md border-3 bg-slate-50 my-4 p-4 
          font-medium text-slate-900 w-[95%] sm:w-2/3 self-center border-slate-400
         hover:border-slate-50 hover:bg-slate-100">
            <FcGoogle className="text-2xl"/> Se connecter avec Google
        </button>
      <Divider/>
      <CardBody>
        <form action={action} autoComplete="off">
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-2 sm:px-12 w-[90vw] sm:w-[550px]">
            <Input
              autoComplete='new-password'
              classNames={{inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm",
              label: "p-0.5"}}
              variant="bordered"
              size="lg"
              name="name" 
              label="Pseudo" 
              startContent={
                <FaUserAlt className="text-gray-400 mr-2"/>
              }
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}/>
            <Input
              autoComplete='new-password'
              classNames={{inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm",
              label: "p-0.5"}}
              name="email" 
              label="Email" 
              variant="bordered"
              size="lg"
              startContent={
                <MdAlternateEmail className="text-gray-400 text-xl mr-2"/>
              } 
              isInvalid={!!formState.errors.email}
              errorMessage={formState.errors.email?.join(', ')}/> 
            <Input
              classNames={{input: `placeholder:font-normal ${isVisible ? "font-normal" : "font-extrabold"}`,
              inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm",
              label: "p-0.5"}}
              name="password"
              label="Mot de passe" 
              variant="bordered"
              size="lg"
              startContent={
                <RiLockPasswordFill className="text-gray-400 mr-2"/>
              }  
              endContent={
                <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                  {isVisible ? <HiEyeSlash className="text-gray-400"/> : <HiEye className="text-gray-400"/>}
                </button>
              }
              type={isVisible ? "text" : "password"}
              isInvalid={!!formState.errors.password}
              errorMessage={formState.errors.password?.join(', ')}
            />
            <Input
              autoComplete='off'
              classNames={{input: `placeholder:font-normal ${isVisible ? "font-normal" : "font-extrabold"}`,
              inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm",
              label: "p-0.5"}}
              name="confirmPassword"
              label="Confirmer le mot de passe" 
              variant="bordered"
              size="lg"
              startContent={
                <RiLockPasswordFill className="text-gray-400 mr-2"/>
              }  
              endContent={
                <button type="button" onClick={toggleVisibility} className="focus:outline-none">
                  {isVisible ? <HiEyeSlash className="text-gray-400"/> : <HiEye className="text-gray-400"/>}
                </button>
              }
              type={isVisible ? "text" : "password"}
              isInvalid={!!formState.errors.confirmPassword}
              errorMessage={formState.errors.confirmPassword?.join(', ')}
            />
            <Divider/>
            {formState.errors._form ? 
            <div className="p-2 bg-red-600 border border-red-500 rounded">{formState.errors._form?.join(', ')}</div> :
            null}
            <FormButton 
              className="sm:my-1 w-1/2 font-medium text-base" 
              color="primary"
              variant="shadow"
              >S&apos;inscrire</FormButton>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}