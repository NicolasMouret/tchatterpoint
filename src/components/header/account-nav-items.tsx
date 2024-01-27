import { Badge, NavbarItem, NavbarMenuItem } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

interface NavbarItemProps {
  closeMenu?: () => void;
  format: "desktop" | "mobile";
}

export default function AccountNavItems({closeMenu, format}: NavbarItemProps) {
  const session = useSession();
  const pathname = usePathname();
  const [pageChatId, setPageChatId] = useState<string | null>(null);
  const [hasUnread, setHasUnread] = useState(false);

  // useEffect(() => {
  //   if (!session.data?.user) return;
  //   const initialTotalUnread = session.data.user.unreadMessages?.reduce(
  //     (acc, curr) => acc + curr.count, 0);
  //   if (initialTotalUnread && initialTotalUnread > 0) {
  //     setHasUnread(true);
  //   }
  //   if (isChat(pathname)) {
  //     setPageChatId(pathname.split("/")[3]);
  //   }
  //   else {
  //     setPageChatId(null);
  //   }
  //   const userId = session.data?.user?.id;
  //   const channel = supabase.channel("unread_messages");
  //   channel
  //     .on(
  //       "postgres_changes", 
  //       { 
  //         event: "UPDATE", 
  //         schema: "public", 
  //         table: "UserUnreadMessages",
  //       },
  //       payload => {
  //         if (payload.new.userId === userId 
  //           && payload.new.chatId !== pageChatId) {
  //           setHasUnread(true);
  //         }
  //       })
  //     .subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   }
  // }, [session.data, pathname, pageChatId])

  if (session.data?.user && format === "desktop") {
    return (
      <>
        <NavbarItem isActive={pathname === "/mon-profil"}>
          <Link href="/mon-profil">
            Mon profil
          </Link>
        </NavbarItem>
        <NavbarItem isActive={pathname === "/messages/"}>
          <Badge color="warning" variant="shadow" isInvisible={!hasUnread} content={"new"} placement="bottom-right">
            <Link 
              className={`${hasUnread ? "mr-3" : ""}`} 
              href="/messages"
              prefetch={false}>
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
        <Badge color="warning" variant="shadow" isInvisible={!hasUnread} content={"new"}>
          <Link 
            className="pr-3" 
            href="/messages"
            prefetch={false}>Mes messages</Link>
        </Badge>
        </NavbarMenuItem> 
      </>
    )
  } else {
    return null;
  }
}