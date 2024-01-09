'use client';

import * as actions from '@/actions';
import { Button } from "@nextui-org/react";
import { useState } from 'react';
import { useFormState } from "react-dom";
import { MdEdit } from "react-icons/md";



export default function EditPseudoForm({initialPseudo}: {initialPseudo: string}) {
  const [userName, setUserName] = useState(initialPseudo)
  const [ isFormOpen, setIsFormOpen ] = useState(false)
  const [formState, action] = useFormState(actions.editPseudo, {
    errors: {}
  })

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
      <form action={action} className="flex items-start gap-2 mb-2 sm:mb-0">
      {isFormOpen ? 
        <div>
          <input 
            className="bg-slate-800 bg-opacity-50 backdrop-blur-sm pl-2 rounded-md"
            size={userName.length}
            type="text"
            name="name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
             />
        </div> :
        <span>{initialPseudo}</span>}
      {isFormOpen ?
        <Button
          type="submit"
          onClick={() => setIsFormOpen(!isFormOpen)}
          color="warning"
          className="rounded-lg text-md min-w-0 ml-2 p-1 h-6"
          variant="ghost">
            Ok 
        </Button> : 
        <OpenEdit />}
      </form>
    </>
  )

}
