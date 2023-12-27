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
  useDisclosure,
} from "@nextui-org/react";
import { useFormState } from 'react-dom';
import { MdDeleteForever } from "react-icons/md";

interface CommentDeleteFormProps {
  commentId: string;
  postId: string;
}

export default function CommentDeleteForm({ commentId, postId }: CommentDeleteFormProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, action] = useFormState(actions.deleteComment.bind(null, { commentId, postId }), {
    errors: {}
  });

  return (
    <>
      {/* ON DESKTOP */}
      <Button 
      onPress={onOpen}
      size="sm"
      variant="light"
      color="danger"
      className="hidden sm:block">
        Supprimer le commentaire
      </Button>
      {/* ON MOBILE */}
      <button type="button" onClick={onOpen} className="sm:hidden">
        <MdDeleteForever className="text-lg" />
      </button>
      <Modal 
        isOpen={isOpen} 
        onOpenChange={onOpenChange}
        className="sm:max-w-lg">
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader>Supprimer le commentaire</ModalHeader>
              <ModalBody>
                <p>Supprimer ce commentaire supprimera les commentaires en réponses à celui ci.</p>
                <p>Etes-vous sûr de vouloir supprimer ce commentaire ?</p>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button color="danger" variant="light" onPress={onClose}>Annuler</Button>
                <form onSubmit={onClose} action={action}>
                  <FormButton>Supprimer</FormButton>
                </form>
                {formState.errors._form ? 
            <div className="p-2 bg-red-200 border border-red-400 rounded">{formState.errors._form?.join(', ')}</div> :
            null}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

