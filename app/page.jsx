import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="landing">
      <section>
        <div className="title">
          <div>
            <h1>Work at the speed of thought</h1>
          </div>
          <div>
            <p>Most calendars are designed for teams. Slate is designed for  freelancers who want a simple way to plan their schedule.</p>
          </div>
        </div>
        <div className="buttons">
          <Link className="link" href="/sign-up">Try for free</Link>
          <Link className="link" href="/">Learn More</Link>
        </div>
        <div>
          <Image src="/home_bg.png"
            alt="background image1"
            width={100}
            height={100}
            sizes="100vw"
            style={{
              width: '100%',
              height: 'auto',
            }}>
          </Image>
        </div>
      </section>
      <section className="features">
        <div className="title title__max-length">
          <div>
            <h2>Features</h2>
          </div>
          <div>
            <p>Most calendars are designed for teams. Slate is designed for freelancers who want a simple way to plan their schedule.</p>
          </div>
        </div>
        <div className="content">
          <div className="feature-image">
            <Image src="/home_bg2.png"
              alt="background image2"
              width={100}
              height={100}
              sizes="50vw"
              style={{
                width: '100%',
                height: 'auto',
              }}>
            </Image>
          </div>
          <div className="text-cards">
            <div className="card">
              <h4 className="card--title">A single source of truth</h4>
              <p>When you add work to your Slate calendar we automatically calculate useful insights </p>
            </div>
            <div className="card">
              <h4 className="card--title">Intuitive interface</h4>
              <p>When you add work to your Slate calendar we automatically calculate useful insights </p>
            </div>
            <div className="card">
              <h4 className="card--title">Or with rules</h4>
              <p>When you add work to your Slate calendar we automatically calculate useful insights </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}