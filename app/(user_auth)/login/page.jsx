import Image from "next/image";
export default function Login() {
  return (
    <main className="login">
      <section>
        <div className="container">
          <div className="loginpic">
          <Image src= "/loginBackground.png"
              width={100}
              height={100}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}>
            </Image>
          </div>
            <div className="loginForm">
              <div className="formLogo">
                   <Image src="/wehabu.png"
                      alt="main_image1"
                      width={80}
                      height={80}
                      style={{ objectFit: "contain" }}
                    />
                         <span>Wehabu</span>
                </div>
              <form className="loginBox">
                <div className="usernameBox">
                  <label for="username">Email:</label>
                  <input type="text" id="Email" name="Email" required></input>
                  <Image src="/img.png"
                    className="usernameImage"
                      alt="main_image1"
                      width={22}
                      height={22}
                      style={{ objectFit: "contain" }}
                    />
                </div>
                <div className="passwordBox">
                  <label for="username">Password:</label>
                  <input type="text" id="password" name="password" required></input>
                  <Image src="/img.png"
                    className="passwordImage"
                      alt="main_image1"
                      width={22}
                      height={22}
                      style={{ objectFit: "contain" }}
                    />
                </div>
              </form>

            </div>



        </div>

      </section>
    </main>
  )
}

