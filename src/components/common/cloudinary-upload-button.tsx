'use client';

import { editAvatar } from '@/actions';
import { Button } from '@nextui-org/react';
import { CldUploadWidget } from 'next-cloudinary';
import { MouseEvent } from 'react';
import { MdEdit } from "react-icons/md";

export default function CloudinaryUpload() {
  return (
    <CldUploadWidget 
      uploadPreset="kgxd9epe" 
      onUpload={
        (result: any) => {
          editAvatar(result.info.secure_url);
        }
      }>
      {({ open }) => {
        function handleOnClick(e: MouseEvent<HTMLButtonElement>) {
          e.preventDefault();
          open();
        }
        return (
          <Button 
          color="warning"
          className="absolute top-0 right-0 z-10 rounded-lg text-md min-w-0 p-1 h-6"
          variant="ghost"
          onClick={handleOnClick}>
            <MdEdit />
          </Button>
        );
      }}
    </CldUploadWidget>
  );
}