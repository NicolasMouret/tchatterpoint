import { DefaultSession } from "next-auth"

type UnreadMessages = {
  chatId: string
  count: number
}
 
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      role: string | undefined | null
      latitude: number | undefined | null
      longitude: number | undefined | null
      unreadMessages: UnreadMessages[]
    } & DefaultSession["user"]
  }
}