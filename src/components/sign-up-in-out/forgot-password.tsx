'use client';

import * as actions from '@/actions';
import { Button, Card, CardBody, CardFooter, CardHeader, Chip, Divider, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { useFormState } from "react-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiConfirmed } from "react-icons/gi";
import { MdAlternateEmail } from "react-icons/md";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [formState, action] = useFormState(actions.sendResetPwMail, {
    successMessage: "",
    errors: {}
  });
  return (
    <Card isBlurred className="w-[95vw] sm:w-[550px] border-1 border-slate-400 text-wrap">
      <CardHeader className="flex flex-col">
        <h1 className="text-xl text-center font-bold">Réinitialiser le mot de passe</h1>
        <p className="text-center my-4">
          Entrez votre e-mail pour recevoir les instructions pour réinitialiser votre mot de passe
        </p>
      </CardHeader>
      <Divider/>
      <CardBody>
        <form action={action}>
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-2 sm:px-12">
            <Input
              classNames={{inputWrapper: "bg-slate-800 bg-opacity-50 backdrop-blur-sm",
              label: "p-0.5"}}
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email" 
              variant="bordered"
              size="lg"
              startContent={
                <MdAlternateEmail className="text-gray-400 text-xl mr-2"/>
              } 
              /> 
              {formState.successMessage && 
                <Chip 
                startContent={<GiConfirmed className="text-lg mr-1"/>}
                color="warning"
                variant="flat">
                Email envoyé.
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