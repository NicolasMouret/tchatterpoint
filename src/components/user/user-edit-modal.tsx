'use client';

import * as actions from '@/actions';
import { supabase } from '@/db';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useFormState } from "react-dom";
import { MdEdit } from "react-icons/md";
import FormButton from "../common/form-button";
import { FormInput, FormTextarea } from '../common/form-inputs';

interface EditUserInfosProps {
  originalName: string;
  originalBio: string;
  userId: string;
}

export default function EditUserInfos({ originalName, originalBio, userId }: EditUserInfosProps) {
  const session = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [name, setName] = useState(originalName);
  const [bio, setBio] = useState(originalBio);
  const [formState, action] = useFormState(actions.editUserInfos, {
    errors: {}
  });

  // CLOSE MODAL ON CONFIRMATION BROACAST 
  // SENT FROM THE EDIT COMMENT SERVER ACTION
  useEffect(() => {
    const channel = supabase.channel(`confirmEdit-${userId}`);
    channel.on(
      "broadcast",
      { event: "confirmEdit" },
      () => {
        onOpenChange();
      }
    ).subscribe();
  })
  
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
          <form 
            action={action}
            onSubmit={() => session.update({
              name: name, biography: bio
              })}>
          <ModalBody>
            <FormInput
              name="name" 
              onChange={(e) => setName(e.target.value)}
              value={name}
              label="Pseudo" 
              labelPlacement="outside" 
              placeholder="Votre pseudo"
              isInvalid={!!formState.errors.name}
              errorMessage={formState.errors.name?.join(', ')}/> 
            <FormTextarea
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