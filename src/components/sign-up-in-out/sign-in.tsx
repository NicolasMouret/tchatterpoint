'use client';

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
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {    
      const res = await signIn("credentials", {
        callbackUrl: "/mon-profil",
        redirect: true,
        email,
        password
      });

    } catch (error) {
      if(error instanceof Error) {
        setError(error.message);
      } else {
        setError("Une erreur inconnue est survenue");
      }      
    }
  }

  return (
    <Card isBlurred className="w-full border-1 border-slate-400">
      <CardHeader className="text-xl flex justify-center font-bold">Connexion</CardHeader>
      <Divider/>
        <button 
          onClick={() => signIn("google", {callbackUrl: "/mon-profil", redirect: true})}
          className="flex items-center justify-center gap-4 rounded-md border-3 bg-slate-50 my-4 p-4 
          font-medium text-slate-900 w-[95%] sm:w-2/3 self-center border-slate-400
         hover:border-slate-50 hover:bg-slate-100">
            <FcGoogle className="text-2xl"/> Se connecter avec Google
        </button>
      <Divider/>
      <h1 className="self-center font-bold text-lg mt-3">Connexion avec identifiants</h1>
      <CardBody>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col items-center gap-4 sm:gap-6 p-2 sm:px-12 w-[90vw] sm:w-[550px]">
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
            <Input
              classNames={{input: `placeholder:font-normal ${isVisible ? "font-normal" : "font-extrabold"}`,
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
            <Divider/>
            {error ? 
            <div className="p-2 bg-red-200 border border-red-400 rounded">{error}</div> :
            null}
            <FormButton 
              className="sm:my-1 w-1/2 font-medium text-base" 
              color="primary"
              variant="shadow"
              >Se connecter</FormButton>
          </div>
        </form>
      </CardBody>
    </Card>
  )
}