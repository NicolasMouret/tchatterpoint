import { db } from '@/db';
import type { Post } from '@prisma/client';

export type PostWithData = 
  Post & {
    topic: { slug: string };
    user: { name: string | null };
    _count: { comments: number }; 
  }


export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    }
  })
}

export function fetchTopPosts(): Promise<PostWithData[]> {
  return db.post.findMany({
    orderBy: [{
      comments: {
        _count: 'desc'
      }
    }],
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  })
}

export function fetchPostsBySearchTerms(searchTerm: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: {
      OR: [
        { title: { contains: searchTerm } },
        { content: { contains: searchTerm } },
      ]
    },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true, image: true } },
      _count: { select: { comments: true } },
    }
  })
}