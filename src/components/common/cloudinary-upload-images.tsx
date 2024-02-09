'use client';
import { frTranslation } from '@/cloudinary-fr-translation';
import { Button, Tooltip } from '@nextui-org/react';
import { CldUploadWidget } from 'next-cloudinary';
import { MouseEvent } from 'react';
import { SlPicture } from "react-icons/sl";

interface AddImagesButtonProps {
  setImagesAdded: (images: string[]) => void;
  imagesAdded: string[];
}

export default function AddImagesButton({ setImagesAdded, imagesAdded }: AddImagesButtonProps) {
  return (
    <CldUploadWidget 
      uploadPreset="kgxd9epe" 
      options={{
        multiple: false,
        theme: "minimal",
        text: frTranslation,
        language: "fr"}}
      onSuccess={
        (result: any) => {
          const newImagesAdded = [...imagesAdded, result.info.secure_url];
          setImagesAdded(newImagesAdded);
        }
      }
      >
      {({ open }) => {
        function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
          e.preventDefault();
          open();
        }
        return (
          <Tooltip 
            content="Ajouter des images" 
            placement="right" 
            color="warning"
            className="font-medium"
            showArrow>
            <Button 
              color="warning"
              variant="ghost"
              className="min-w-0 w-12 px-2 h-10 rounded-md"
              onClick={handleOnClick}>
                <SlPicture className="text-2xl"/>
            </Button>
          </Tooltip>
        );
      }}
    </CldUploadWidget>
  );
}