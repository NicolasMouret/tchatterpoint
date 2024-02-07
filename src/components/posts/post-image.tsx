'use client';

import { Image, Modal, ModalContent, useDisclosure } from "@nextui-org/react";

interface PostImageProps {
  imageUrl: string;
  alt: string;
}

export default function PostImage({imageUrl, alt}: PostImageProps) {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Image
        className="hover:cursor-pointer"
        radius="sm"
        isZoomed
        onClick={onOpen}
        src={imageUrl}
        alt={alt}
        height={100}
        width={100} 
        style={{
          height: 100,
          width: 100,
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
              alt={alt}
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