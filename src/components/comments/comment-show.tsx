import { auth } from '@/auth';
import CommentCreateForm from "@/components/comments/comment-create-form";
import CommentDeleteForm from "@/components/comments/comment-delete-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";
import Image from "next/image";
import CommentEditForm from './comment-edit-form';

interface CommentShowProps {
  commentId: string;
  postId: string;
}


export default async function CommentShow({ commentId, postId }: CommentShowProps) {
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
      <CommentShow key={child.id} commentId={child.id} postId={postId} />
    );
  });

  return (
    <div className="p-2 my-2 text-small border rounded bg-black bg-opacity-70 backdrop-blur-sm">
      <div className="flex gap-3 mb-2">
        <Image
          src={comment.user.image || ""}
          alt="user image"
          width={40}
          height={40}
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
          <CommentCreateForm postId={postId} parentId={commentId} />
        </div>
      </div>
      {renderedChildren}
    </div>
  );
}
