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
import AccountNavItems from './account-nav-items';
import HeaderAuth from './header-auth';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = () => setIsMenuOpen(false);
  const pathname = usePathname();

  return (
    <Navbar 
    onMenuOpenChange={setIsMenuOpen} 
    isMenuOpen={isMenuOpen}
    className="mb-2 sm:mb-6 border-b border-slate-500 font-swFont w-[100vw]"
    classNames={{item: ["data-[active=true]:text-yellow-400",
      "data-[active=true]:border-b-1", "data-[active=true]:border-yellow-400", "hover:border-b-1"]}}
    >
      <NavbarContent justify="center">
        <li className="h-12 w-full">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir menu"}
            className="lg:hidden"
          />
        </li>
        <li>
          <NavbarBrand>
          <Link 
            href="/" 
            className="font-bold text-xl text-slate-50"
            aria-label="Vers la page d'accueil">Tchatterpoint
          </Link>
        </NavbarBrand>
        </li>
      </NavbarContent>
      <NavbarContent className="hidden font-medium lg:flex gap-4" justify="center">
        <NavbarItem 
          isActive={pathname === "/carte-des-joueurs"}>
          <Link color="foreground" href="/carte-des-joueurs">
            Carte des joueurs
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname.includes("cantina")}>
          <Link href="/cantina">
            Cantina
          </Link>
        </NavbarItem>        
        <AccountNavItems format="desktop"/>
      </NavbarContent>      
      <HeaderAuth />        

      <NavbarMenu className="font-swFont">
        <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/carte-des-joueurs"}>
          <Link href="/carte-des-joueurs">Carte des joueurs</Link>
        </NavbarMenuItem>
        <NavbarMenuItem onClick={closeMenu} isActive={pathname.includes("cantina")}>
          <Link href="/cantina">Cantina</Link>
        </NavbarMenuItem>
        <AccountNavItems format="mobile" closeMenu={closeMenu}/>
      </NavbarMenu>

    </Navbar>
  )
}