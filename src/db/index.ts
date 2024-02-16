import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';

// BEST PRACTICE: Create a singleton to avoid creating multiple instances of PrismaClient in our application
// SEE: https://www.prisma.io/docs/orm/more/help-and-troubleshooting/help-articles/nextjs-prisma-client-dev-practices
const prismaClientSingleton = () => {
  return new PrismaClient()
}
declare global {
  var db: undefined | ReturnType<typeof prismaClientSingleton>
}
export const db = globalThis.db ?? prismaClientSingleton()
if (process.env.NODE_ENV !== 'production') globalThis.db = db


// SUPABASE CLIENT FOR OCCASIONAL USE
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)