'use client';

import * as actions from '@/actions';
import { supabase } from '@/db';
import { UserWithInfos } from '@/db/queries/users';
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Switch,
  Tooltip,
  useDisclosure
} from "@nextui-org/react";
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useFormState } from "react-dom";
import { MdEdit } from "react-icons/md";
import FormButton from "../common/form-button";
import FormErrorDisplay from '../common/form-error-warning';
import { FormInput, FormTextarea } from '../common/form-inputs';

interface EditUserInfosProps {
  userInfos: UserWithInfos
}

export default function EditUserInfos({ userInfos }: EditUserInfosProps) {
  const session = useSession();

  const { 
    id: userId, 
    name: originalName, 
    biography: originalBio,
    mailIsPublic: originalMailIsPublic } = userInfos;  
  const [name, setName] = useState(originalName);
  const [bio, setBio] = useState(originalBio);
  const [isMailPublic, setIsMailPublic] = useState(originalMailIsPublic);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, action] = useFormState(actions.editUserInfos.bind(null, isMailPublic), {
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
        aria-label="Modifier mon profil"
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
            <Switch 
              isSelected={isMailPublic} 
              onValueChange={setIsMailPublic}
              size="sm"
              >
              {isMailPublic ? 
                "Mail visible par les autres utilisateurs" : 
                "Mail caché aux autres utilisateurs"}
            </Switch>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>Annuler</Button>
              <FormButton
              className="font-medium text-base w-full"
              color="primary"
              variant="shadow"
              >Enregistrer</FormButton>
            {formState.errors._form ? 
              <FormErrorDisplay errors={formState.errors._form} /> :
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