'use client';

import { editAvatar } from '@/actions';
import { frTranslation } from '@/cloudinary-fr-translation';
import { Button, Tooltip } from '@nextui-org/react';
import { CldUploadWidget } from 'next-cloudinary';
import { MouseEvent } from 'react';
import { MdEdit } from "react-icons/md";

export default function EditAvatarUpload() {
  return (
    <CldUploadWidget 
      uploadPreset="kgxd9epe" 
      options={{
        multiple: false,
        cropping: true,
        theme: "minimal",
        text: frTranslation,
        language: "fr"
        }}
      onSuccess={
        (result: any) => {
          editAvatar(result.info.thumbnail_url);
        }
      }>
      {({ open }) => {
        function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
          e.preventDefault();
          open();
        }
        return (
          <Tooltip 
            content="Changer de photo de profil" 
            placement="top" 
            color="warning"
            className="font-medium"
            showArrow>
            <Button 
              color="warning"
              className="absolute top-0 right-0 z-10 rounded-lg text-md min-w-0 p-1 h-6"
              variant="ghost"
              onClick={handleOnClick}>
                <MdEdit />
            </Button>
          </Tooltip>
        );
      }}
    </CldUploadWidget>
  );
}