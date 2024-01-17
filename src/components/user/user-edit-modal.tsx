'use client';

import * as actions from '@/actions';
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useFormState } from "react-dom";
import { MdEdit } from "react-icons/md";
import FormButton from "../common/form-button";

interface EditUserInfosProps {
  originalName: string;
  originalBio: string;
}

export default function EditUserInfos({ originalName, originalBio }: EditUserInfosProps) {
  const session = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(originalName);
  const [bio, setBio] = useState(originalBio);
  const [formState, action] = useFormState(actions.editUserInfos, {
    errors: {}
  });
  
  return (
    <>
    <Tooltip 
      content="Modifier mon profil" 
      placement="left" 
      color="warning"
      className="font-medium"
      showArrow>
      <Button 
        onPress={onOpen}
        color="warning"
        className="rounded-lg text-md min-w-0 p-1 h-7 absolute right-3 top-3"
        variant="ghost">
        <MdEdit />
      </Button>
    </Tooltip>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent
        className="backdrop-blur-lg rounded-lg bg-slate-950 bg-opacity-70
        border-1 border-slate-400">
        {(onClose: () => void) => (
          <>
          <ModalHeader>Modifier votre profil</ModalHeader>
          <form onSubmit={onClose} 
            action={action}>
          <ModalBody>
            <Input 
              classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-80 backdrop-blur-md", 
              "border border-slate-600 border-opacity-50",
              "dark:hover:bg-opacity-60 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
              "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
              "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
              errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
              base: "box-content"
              }}
              name="name" 
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Pseudo" 
              labelPlacement="outside" 
              placeholder="Votre pseudo"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}/> 
            <Textarea 
              classNames={{ inputWrapper: ["bg-slate-950 bg-opacity-80 backdrop-blur-md", 
              "border border-slate-600 border-opacity-50",
              "dark:hover:bg-opacity-60 dark:hover:backdrop-blur-md dark:hover:bg-slate-950",
              "group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg", 
              "group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100"],        
              errorMessage: "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
              base: "box-content"
              }}
              name="biography"
              onChange={(e) => setBio(e.target.value)}
              label="Bio" 
              value={bio}
              labelPlacement="outside" 
              placeholder="Une courte présentation de vous" 
              isInvalid={!!formState.errors.biography}
              errorMessage={formState.errors.biography?.join(', ')}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>Annuler</Button>
              <FormButton
              className="font-medium text-base w-full"
              color="primary"
              variant="shadow"
              >Enregistrer</FormButton>
            {formState.errors._form ? 
        <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> :
        null}
          </ModalFooter>
        </form>
        </>
        )}       
      </ModalContent>
    </Modal>
    </>
  )
} 