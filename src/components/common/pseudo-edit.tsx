import { Button } from "@nextui-org/react";
import { MdEdit } from "react-icons/md";


export default function PseudoEdit() {
  return (
    <Button 
    color="warning"
    className="absolute top-0 right-0 z-10 rounded-lg text-md min-w-0 p-1 h-6"
    variant="ghost">
      <MdEdit />
    </Button>
  )
}
