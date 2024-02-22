'use client';

import * as actions from '@/actions';
import { supabase } from '@/db';
import {
  Avatar,
  Button,
  Link,
  NavbarContent,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { FaUserLarge } from "react-icons/fa6";

export default function HeaderAuth() {
  const session = useSession();
  const [avatar, setAvatar] = useState<string>();

  // WORKAROUND THE AUTHJS SESSION UPDATE NOT TRIGGERING
  // GET USER IMAGE FROM DB DIRECTLY
  useEffect(() => {
    if (session.data?.user) {
      supabase
      .from('User')
      .select('image')
      .eq('id', session.data?.user?.id)
      .then(({ data }) => {
        if (data) setAvatar(data[0].image);
      })
    }
  })
  // REALTIME LISTENING TO UPDATES OF USER IMAGE
  useEffect(() => {
    const channel = supabase.channel(`confirmEditAvatar-${session.data?.user?.id}`);
    channel.on(
      "broadcast",
      { event: "confirmEditAvatar" },
      (payload) => {
        setAvatar(payload.payload.newAvatar);
      }
    ).subscribe();
  })

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
    <Popover placement="left">
      <NavbarContent 
        justify="center"
        className="max-w-20" >
        <li>
          <PopoverTrigger>
            <button role="button">
              <Avatar className="cursor-pointer hover:scale-105" src={avatar || "/default-avatar.webp"} /> 
            </button>            
          </PopoverTrigger>
        </li>
      </NavbarContent>
      <PopoverContent className="backdrop-blur-md bg-slate-950 bg-opacity-50 border-1 
      border-slate-500">
        <div className="flex flex-col items-center gap-2 p-2">
          <Link className="w-full" href="/mon-profil">
            <Button 
              className="w-full font-medium" 
              color="primary"
              >Mon profil</Button>
          </Link>
          <form action={actions.signOut}>
            <Button 
              className="font-medium" 
              type="submit"
              variant="ghost"
              color="warning">Déconnexion</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>);
  } else {
    authContent = (<>

    {/* ON DESKTOP */}
      <NavbarContent justify="center" className="hidden sm:flex gap-2 font-stdFont">          
        <li>
          <Button 
            className="border-yellow-400 text-yellow-400 font-bold" 
            type="button" 
            variant="ghost" 
            onClick={() => signIn()}>
            Se Connecter
          </Button>   
        </li>         
        <li>
          <Link href="/sign-up">
            <Button className="font-bold"  type="button" variant="solid" color="primary">
              S&apos;inscrire
            </Button>                   
          </Link>
        </li>
      </NavbarContent>

    {/* ON MOBILE */}
      <Popover placement="bottom">
        <NavbarContent justify="center" className="sm:hidden">
          <li>
            <PopoverTrigger>           
              <Button 
                aria-label='Connexion'
                className="font-bold font-stdFont"
                color="warning"
                variant="ghost"
                type="button"
                size="sm">
                <FaUserLarge className="text-xl"/>
              </Button>      
            </PopoverTrigger>
          </li>
        </NavbarContent>
        <PopoverContent className="backdrop-blur-md bg-slate-950 bg-opacity-50
          border-1 border-slate-500">
          <div className="flex flex-col justify-center items-center gap-3 p-3">
            <Button 
              className="font-medium" 
              type="button"
              variant="shadow"
              color="primary"
              onClick={() => signIn()}>
              Se Connecter
            </Button> 
            <Link href="/sign-up">
              <Button 
                className="font-medium bg-yellow-400 text-slate-900" 
                type="button"
                variant="shadow"
                color="warning">
                S&apos;enregistrer
              </Button>                   
            </Link>
          </div>
        </PopoverContent>
      </Popover>
      
    </>);
  }

  return authContent;
}