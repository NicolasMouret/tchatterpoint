import { db } from '@/db';
import type { Topic } from '@prisma/client';



export function fetchTopicBySlug(slug: string): Promise<Topic | null> {
  return db.topic.findUnique({
    where: { slug },
  });
}
