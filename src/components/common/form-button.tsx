'use client';

import { Button } from '@nextui-org/react';
import { useFormStatus } from 'react-dom';

interface FormButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export default function FormButton({ children, onClick }: FormButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button onClick={onClick} className="sm:w-80 self-center" type="submit" isLoading={pending}>
      {children}
    </Button>
  )
}