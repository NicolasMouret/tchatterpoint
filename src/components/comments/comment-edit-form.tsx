'use client';

import * as actions from '@/actions';
import FormButton from "@/components/common/form-button";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useState } from 'react';
import { useFormState } from 'react-dom';
import { FaEdit } from "react-icons/fa";

interface CommentEditFormProps {
  commentId: string;
  postId: string;
  originalContent: string;
}

export default function CommentEditForm({ commentId, postId, originalContent }: CommentEditFormProps) {
  const [content, setContent] = useState(originalContent);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, action] = useFormState(actions.editComment.bind(null, { commentId, postId }), {
    errors: {}
  });

  return (
    <>
      {/* ON DESKTOP */}
      <Button 
      onPress={onOpen}
      size="sm"
      variant="light"
      className="hidden sm:block">
        Modifier
      </Button>
      {/* ON MOBILE */}
      <button type="button" onClick={onOpen} className="sm:hidden">
        <FaEdit className="text-lg" />
      </button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent 
          className="backdrop-blur-lg rounded-lg bg-slate-950 bg-opacity-70
          border-1 border-slate-400">
          {(onClose: () => void) => (
            <>
              <ModalHeader>Modifier le commentaire</ModalHeader>
              <form onSubmit={onClose} action={action}>
              <ModalBody>
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
                  placeholder="Veuillez entrer votre commentaire"
                  value={content}
                  onValueChange={setContent}
                  isInvalid={!!formState.errors.content}
                  errorMessage={formState.errors.content?.join(', ')}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Annuler</Button>
                  <FormButton
                  className="font-medium text-base w-full"
                  color="primary"
                  variant="shadow"
                  >Modifier</FormButton>
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
  );
}

