import { Input, Textarea } from "@nextui-org/react";

interface FormInputProps extends Omit<React.ComponentProps<typeof Input>, "classNames">{}
interface FormTextareaProps extends Omit<React.ComponentProps<typeof Textarea>, "classNames">{}

function FormInput({...props}: FormInputProps) {
  return (
    <Input 
      classNames={{ 
        inputWrapper: 
        `bg-slate-950 bg-opacity-60 backdrop-blur-md 
        border border-slate-600 border-opacity-50 
        dark:hover:bg-slate-950 dark:hover:bg-opacity-75 dark:hover:backdrop-blur-md 
        group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg 
        group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100`,        
        errorMessage: 
        "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
        base: "box-content"
      }}
      {...props}/> 
  )
}

function FormTextarea({...props}: FormTextareaProps) {
  return (
    <Textarea
      classNames={{ 
        inputWrapper: 
        `bg-slate-950 bg-opacity-60 backdrop-blur-md 
        border border-slate-600 border-opacity-50 
        dark:hover:bg-slate-950 dark:hover:bg-opacity-75 dark:hover:backdrop-blur-md 
        group-data-[focus=true]:bg-opacity-85 group-data-[focus=true]:backdrop-blur-lg 
        group-data-[focus=true]:bg-slate-950 group-data-[focus=true]:border-opacity-100`,        
        errorMessage: 
        "text-red-200 bg-rose-950 p-1 pl-2 rounded bg-opacity-90 backdrop-blur-sm",
        base: "box-content"
      }}
      {...props}/> 
  )
}

export { FormInput, FormTextarea };
  