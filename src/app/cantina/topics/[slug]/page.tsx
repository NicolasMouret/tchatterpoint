import PostCreateform from "@/components/posts/post-create-form";
import PostList from "@/components/posts/post-list";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";
import Link from "next/link";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
}

export default function TopicShowPage({ params }: TopicShowPageProps) {
  const slug = decodeURIComponent(params.slug);
  return (
    <main className="flex flex-1 flex-col items gap-4 px-4 w-screen sm:w-3/5 relative z-10">
      <Link className="underline decoration-solid font-semibold hover:text-yellow-400" href="/cantina">
        {"< "}Retour à la Cantina
      </Link>
      <div className="flex flex-col mt-2">
        <PostCreateform slug={slug}/>
      </div>
      <section>
        <h1 className="text-2xl font-bold mb-2 font-swFont">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </section>
    </main>
  )
}