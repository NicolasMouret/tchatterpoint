import PostCreateform from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import { fetchTopicBySlug } from "@/db/queries/topics";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const slug = decodeURIComponent(params.slug);
  const topic = await fetchTopicBySlug(slug);

  if (!topic) {
    notFound();
  }
  

  return (
    <main className="flex flex-1 flex-col items gap-4 px-4 w-screen sm:w-3/5 relative z-10">
      <Link className="underline decoration-solid font-semibold hover:text-yellow-400" href="/cantina">
        {"< "}Retour à la Cantina
      </Link>
      <div className="backdrop-blur-lg rounded-lg bg-black bg-opacity-70
      border-1 border-slate-400 pl-4 py-2 mb-4">
        <h1 className="text-2xl font-bold mb-2 font-swFont">{topic.slug}</h1>
        <p className="font-medium">{topic.description}</p>
      </div>
      <div className="flex flex-col mt-2">
        <PostCreateform slug={topic.slug}/>
      </div>      
      <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
    </main>
  )
}