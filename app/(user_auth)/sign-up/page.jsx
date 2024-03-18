import Image from "next/image";
import OwnerSignUpForm from "./OwnerSignUpForm";

export default async function SignUp() {

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
          <OwnerSignUpForm />
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