'use server';

import * as auth from '@/auth';
import { signIn } from 'next-auth/react';

export async function signInGithub() {
  return auth.signIn('github');
}

export async function signInGoogle() {
  return signIn('google');
}

export async function signInChoice() {
  return auth.signIn();
}