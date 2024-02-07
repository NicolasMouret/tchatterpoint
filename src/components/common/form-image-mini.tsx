import { Tooltip } from '@nextui-org/react';
import Image from 'next/image';
import { MouseEvent } from 'react';
import { ImCross } from "react-icons/im";

interface ImageMiniatureProps {
  src: string;
  images: string[];
  setImages: (images: string[]) => void;
}

export default function ImageMiniature({ src, images, setImages }: ImageMiniatureProps) {
  const handleDelete = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newImages = images.filter((image) => image !== src);
    setImages(newImages);
  }
  return (
    <article className="relative w-12 h-10">
      <Image 
        src={src} 
        alt="Image ajoutée au post" 
        width={48}
        height={40}
        className="w-full h-full rounded-md object-cover"
      />
      <Tooltip 
        content="retirer l'image" 
        placement="top" 
        color="warning"
        className="font-medium"
        showArrow>
      <button 
        type="button"
        className="absolute top-0.5 right-0.5"
        onClick={handleDelete}>
          <ImCross className="text-md text-red-700"/>
      </button>
      </Tooltip>
    </article>
  )
}