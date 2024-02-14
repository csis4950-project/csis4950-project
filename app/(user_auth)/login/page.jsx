import Image from "next/image";
import Link from "next/link";

export default function Login() {
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
                width={80}
                height={80}
                style={{ objectFit: "contain" }}
              />
              <span>Wehabu</span>
            </div>
            <div className="message">
              <span >Login into your account</span>
            </div>
          </div>
          <form action={async () => {
            "use server";
            console.log('action');
          }}>
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="email">Email</label>
              </div>
              <div className="input">
                <input type="email" id="email" name="email" required></input>
              </div>
            </div>
            <div className="input-field">
              <div className="mb-12">
                <label htmlFor="password">password</label>
              </div>
              <div className="input">
                <input type="password" id="password" name="password" required></input>
              </div>
            </div>
            <div className="flex flex--right mb-24">
              <Link className="link link__forget-password link--black-500" href="/">Forgot password?</Link>
            </div>
            <button className="btn" type="submit"><span>Login</span></button>
          </form>
        </div>
        <div className="divider">
          <div className="horizontal-line"></div>
          <span>OR</span>
          <span className="horizontal-line"></span>
        </div>
        <button className="btn btn--transparent">
          <Link className="link link--blue-500" href="/sign-up">Signup now</Link>
        </button>
      </section>
    </div>
  )
}

