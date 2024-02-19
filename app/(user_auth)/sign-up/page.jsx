import { permanentRedirect } from "next/navigation";
import SignUpInputField from './SignUpInputField';
import Image from "next/image";
import { signUpOwner } from "@/utils/actions";
import { getSession, getErrorSession } from "@/utils/session";

export default async function SignUp() {
  const errorSession = await getErrorSession();

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
            await signUpOwner(formData);
            const session = await getSession();
            const errorSession = await getErrorSession();
            permanentRedirect("/sign-up");
          }}>
            <SignUpInputField error={errorSession ? errorSession.payload : null} />
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