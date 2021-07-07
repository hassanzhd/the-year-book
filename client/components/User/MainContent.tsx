import MainContentStyling from "./MainContent.module.scss";
import Image from "next/image";
import NavBar from "@components/NavBar";
import { getStyleString } from "@helpers/utility";

const MainContent = () => {
  return (
    <>
      <NavBar />
      <div className="others flex">
        <button className="btn">&#9776;</button>
      </div>
      <main className={getStyleString(MainContentStyling.profileData, "flex")}>
        <Image
          src="/user.png"
          alt="Picture of the user"
          width="150px"
          height="150px"
        />
        <h1>@hassanzhd</h1>
        <h2>Muhammad Hassan Zahid</h2>
        <h2>Batch: 2018</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
          reiciendis, voluptatem molestias facere illum distinctio veniam
          recusandae laborum tempore quos sed. Quos blanditiis minus culpa quae
          incidunt nesciunt deserunt eum?
        </p>
        <button className="btn">Sign the book</button>
      </main>
      <div
        className={getStyleString(MainContentStyling.signatureHeading, "flex")}
      >
        <h1>Signatures:</h1>
      </div>
      <section className={MainContentStyling.profileSignatures}>
        <div className={MainContentStyling.signature}>
          <h2>23rd December 2021</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic
            expedita, corporis commodi doloribus facere labore, tempore, cum
            corrupti aspernatur cumque quia et? Facere enim ipsum quisquam
            incidunt, odit modi repudiandae nisi voluptas reprehenderit iure
            accusamus obcaecati expedita blanditiis sed voluptatum
            exercitationem quaerat dolor quia quibusdam deleniti quos distinctio
            molestias. Consectetur?
          </p>
        </div>
      </section>
    </>
  );
};

export default MainContent;
