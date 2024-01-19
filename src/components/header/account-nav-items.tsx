import { NavbarItem, NavbarMenuItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarItemProps {
  closeMenu?: () => void;
  format: "desktop" | "mobile";
}

export default function AccountNavItems({closeMenu, format}: NavbarItemProps) {
  const session = useSession();
  const pathname = usePathname();

  if (session.data?.user && format === "desktop") {
    return (
      <>
        <NavbarItem isActive={pathname === "/mon-profil"}>
          <Link href="/mon-profil">
            Mon profil
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/messages"}>
          <Link href="/messages">
            Mes messages
          </Link>
        </NavbarItem>   
      </>
    )
  } else if (session.data?.user && format === "mobile") {
    return (
      <>
        <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/mon-profil"}>
          <Link href="/mon-profil">Mon profil</Link>
        </NavbarMenuItem>   
        <NavbarMenuItem onClick={closeMenu} isActive={pathname === "/messages"}>
          <Link href="/messages">Mes messages</Link>
        </NavbarMenuItem> 
      </>
    )
  } else {
    return null;
  }
}