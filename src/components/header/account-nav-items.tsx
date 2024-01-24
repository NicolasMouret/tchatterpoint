import { supabase } from "@/db";
import { Badge, NavbarItem, NavbarMenuItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

interface NavbarItemProps {
  closeMenu?: () => void;
  format: "desktop" | "mobile";
}

export default function AccountNavItems({closeMenu, format}: NavbarItemProps) {
  const session = useSession();
  const pathname = usePathname();
  const intialTotalUnread = session.data?.user?.unreadMessages?.reduce(
    (acc, curr) => acc + curr.count, 0);
  const [totalUnread, setTotalUnread] = useState(intialTotalUnread || 0);

  useEffect(() => {
    setTotalUnread(intialTotalUnread || 0);
    const userId = session.data?.user?.id;
    const channel = supabase.channel("unread_messages");
    channel
      .on(
        "postgres_changes", 
        { 
          event: "UPDATE", 
          schema: "public", 
          table: "UserUnreadMessages",
        },
        payload => {
          if (payload.new.userId === userId) {
            setTotalUnread(payload.new.count);
          }
        })
      .subscribe();
  }, [session.data?.user?.id, intialTotalUnread])

  if (session.data?.user && format === "desktop") {
    return (
      <>
        <NavbarItem isActive={pathname === "/mon-profil"}>
          <Link href="/mon-profil">
            Mon profil
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/messages"}>
          <Badge color="warning" variant="shadow" content={totalUnread} placement="bottom-right">
            <Link className={`${totalUnread ? "mr-3" : ""}`} href="/messages">
              Mes messages
            </Link>
          </Badge>
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
        <Badge color="warning" variant="shadow" isInvisible={totalUnread === 0} content={totalUnread}>
          <Link className="pr-3" href="/messages">Mes messages</Link>
        </Badge>
        </NavbarMenuItem> 
      </>
    )
  } else {
    return null;
  }
}