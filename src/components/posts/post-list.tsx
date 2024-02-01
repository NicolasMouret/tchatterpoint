import type { PostWithData } from '@/db/queries/posts';
import paths from '@/paths';
import Link from 'next/link';

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
}

export default async function PostList({ fetchData }: PostListProps) {
  const posts = await fetchData();
  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Sujet introuvable');
    }

    return (
      <article key={post.id} 
        className="group border border-slate-400 rounded p-2 bg-black bg-opacity-60 backdrop-blur-sm
        hover:border-slate-200 hover:bg-opacity-70">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold group-hover:text-yellow-400">{post.title}</h3>
          <div className="flex flex-row gap-8">
            <p className="text-xs text-gray-300">Par {post.user.name}</p>
            <p className="text-xs text-gray-300">
              {post._count.comments} commentaires
            </p>
          </div>
        </Link>
      </article>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
