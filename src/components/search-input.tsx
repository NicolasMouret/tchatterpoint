'use client';

import * as actions from '@/actions';
import { Input } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';

export default function SearchInput() {
  const searchParams = useSearchParams();
  return (
    <form action={actions.search}>
      <Input classNames={{inputWrapper: "h-[60%]"}} size="sm" placeholder="Search" name="term" defaultValue={searchParams.get('term') || ''}/>
    </form>
  )
}