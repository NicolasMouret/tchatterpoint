'use client';

import * as actions from '@/actions';
import {
  Avatar,
  Button,
  NavbarItem,
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@nextui-org/react';
import { useSession } from 'next-auth/react';
import { FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";

export default function HeaderAuth() {
  const session = useSession();

  let authContent: React.ReactNode;
  if (session.status === 'loading') {
    authContent = null;
  } else if (session.data?.user) {
    authContent = (
    <Popover placement="left">
      <PopoverTrigger>
        <Avatar src={session.data.user.image || ""} />       
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
          <form action={actions.signInGoogle}>
            <Button type="submit" variant="bordered" color="secondary">Sign in with Google</Button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signInGithub}>
            <Button type="submit" variant="flat" color="primary">Sign in with github</Button>
          </form>
        </NavbarItem>
      </div>
    {/* ON MOBILE */}
      <div className="flex sm:hidden gap-4">
        <NavbarItem>
          <form action={actions.signInGoogle}>
            <button type="submit"><FcGoogle className="text-2xl"/></button>
          </form>
        </NavbarItem>
        <NavbarItem>
          <form action={actions.signInGithub}>
            <button type="submit"><FaGithub className="text-2xl"/></button>
          </form>
        </NavbarItem>
      </div>
    </>);
  }

  return authContent;
}