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
        <Button className="self-center font-medium text-base" 
          color="primary"
          variant="shadow">Créer un post</Button>
      </PopoverTrigger>
      <PopoverContent className="backdrop-blur-lg rounded-lg bg-slate-950 bg-opacity-70
        border-1 border-slate-400">       
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-[85vw] sm:max-w-3xl">
            <h3 className="text-lg">Créer un post</h3>
            <Input 
              classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-80 backdrop-blur-md", 
              "border border-slate-600 border-opacity-50",
              "dark:hover:bg-opacity-60 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
              "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
              "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
              errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
              base: "box-content"
              }}
              name="title" 
              label="Titre" 
              labelPlacement="outside" 
              placeholder="Titre"
              isInvalid={!!formState.errors.title}
              errorMessage={formState.errors.title?.join(', ')}/> 
            <Textarea 
              classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-80 backdrop-blur-md", 
              "border border-slate-600 border-opacity-50",
              "dark:hover:bg-opacity-60 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
              "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
              "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
              errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
              base: "box-content"
              }}
              name="content"
              label="Contenu" 
              labelPlacement="outside" 
              placeholder="Contenu du post" 
              isInvalid={!!formState.errors.content}
              errorMessage={formState.errors.content?.join(', ')}
            />
            {formState.errors._form ? 
            <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> :
            null}
            <FormButton
              className="font-medium text-base w-2/5 self-center" 
              color="primary">Créer le post</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover> 
  )
}