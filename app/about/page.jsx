import Image from "next/image";
const urls = ["/smile_ic.png","/diamond_ic.png","/rocket_ic.png","/flower_ic.png","/plane_ic.png"]
const tags = ["Customer Satisfaction","Cost-Effective","Innovative Solutions","Passion","Efficiency"]
export default function About(){
    return(
    <div className="about">
        <section>
            <div className="profileBanner">
            <Image src="/about_bg.png"
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
        </section>
        <section>
            <div className="second-div">
                <div className="about-article">
                    <h4>Our Story</h4>
                    <p>Wehabu started as a research project developed by Shingo Tennichi and Karlo Justo</p>
                    <p>as an answer to common administrative workplace problems.</p>
                    <p>Efficient workplace solutions is what we strive at Wehabu.</p>
                    <p>providing a software solution that allows ownership and management</p>
                    <p>to focus on their business rather than efficiencies</p>
                </div>
                <div>
                    <div className="cards">
                        <p className="cardtext">Helping Business Since</p>
                        <h4 className="cardtext">2024</h4>
                    </div>
                    <div className="cards">
                        <p className="cardtext">Services available in</p>
                        <h4 className="cardtext">Canada</h4>
                    </div>
                </div>
            </div>
        </section>
          <section>
          <h4 className="centered-text">Core Values</h4>
          <div className="third-div">
            <div className="image-container">
                 {
                    urls.map((url,index) => {
                        return(
                            <div className="icon" key={index}>
                                <Image src= {url}
                                        alt="icon image"
                                        width={50}
                                        height={50}
                                        sizes="100vw"
                                        style={{
                                        objectFit: "cover"
                                        }}>
                                </Image>
                                <p>{tags[index]}</p>
                            </div>
                        )
                    })
                 }


                    </div>
                 </div>

          </section>
    </div>

    )
}