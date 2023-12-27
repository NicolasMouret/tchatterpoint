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
    className="mb-6 border-b"
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
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem isActive={pathname === "/map"}>
          <Link color="foreground" href="/map">
            Carte des joueurs
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/cantina"}>
          <Link href="/cantina">
            Cantina
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <HeaderAuth />        
      </NavbarContent>

      <NavbarMenu>
      {/* close menu when clicking a link */}
      <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/map"}>
        <Link href="/map">Cartes de joueurs</Link>
      </NavbarMenuItem>
      <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/cantina"}>
        <Link href="/cantina">Cantina</Link>
      </NavbarMenuItem>
    </NavbarMenu>

    </Navbar>
  )
}