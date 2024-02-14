import { signUp } from '@/utils/actions';
import { permanentRedirect } from "next/navigation";
import { cookies } from 'next/headers';
import SignUpInputField from './SignUpInputField';
import Image from "next/image";

export default function SignUp() {
  const c = cookies().get('session');
  if (c) {
    permanentRedirect("/user/dashboard", "replace");
  }
  return (
    <div className='sign-up-page'>
      <section>
        <div className='sign-up-form'>
          <div className="logo-frame">
            <div className="logo">
              <Image src="/wehabu.png"
                alt="logo"
                width={45}
                height={60}
                style={{ objectFit: "fill" }}
              />
              <span>Wehabu</span>
            </div>
            <div className="message">
              <span >Sign up into your account</span>
            </div>
          </div>
          <form action={async (formData) => {
            'use server';
            // await signUp(formData);
            console.log(formData);
          }}>
            <SignUpInputField />
          </form>
        </div>
      </section>
      <div className="sign-up-img bg-white">
        <Image src="/sign_up_img.png"
          alt="sign up image"
          width={100}
          height={100}
          sizes="100vw"
          style={{
            width: '100%',
            height: '100%',
            objectFit: "cover"
          }}>
        </Image>
      </div>
    </div>
  )
}
