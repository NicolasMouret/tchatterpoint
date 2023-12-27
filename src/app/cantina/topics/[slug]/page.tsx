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
    <div className="flex flex-col items gap-4 px-4 w-screen sm:w-3/5">
      <Link className="underline decoration-solid" href="/cantina">
        {"< "}Back to Cantina
      </Link>
      <div className="flex flex-col mt-2">
        <PostCreateform slug={slug}/>
      </div>
      <div className="">
        <h1 className="text-2xl font-bold mb-2">{slug}</h1>
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>
    </div>
  )
}