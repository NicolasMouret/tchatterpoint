import { db } from '@/db';
import { notFound } from 'next/navigation';

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: { id: postId },
  });

  if (!post) {
    return notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold my-2 font-swFont
      rounded bg-black bg-opacity-70 backdrop-blur-sm w-fit p-2">{post.title}</h1>
      <p className="p-4 border border-slate-400 rounded bg-black bg-opacity-70 backdrop-blur-sm">{post.content}</p>
    </div>
  );
}
