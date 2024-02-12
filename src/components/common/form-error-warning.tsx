interface FormErrorDisplayProps {
  errors: string[];
}

export default function FormErrorDisplay(errors: FormErrorDisplayProps) {
  return (
    <div className="p-2 bg-red-950 border border-red-500 text-red-200 rounded">
      {errors.errors.join(', ')}
    </div>
  );
}