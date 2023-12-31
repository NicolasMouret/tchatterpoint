'use client';
import * as actions from '@/actions';
import FormButton from '@/components/common/form-button';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';

interface PostCreateformProps {
  slug: string;
}

export default function PostCreateform({ slug }: PostCreateformProps) {
  const [formState, action] = useFormState(actions.createPost.bind(null, slug), {
    errors: {}
  });
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button className="self-center" color="primary">Créer un post</Button>
      </PopoverTrigger>
      <PopoverContent>       
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-[85vw] sm:max-w-6xl">
            <h3 className="text-lg">Create a Post</h3>
            <Input 
              name="title" 
              label="Title" 
              labelPlacement="outside" 
              placeholder="Title"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}/> 
            <Textarea 
              name="content"
              label="Content" 
              labelPlacement="outside" 
              placeholder="Content" 
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />
            {formState.errors._form ? 
            <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> :
            null}
            <FormButton>Create a post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover> 
  )
}