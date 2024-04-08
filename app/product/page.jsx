import Image from "next/image";

export default function product() {
  return (
    <div className="product-page">
      <div class="container">
        <div className="container__text">
          <h4>Scheduling Made Easy</h4>
          <p>
            With Wehabu, creating employee schedules is a breeze. Our intuitive
            platform allows you to input shifts, assign them to your team members,
            and manage availability
          </p>
        </div>
        <div className="container__photo">
          <div className="profileBanner">
            <Image
              src="/scheduling_product.jpg"
              alt="login image"
              width={100}
              height={100}
              sizes="100vw"
              style={{
                width: "311px",
                height: "202px",
                objectFit: "cover",
              }}
            ></Image>
          </div>
        </div>
      </div>
      <div class="container">
       
        <div className="container__photo">
          <div className="profileBanner">
            <Image
              src="/manage_product.jpg"
              alt="login image"
              width={100}
              height={100}
              sizes="100vw"
              style={{
                width: "311px",
                height: "202px",
                objectFit: "cover",
              }}
            ></Image>
          </div>
        </div>
        <div className="container__text">
          <h4>Need something from the manager?</h4>
          <p>
          Employees have the flexibility to request leave, share updates via a dashboard, and stay informed about schedule changes.
          </p>
        </div>
      </div>
      <div class="container">
        <div className="container__text">
          <h4>Time Tracking should not be taxing</h4>
          <p>
          Time in? Time out? Just a click or tap you are in and out.
          </p>
        </div>
        <div className="container__photo">
          <div className="profileBanner">
            <Image
              src="/time_product.jpg"
              alt="login image"
              width={100}
              height={100}
              sizes="100vw"
              style={{
                width: "311px",
                height: "202px",
                objectFit: "cover",
              }}
            ></Image>
          </div>
        </div>
      </div>
      <div class="call_container">
        <div className="container__text">
          <h4>Interested</h4>
          <div class = "contact_number">
          <Image
              src="/msg_icn.png"
              alt="login image"
              width={100}
              height={100}
              sizes="100vw"
              style={{
                width: "20px",
                height: "20px",
                objectFit: "cover",
              }}
            ></Image>
            <span>wehabu@gmail.com</span>
            
            </div>
        </div>
        <Image
              src="/pn_icn.png"
              alt="login image"
              width={100}
              height={100}
              sizes="100vw"
              style={{
                width: "20px",
                height: "20px",
                objectFit: "cover",
              }}
            ></Image>
            <span>236-86X-XXXX</span>
      </div>
    </div>
  );
}
