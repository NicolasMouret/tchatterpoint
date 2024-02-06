import { db } from '@/db';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface PostShowProps {
  postId: string;
}

const mockImagesList: string[] = [
  'https://picsum.photos/500/800',
  'https://picsum.photos/400/600',
  'https://picsum.photos/300/400',
  'https://picsum.photos/200/300',
  'https://picsum.photos/100/200',
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
          <Image
          key={i}
          src={src}
          alt={`${post.title} images`}
          height={200}
          width={200} 
          style={{
            height: 200,
            width: 200,
            objectFit: 'cover',
          }}
        />
        ))}
      </div> : null}
      </div>
    </div>
  );
}
