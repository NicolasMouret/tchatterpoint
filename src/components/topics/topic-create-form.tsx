'use client';
import * as actions from '@/actions';
import {
  Button,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Textarea,
} from '@nextui-org/react';
import { useFormState } from 'react-dom';
import FormButton from '../common/form-button';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(actions.createTopic, {
    errors: {}
  });
  return (
    <Popover placement="bottom">
      <PopoverTrigger>
        <Button className="self-center font-medium text-base" 
          color="primary" 
          variant="shadow">Créer un sujet</Button>
      </PopoverTrigger>
      <PopoverContent className="backdrop-blur-lg rounded-lg bg-slate-950 bg-opacity-70
        border-1 border-slate-400">       
        <form action={action}>
          <div className="flex flex-col gap-4 p-4 w-[85vw] sm:max-w-2xl">
            <h3 className="text-lg">Créer un sujet</h3>
            <Input 
              classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-60 backdrop-blur-md", 
              "border border-slate-600 border-opacity-50",
              "dark:hover:bg-opacity-80 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
              "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
              "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
              errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
              base: "box-content"
              }}
              name="name" 
              label="Nom du sujet" 
              labelPlacement="outside" 
              placeholder="Nom du sujet"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}/> 
            <Textarea
              classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-60 backdrop-blur-md", 
              "border border-slate-600 border-opacity-50",
              "dark:hover:bg-opacity-80 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
              "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
              "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
              errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
              base: "box-content"
              }}
              name="description"
              label="Description" 
              labelPlacement="outside" 
              placeholder="Décrivez votre sujet" 
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            />
            {formState.errors._form ? 
            <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> :
            null}
            <FormButton
              className="font-medium text-base w-2/5 self-center" 
              color="primary">Enregistrer</FormButton>
          </div>
        </form>
      </PopoverContent>
    </Popover> 
  )
}