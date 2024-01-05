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
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { FaUserAlt } from "react-icons/fa";
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
      <CardHeader className="text-xl flex justify-center">Inscription</CardHeader>
      <Divider/>
      <CardBody>
        <form action={action}>
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-2 sm:px-12 w-[90vw] sm:w-[550px]">
            <Input
              classNames={{inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm"}}
              variant="bordered"
              size="lg"
              name="name" 
              placeholder="Pseudo" 
              startContent={
                <FaUserAlt className="text-gray-400 mr-2"/>
              }
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}/>
            <Input
              classNames={{inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm"}}
              name="email" 
              placeholder="Email" 
              variant="bordered"
              size="lg"
              startContent={
                <MdAlternateEmail className="text-gray-400 text-xl mr-2"/>
              } 
              isInvalid={!!formState.errors.email}
              errorMessage={formState.errors.email?.join(', ')}/> 
            <Input
              classNames={{input: `placeholder:font-normal ${isVisible ? "font-normal" : "font-extrabold"}`,
              inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm"}}
              name="password"
              placeholder="Mot de passe" 
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
              classNames={{input: `placeholder:font-normal ${isVisible ? "font-normal" : "font-extrabold"}`,
              inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm"}}
              name="confirmPassword"
              placeholder="Confirmer le mot de passe" 
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
            {formState.errors._form ? 
            <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> :
            null}
            <FormButton className="sm:mt-4 w-1/2" color="primary">S&apos;inscrire</FormButton>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}