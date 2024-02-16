'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps extends Omit<React.ComponentProps<typeof Button>, 'isLoading'> {
  children: React.ReactNode;
}

export default function FormButton({ children, ...props }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button 
      className="sm:w-80 self-center" 
      type="submit" 
      isLoading={pending}
      {...props}
      >
      {children}
    </Button>
  )
}