import { db } from '@/db';
import { notFound } from 'next/navigation';
import PostImage from './post-image';

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
      rounded bg-black bg-opacity-70 backdrop-blur-sm w-fit px-3 pb-1">{post.title}</h1>
      <div className="p-4 border flex flex-col gap-4
        border-slate-400 rounded bg-black bg-opacity-70 backdrop-blur-sm">
        <p>{post.content}</p>
        {post.images.length > 0 ? 
        <div className="flex flex-wrap gap-4">
        {post.images.map((src, i) => (
          <PostImage key={i} imageUrl={src} alt={`${post.title} related images`}
        />
        ))}
      </div> : null}
      </div>
    </div>
  );
}
