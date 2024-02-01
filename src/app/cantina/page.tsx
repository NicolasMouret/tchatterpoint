import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { Divider } from "@nextui-org/react";

export const dynamic = 'force-dynamic';

export default function CantinaPage() {
  return (
    <div className="flex flex-1 flex-col sm:w-3/5 gap-4 p-4 relative">
      <div className="flex flex-col border border-slate-400 rounded-lg shadow py-3 px-2 
      bg-black bg-opacity-60 backdrop-blur-sm">
        <TopicCreateForm />
        <Divider className="my-2"/>
        <h3 className="text-lg font-medium mb-2">Sujets</h3>
        <TopicList />
      </div>
      <div className="">
        <h1 className="text-xl font-medium m-2">Top posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
    </div>
  )
}
