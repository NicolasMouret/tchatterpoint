import { Skeleton } from '@nextui-org/react';


export default function PostListFallback() {
  const PostSkeleton = () => {
    return (
      <Skeleton 
        className="rounded">        
      </Skeleton>
    );
  };

  return (
    <div className="space-y-2">
      <PostSkeleton/>
      <PostSkeleton/>
      <PostSkeleton/>
    </div>
  );
}
