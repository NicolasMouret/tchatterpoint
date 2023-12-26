import { Skeleton } from "@nextui-org/react";

export default function PostShowLoading() {
  return (
    <div className="m-4">
      <h1 className="my-2">
        <Skeleton className="h-8 w-48" />
      </h1>
      <p className="p-4 border rounded space-y-2">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-64" />
        <Skeleton className="h-6 w-48" />
      </p>
    </div>
  );
}