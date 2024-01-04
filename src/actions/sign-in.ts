'use server';

import * as auth from '@/auth';
import { redirect } from 'next/navigation';

export async function signInGithub() {
  return auth.signIn('github');
}

export async function signInGoogle() {
  return auth.signIn('google', { callbackUrl: '/'});
}

export async function signIn() {
  return redirect("api/auth/signin")
}