'use client';

import * as actions from '@/actions';
import {
  Avatar,
  Button,
  Link,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react';
import { signIn, useSession } from 'next-auth/react';
import { FaSignInAlt } from 'react-icons/fa';

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={session.data.user.image!} />             
      </PopoverTrigger>
      <PopoverContent>
        <div className="p-4">
          <form action={actions.signOut}>
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>);
  } else {
    authContent = (<>

    {/* ON DESKTOP */}
      <div className="hidden sm:flex gap-2">
        <NavbarItem>          
          <Button 
            className="border-yellow-400 text-yellow-400 font-bold" 
            type="button" 
            variant="ghost" 
            onClick={() => signIn()}>
            Se Connecter
          </Button>          
        </NavbarItem>
        <NavbarItem>
          <Link href="/sign-up">
            <Button className="font-bold"  type="button" variant="ghost" color="primary">
              S&apos;inscrire
            </Button>                   
          </Link>
        </NavbarItem>
      </div>

    {/* ON MOBILE */}
      <Popover placement="bottom">
        <PopoverTrigger>           
          <Button 
            className="border-yellow-400 text-yellow-400 font-bold sm:hidden"
            variant="ghost"
            type="button"
            size="sm">
          <FaSignInAlt className="text-base" /> Connexion
          </Button>      
        </PopoverTrigger>
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