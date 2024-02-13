"use client";

import * as actions from "@/actions";
import FormButton from "@/components/common/form-button";
import { formStyles } from "@/libs/styles";
import { Button, Textarea } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import { useFormState } from "react-dom";
import AddImagesButton from "../common/cloudinary-upload-images";
import FormErrorDisplay from "../common/form-error-warning";
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
          classNames={{ 
            inputWrapper: formStyles.input,        
            errorMessage: formStyles.error,
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
        {formState.errors._form ? 
          <FormErrorDisplay errors={formState.errors._form} /> : null}
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
