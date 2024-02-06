import { db } from '@/db';
import { notFound } from 'next/navigation';
import PostImage from './post-image';

interface PostShowProps {
  postId: string;
}

const mockImagesList: string[] = [
  'https://picsum.photos/1500/1100',
  'https://picsum.photos/940/620',
  'https://picsum.photos/341/621',
  'https://picsum.photos/342/623',
  'https://picsum.photos/643/925',
];

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
      <div className="p-4 border flex flex-col gap-4
        border-slate-400 rounded bg-black bg-opacity-70 backdrop-blur-sm">
        <p>{post.content}</p>
        {mockImagesList.length > 0 ? 
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {mockImagesList.map((src, i) => (
          <PostImage key={i} imageUrl={src} alt={`${post.title} related images`}
        />
        ))}
      </div> : null}
      </div>
    </div>
  );
}
