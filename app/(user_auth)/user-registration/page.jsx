import Image from "next/image";
import UserSignUpForm from "./UserSignUpForm";
import { decrypt } from "@/utils/session";
import { redirect } from "next/navigation";

export default async function UserRegistration({ searchParams }) {
  const { payload } = searchParams;
  let invitationData;
  try {
    invitationData = await decrypt(payload);
  } catch (e) {
    redirect("/invitation-expired");
  }

  const now = new Date().getTime();
  const expiration = new Date(invitationData.exp * 1000)
  if (expiration < now) {
    redirect("/invitation-expired");
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
          <UserSignUpForm invitationData={invitationData} />
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