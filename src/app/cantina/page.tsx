import PostList from "@/components/posts/post-list";
import TopicCreateForm from "@/components/topics/topic-create-form";
import TopicList from "@/components/topics/topic-list";
import { fetchTopPosts } from "@/db/queries/posts";
import { Divider } from "@nextui-org/react";


export default function CantinaPage() {
  return (
    <div className="flex flex-col sm:w-3/5 gap-4 p-4">
      <div className="flex flex-col border shadow py-3 px-2 ">
        <TopicCreateForm />
        <Divider className="my-2"/>
        <h3 className="text-lg mb-2">Topics</h3>
        <TopicList />
      </div>
      <div className="">
        <h1 className="text-xl m-2">Top posts</h1>
        <PostList fetchData={fetchTopPosts} />
      </div>
    </div>
  )
}
