import { auth } from '@/auth';
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentDeleteForm from "@/components/comments/comment-delete-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import { Avatar } from '@nextui-org/react';
import CommentEditForm from './comment-edit-form';
import CommentImage from './comment-image';

interface CommentShowProps {
  commentId: string;
  postId: string;
  isChild?: boolean;
}

const mockImagesList: string[] = [
  'https://picsum.photos/500/800',
  'https://picsum.photos/400/600',
];

export default async function CommentShow({ commentId, postId, isChild }: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);
  const session = await auth();
  const isAdmin = session?.user?.role === "admin";
  const isAuthor = session?.user?.id === comment?.user.id;

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return (
      <CommentShow key={child.id} commentId={child.id} postId={postId} isChild/>
    );
  });

  return (
    <article className={`px-2 pt-2 my-2 text-small border border-slate-400 rounded 
    ${isChild ? "bg-opacity-0" : "bg-black bg-opacity-85 backdrop-blur-sm"}`}>
      <article className="flex gap-3 mb-2">
        <Avatar
          src={comment.user.image || ""}
          size="sm"
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1 space-y-3">
          <div className="flex gap-4 items-center">
            <p className="text-sm font-medium">
              {comment.user.name}
            </p>
            {(isAuthor || isAdmin) && (
                <>
                  {isAuthor && (
                    <CommentEditForm
                      postId={postId}
                      commentId={commentId}
                      originalContent={comment.content}
                    />
                  )}
                  <CommentDeleteForm postId={postId} commentId={commentId} />
                </>
              )}
          </div>
          <p className="">{comment.content}</p>
          {mockImagesList.length > 0 ?
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
           {mockImagesList.map((src, i) => (
            <CommentImage key={i} imageUrl={src} />
           ))}
         </div> : null}
          <CommentCreateForm postId={postId} parentId={commentId} />
        </div>
      </article>
      {renderedChildren}
    </article>
  );
}
