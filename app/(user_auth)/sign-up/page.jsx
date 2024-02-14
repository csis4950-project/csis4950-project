import { signUp } from '@/utils/actions';
import { redirect, permanentRedirect } from "next/navigation";
import { cookies } from 'next/headers';
import Input from './Input';


export default function SignUp() {
  const c = cookies().get('session');
  if (c) {
    redirect("/user/dashboard", "replace");
  }
  return (
    <form action={async (formData) => {
      'use server';
      await signUp(formData);
    }}>
      <Input />
    </form>
  )
}
