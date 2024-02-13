'use client';

import * as actions from '@/actions';
import FormButton from "@/components/common/form-button";
import { formStyles } from '@/libs/styles';
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
import AddImagesButton from '../common/cloudinary-upload-images';
import FormErrorDisplay from '../common/form-error-warning';
import ImageMiniature from '../common/form-image-mini';

interface CommentEditFormProps {
  commentId: string;
  postId: string;
  originalContent: string;
  originalImages: string[];
}

export default function CommentEditForm({ commentId, postId, originalContent, originalImages }: CommentEditFormProps) {
  const [content, setContent] = useState(originalContent);
  const [images, setImages] = useState(originalImages);
  const [isSuccess, setIsSuccess] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [formState, action] = useFormState(actions.editComment.bind(null, { commentId, postId, images }), {
    errors: {},
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
                  classNames={{ inputWrapper: formStyles.input,        
                  errorMessage: formStyles.error,
                  base: "box-content"
                  }}
                  name="content"
                  placeholder="Veuillez entrer votre commentaire"
                  value={content}
                  onValueChange={setContent}
                  isInvalid={!!formState.errors.content}
                  errorMessage={formState.errors.content?.join(', ')}
                />
                <div className="flex flex-wrap gap-2 px-auto">
                  <AddImagesButton
                    imagesAdded={images}
                    setImagesAdded={setImages} />
                  {images.map((src, i) => (
                    <ImageMiniature 
                      key={i} 
                      src={src}
                      images={images}
                      setImages={setImages}
                      />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>Annuler</Button>
                <FormButton
                className="font-medium text-base w-full"
                color="primary">
                  Modifier
                </FormButton>

                {formState.errors._form ?
                  <FormErrorDisplay errors={formState.errors._form} /> : null}
              </ModalFooter>
            </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

