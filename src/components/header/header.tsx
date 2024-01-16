'use client';

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from '@nextui-org/react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { useState } from 'react';
import HeaderAuth from './header-auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const pathname = usePathname();

  return (
    <Navbar 
    onMenuOpenChange={setIsMenuOpen} 
    isMenuOpen={isMenuOpen}
    className="mb-3 border-b border-slate-500 sm:border sm:border-t-0 sm:rounded-b-md"
    classNames={{item: ["data-[active=true]:text-yellow-400",
      "data-[active=true]:border-b-1", "data-[active=true]:border-yellow-400"]}}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className="font-bold text-xl">Tchatterpoint</Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden font-medium sm:flex gap-4" justify="start">
        <NavbarItem 
          isActive={pathname === "/carte-des-joueurs"}>
          <Link className="hover:border-b-1" color="foreground" href="/carte-des-joueurs">
            Carte des joueurs
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/cantina"}>
          <Link className="hover:border-b-1" href="/cantina">
            Cantina
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/mon-profil"}>
          <Link className="hover:border-b-1" color="foreground" href="/mon-profil">
            Mon profil
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />        
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/carte-des-joueurs"}>
          <Link href="/carte-des-joueurs">Carte des joueurs</Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/cantina"}>
          <Link href="/cantina">Cantina</Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/mon-profil"}>
          <Link href="/mon-profil">Mon profil</Link>
        </NavbarMenuItem>
      </NavbarMenu>

    </Navbar>
  )
}