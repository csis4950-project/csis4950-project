import Image from "next/image";
// Landing page
export default function Home() {
  return (
    <main className="landing">
      <section>
        <div>
          <h1>Work at the speed </h1>
          <h1>of thought</h1>
          <p>Most calendars are designed for teams. Slate is designed for  freelancers who want a simple way to plan their schedule.</p>
        </div>
           <div className="buttons">
              <button>Try For Free</button>
              <button>Learn More</button>
            </div>
            <div className="randompic">
            <Image src= "/randompicture.png"
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
      <section>
        <h2>Features</h2>
        <p>Most calendars are designed for teams. Slate is designed for
          freelancers who want a simple way to plan their schedule.</p>
          <div className="flexcontainer">
          <div className="randompic2">
            <Image src= "/randompic2.png"
              width={100}
              height={100}
              sizes="50vw"
              style={{
                width: '100%',
                height: 'auto',
              }}>
            </Image>
            </div>
            <div className="textcards">
              <div className="card1">
              <h4>A single source of truth</h4>
              <p>When you add work to your Slate calendar we automatically calculate useful insights </p>
              </div>
              <div className="card2">
              <h4>Intuitive interface</h4>
              <p>When you add work to your Slate calendar we automatically calculate useful insights </p>
              </div>
              <div className="card3">
              <h4>Or with rules</h4>
              <p>When you add work to your Slate calendar we automatically calculate useful insights </p>
              </div>
            </div>
            </div>
      </section>
    </main>
  );
}