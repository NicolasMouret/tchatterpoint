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
    className="mb-6 border-b border-slate-500 sm:border sm:border-t-0 sm:rounded-b-md font-swFont"
    classNames={{item: ["data-[active=true]:text-yellow-400",
      "data-[active=true]:border-b-1", "data-[active=true]:border-yellow-400", "hover:border-b-1"]}}
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link href="/" className={`font-bold text-xl
          ${pathname === "/" ? "text-yellow-400" : "text-slate-50" }`}>Tchatterpoint</Link>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden font-medium sm:flex gap-4" justify="start">
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
      <NavbarContent justify="end">
        <HeaderAuth />        
      </NavbarContent>

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