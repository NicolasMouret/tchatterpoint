'use client';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { MdAlternateEmail } from "react-icons/md";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
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
        <form>
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