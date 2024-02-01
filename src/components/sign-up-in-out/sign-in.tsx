'use client';

import paths from '@/paths';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Divider,
  Input,
  Link
} from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { BiErrorAlt } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { MdAlternateEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

const PATH_ON_SIGNIN = paths.privateProfile();

export default function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(searchParams.get("error") || null)
  const [isLoading, setIsLoading] = useState(false);

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {    
      setIsLoading(true);
      await signIn("credentials", {
        redirect: true,
        callbackUrl: PATH_ON_SIGNIN,
        email,
        password
      });
    } catch (error) {
      setIsLoading(false);     
    }
  }

  return (
    <Card isBlurred className="w-full border-1 border-slate-400">
      <CardHeader className="text-3xl flex justify-center font-bold font-swFont text-yellow-400">Connexion</CardHeader>
      <h2 className="self-center font-bold text-lg mt-3">Pas encore de compte ?</h2>
      <Divider/>
      <div className="flex flex-col items-center mb-3">
        <button 
          onClick={() => signIn("google", {callbackUrl: PATH_ON_SIGNIN, redirect: true})}
          className="flex items-center justify-center gap-4 rounded-md border-3 bg-slate-50 my-4 p-4 
          font-medium text-slate-900 w-[95%] sm:w-2/3 self-center border-slate-50
          hover:border-slate-400 hover:bg-slate-100">
            <FcGoogle className="text-2xl"/> Se connecter avec Google
        </button>
        <Link 
          className="sm:my-1 w-2/3"
          href="/sign-up" >
        <Button 
          type="button"
          className="w-full font-semibold text-base" 
          color="warning"
          variant="shadow"
          isLoading={isLoading}
          > Inscription
        </Button>
        </Link>
      </div>
      <Divider/>
      <h2 className="self-center font-bold text-lg mt-3">Se connecter avec identifiants</h2>
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
            <Divider/>               
              {error ? 
                <Chip 
                  startContent={<BiErrorAlt className="text-lg mr-1"/>}
                  color="danger"
                  variant="flat">
                    Email ou mot de passe incorrect
                </Chip> : null}
            <Button 
              type="submit"
              className="sm:my-1 w-1/2 font-medium text-base" 
              color="primary"
              variant="shadow"
              isLoading={isLoading}
              >Se connecter</Button>
          </div>
        </form>
      </CardBody>
      <CardFooter className="flex justify-center">
        <Link href="/forgot-password" className="text-yellow-400 hover:underline">
          Mot de passe oublié ?
        </Link>
      </CardFooter>
    </Card>
  )
}