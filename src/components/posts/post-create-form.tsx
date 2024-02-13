'use client';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import { formStyles } from '@/libs/styles';
import {
  Button,
  Card,
  Input,
  Textarea
} from '@nextui-org/react';
import { useState } from 'react';
import { useFormState } from 'react-dom';
import AddImagesButton from '../common/cloudinary-upload-images';
import FormErrorDisplay from '../common/form-error-warning';
import ImageMiniature from '../common/form-image-mini';

interface PostCreateformProps {
  slug: string;
}

export default function PostCreateform({ slug }: PostCreateformProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [postImages, setPostImages] = useState<string[]>([]);
  const [formState, action] = useFormState(actions.createPost.bind(null, slug, postImages), {
    errors: {}
  });
  return (
    <>
      <Button className="self-center font-medium text-base" 
        color="primary"
        onClick={() => setIsFormOpen(!isFormOpen)}>
          Créer un post
      </Button>
      <Card className={`backdrop-blur-lg rounded-lg bg-slate-950 bg-opacity-70
        border-1 border-slate-400 mt-4 ${isFormOpen ? "visible" : "hidden"}`}>       
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-full">
            <h3 className="text-lg font-semibold">Créer un post</h3>
            <Input 
              classNames={{ 
                inputWrapper: formStyles.input,        
                errorMessage: formStyles.error,
                base: "box-content"
              }}
              name="title" 
              label="Titre" 
              labelPlacement="outside" 
              placeholder="Titre"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}/> 
            <Textarea 
              classNames={{ 
                inputWrapper: formStyles.input,        
                errorMessage: formStyles.error,
                base: "box-content"
              }}
              name="content"
              label="Contenu" 
              labelPlacement="outside" 
              placeholder="Contenu du post" 
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />
            <div className="flex flex-wrap gap-2 px-auto">
              <AddImagesButton
                imagesAdded={postImages}
                setImagesAdded={setPostImages} />
              {postImages.map((src, i) => (
                <ImageMiniature 
                  key={i} 
                  src={src}
                  images={postImages}
                  setImages={setPostImages}
                  />
              ))}
            </div>
            {formState.errors._form ? 
              <FormErrorDisplay errors={formState.errors._form} /> : null}
            <FormButton
              className="font-medium text-base w-3/5 sm:w-2/5 self-center" 
              color="primary">Créer le post</FormButton>
          </div>
        </form>
      </Card>
    </>
  )
}