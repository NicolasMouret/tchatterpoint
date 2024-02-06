'use client';

import { Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";

interface CommentImageProps {
  imageUrl: string;
}

export default function CommentImage({imageUrl}: CommentImageProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Image
        className="hover:cursor-pointer max-w-[95%] sm:max-w-none"
        radius="sm"
        isZoomed
        onClick={onOpen}
        src={imageUrl}
        alt={`comment related images`}
        height={200}
        width={200} 
        style={{
          height: 200,
          width: 200,
          objectFit: 'cover',
        }}
      />
      <Modal 
        backdrop="blur" 
        isOpen={isOpen}  
        onOpenChange={onOpenChange}
        placement="center"
        size="4xl">
        <ModalContent 
          className="p-6 bg-black bg-opacity-70 backdrop-blur-sm border-1 border-slate-600
          max-h-[95vh]">
            {(onClose) => (
              <Image
              src={imageUrl}
              alt="comment related images"
              height= {1000}
              width={1000} 
              style={{
                maxHeight: '85vh',
                objectFit: 'scale-down',
              }}
            />
          )}
        </ModalContent>
      </Modal>
    </>
  )

}