import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import {AiFillLinkedin, AiFillYoutube} from 'react-icons/ai';
import Image from "next/image";
import imgtheo from '../public/profilportfoliowebww.png';

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
            <h1 className="text-xl font-generalsansbold uppercase">
              Developed by Theo Daudebourg
            </h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill className="cursor-pointer text-xl" />
              </li>
              <li>
                <a
                  className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white px-4 py-2 rounded-md ml-8"
                  href="#"
                >
                  Resume
                </a>
              </li>
            </ul>
          </nav>
          <div className="text-center p-10 py-10">
            <h2 className="text-5xl py-2 text-teal-600 font-medium">Theo Daudebourg</h2>
            <h3 className="text-2xl py-2 ">Front End Web Developer</h3>
            <p className="text-md py-5 leading-8 text-gray-800">With an experience in the E-Commerce Industry. <br></br>Everyday i develop and design unique brands on Shopify and also Wordpress.   </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 PY-3 text-gray-600">
          <AiFillLinkedin/>
          <AiFillYoutube/>
          </div>
          <div className="flex justify-center py-4">
          <Image className="rounded-full" src={imgtheo}/>
          </div>
        </section>
      </main>
    </div>
  );
}
