import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentList from "@/components/comments/comment-list";
import PostShow from "@/components/posts/post-show";
import PostShowLoading from "@/components/posts/post-show-loading";
import paths from "@/paths";
import Link from "next/link";
import { Suspense } from "react";

interface PostShowPageProps {
  params: {
    slug: string;
    postId: string;
  };
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = params;

  return (
    <div className="flex-1 space-y-3 w-[90vw] sm:max-w-5xl z-10">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {"< "}Retour vers {decodeURIComponent(slug)}
      </Link>
      <Suspense fallback={<PostShowLoading />}>
        <PostShow postId={postId} />
      </Suspense>
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId}/>
    </div>
  );
}
