"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import AddImagesButton from "../common/cloudinary-upload-images";
import ImageMiniature from "../common/form-image-mini";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen);
  const [commentImages, setCommentImages] = useState<string[]>([]);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    actions.createComment.bind(null, { postId, parentId, images: commentImages}),
    { errors: {} }
  );

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();

      if (!startOpen) {
        setOpen(false);
      }
    }
  }, [formState, startOpen]);

  const form = (
    <form action={action} onSubmit={() => setCommentImages([])} ref={ref}>
      <div className={`space-y-2 px-1 mt-1 w-full ${parentId ? "sm:w-4/5" : ""}`}>
        <Textarea
          classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-60 backdrop-blur-md", 
          "border border-slate-600 border-opacity-50",
          "dark:hover:bg-opacity-80 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
          "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
          "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
          errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
          base: "box-content"
          }}
          name="content"
          label="Réponse"
          placeholder="Votre commentaire..."
          errorMessage={formState.errors.content?.join(", ")}
        />
        <div className="flex flex-wrap gap-2 px-auto">
          <AddImagesButton
            imagesAdded={commentImages}
            setImagesAdded={setCommentImages} />
          {commentImages.map((src, i) => (
            <ImageMiniature 
              key={i} 
              src={src}
              images={commentImages}
              setImages={setCommentImages}
              />
          ))}
        </div>
        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

        <FormButton
          className="font-medium text-base min-w-[130px] w-2/5 self-center"
          color="warning">Commenter</FormButton>
      </div>
    </form>
  );

  return (
    <div>
      <Button 
        className="my-2 font-semibold"
        size="sm" 
        variant="ghost" 
        color="warning"
        onClick={() => setOpen(!open)}>
        Répondre
      </Button>
      {open && form}
    </div>
  );
}
