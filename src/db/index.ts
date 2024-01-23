import { PrismaClient } from '@prisma/client';
import { createClient } from '@supabase/supabase-js';



export const db = new PrismaClient();
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)