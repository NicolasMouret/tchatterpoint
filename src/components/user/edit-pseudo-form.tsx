'use client';

import * as actions from '@/actions';
import { Button } from "@nextui-org/react";
import { useEffect, useState } from 'react';
import { useFormState } from "react-dom";
import { MdEdit } from "react-icons/md";
import FormButton from '../common/form-button';



export default function EditPseudoForm({initialPseudo}: {initialPseudo: string}) {
  const [ userName, setUserName ] = useState(initialPseudo);
  const [ isFormOpen, setIsFormOpen ] = useState(false);
  const [ inputSize, setInputSize ] = useState(initialPseudo.length);
  const [ formState, action ] = useFormState(actions.editPseudo, {
    errors: {}
  });

  useEffect(() => {
    if (userName.length > 0 && userName.length < 5) {
      setInputSize(5)
    } else if (userName.length > 5 && userName.length < 12) {
      setInputSize(userName.length)
    } else if (userName.length >= 12) {
      setInputSize(12)
    }
  }, [userName])

  const OpenEdit = () => {
    return (
    <Button 
      onClick={() => setIsFormOpen(!isFormOpen)}
      color="warning"
      className="rounded-lg text-md min-w-0 p-1 h-6"
      variant="ghost">
      <MdEdit />
    </Button>
    )
  }

  return (
    <>
    {formState.errors.name ? 
        <div className="p-1 text-xs mb-2 bg-red-800 border w-46 border-red-400 rounded">
          {formState.errors.name}</div> :
        null}
      <form  
        action={action}
        className="flex items-start gap-2 mb-2 sm:mb-0">
      {isFormOpen ? 
        <div>
          <input 
            className="bg-slate-800 bg-opacity-50 backdrop-blur-sm pl-2 rounded-md outline-none
            focus:ring-1 focus:ring-slate-500 focus:ring-opacity-50"
            size={inputSize}
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
             />
        </div> :
        <span>{initialPseudo}</span>}
      {isFormOpen ?
        <FormButton
          color="warning"
          className="rounded-lg text-md min-w-0 ml-2 p-1 h-6"
          variant="ghost">
            Ok 
        </FormButton> : 
        <OpenEdit />}
      </form>
    </>
  )

}
