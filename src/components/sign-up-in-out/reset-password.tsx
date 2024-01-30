'use client';

import * as actions from '@/actions';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiConfirmed } from 'react-icons/gi';
import { HiEye, HiEyeSlash } from 'react-icons/hi2';
import { RiLockPasswordFill } from "react-icons/ri";

interface ResetPasswordFormProps {
  token: string
}

export default function ResetPasswordForm({token}: ResetPasswordFormProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [formState, action] = useFormState(actions.resetPassword.bind(null, token), {
    successMessage: "",
    errors: {}
  });
  return (
    <Card isBlurred className="w-[95vw] sm:w-[550px] border-1 border-slate-400 text-wrap">
      <CardHeader className="flex flex-col">
        <h1 className="text-xl text-center font-bold">Nouveau mot de passe</h1>
        <p className="text-center my-4">
          Vous pouvez entrer votre nouveau mot de passe.
        </p>
        <p>(12 caractères minimum)</p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <form action={action}>
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-2 sm:px-12">
            <Input
              classNames={{input: `${isVisible ? "font-normal" : "font-extrabold"}`,
              inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm",
              label: "p-0.5"}}
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              /> 
            <Input
              classNames={{input: `${isVisible ? "font-normal" : "font-extrabold"}`,
              inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm",
              label: "p-0.5"}}
              name="confirmPassword" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
              />
              {formState.errors._form && 
                <Chip 
                  startContent={<GiConfirmed className="text-lg mr-1"/>}
                  color="danger"
                  variant="flat">
                  {formState.errors._form}
                </Chip>}
              {formState.successMessage &&
                <Chip 
                  startContent={<GiConfirmed className="text-lg mr-1"/>}
                  color="warning"
                  variant="flat">
                  Mot de passe réinitialisé
                </Chip>}  
            <Button 
              type="submit"
              className="sm:my-1 w-1/2 font-medium text-base" 
              color="primary"
              variant="shadow"
              >Réinitialiser</Button>
          </div>
        </form>
      </CardBody>
      <CardFooter>
        <Link href="/sign-in" className="text-yellow-400">
        <FaLongArrowAltLeft className="mr-2"/> Retour à la page connexion
        </Link>
      </CardFooter>
    </Card>
  )
}