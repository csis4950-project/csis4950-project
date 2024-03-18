import Image from "next/image";
import Link from "next/link";
import LoginFrom from "./LoginForm";


export default async function Login() {


  return (
    <div className="login-page">
      <div className="login-img">
        <Image src="/login_img.png"
          alt="login image"
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
      <section>
        <div className="login-form">
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
              <span >Login into your account</span>
            </div>
          </div>
          <LoginFrom />
        </div>
        <div className="divider">
          <div className="horizontal-line"></div>
          <span>OR</span>
          <span className="horizontal-line"></span>
        </div>
        <button className="btn--sign-up-now">
          <Link className="link link--blue-500" href="/sign-up">Sign up now</Link>
        </button>
      </section>
    </div>
  )
}

