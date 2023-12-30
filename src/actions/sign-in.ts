'use server';

import * as auth from '@/auth';

export async function signInGithub() {
  return auth.signIn('github');
}

export async function signInGoogle() {
  return auth.signIn('google', { callbackUrl: process.env.NEXTAUTH_URL });
}

export async function signInChoice() {
  return auth.signIn();
}