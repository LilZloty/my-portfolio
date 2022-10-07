import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import Image from "next/image";
import ImageTheo from "../public/pfp.png";


export default function Home() {
  return (
    <div>
      <Head>
        <title>Theo Daudebourg Portfolio</title>
        <meta name="description" content="Theo Daudebourg Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-hite px-10">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="uppercase">Theo Daudebourg</h1>
            <ul className="flex items-center">
              <li className="drop-shadow-lg">
                <BsFillMoonStarsFill className="cursor-pointer text-xl " />
              </li>
              <li className="drop-shadow-lg">
                <a className="bg-gradient-to-r from-[#595CFF] to-[#C6F8FF] text-white px-4 py-2 rounded-md ml-8 font-nikea" href="#">  Resume </a>
              </li>
            </ul>
          </nav>
          <div className="text-center p-10 py-10">
            <h2 className="text-5xl py-2 text-[#595CFF] font-bold">Theo Daudebourg</h2>
            <h3 className="text-2xl py-2 ">Front End Web Developer</h3>
            <p className="py-5 leading-8 text-[#6E6E6E]">
              With an experience in the <b>E-Commerce Industry</b>. <br></br>Everyday i
              <b> Develop</b> and <b>Design</b> unique brands on <b>Shopify</b>.{" "}
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 PY-3 text-gray-600">
            <AiFillLinkedin />
            <AiFillYoutube />
          </div>
          <div className="relative mx-auto bg-gradient-to-b from-[#595CFF] rounded-full w-80 h-80 mt-20 overflow-hidden">
            <Image
              className=""
              src={ImageTheo}
              alt="profilimgtheo"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </section>
        <section className="text-center">
          <div>
            <h3 className="text-3xl py-1 pt-3">Services I offer</h3>
            <p className="text-md py-2 leading-8 text-[#6E6E6E]">
              Since 2017, i <b>Design</b> and <b>Develop</b>, <b>Shopify brands</b>, who
              are really making <b>sells</b>. <br/>
              I work with
              <b> 6-7 figures brands,</b> the <b>top 100 brands</b> on{" "}
              <b>Shopify</b> and <b>Shopify Plus</b>.
              <br/> From <b>Developing</b> and
              <b> Designing </b> a theme from scratch to a small <b>modification</b> on a
              <b> button.</b> <br/> Or create a <b> full brand identity</b> which will put your{" "}
              <b>brand</b> way more far from <b>the others brands.</b>   <br/> With her{" "}
              <b>unique identity</b>, it easily can bring you, <b>more prospects</b> and also<b> more sells</b>. <br/>
    
            </p>
            <h3 className="pt-3 pb-10">Why it will not be your brand?!</h3>
          </div>
        </section>
      </main>
    </div>
  );
}
