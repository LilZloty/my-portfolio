import Head from "next/head";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { useState, useEffect } from "react";
import Image from "next/image";
import ImageTheo from "../public/images/pfp.png";
import Designicon from "../public/images/designicon.png";
import Techstackicon from "../public/images/techstackicon.png";
import Cmsicon from "../public/images/cmsandothericon.png";
import Services from "../public/images/services.png";
import sakaspirits from "../public/images/sakaspirits.jpg";
import sliimbay from "../public/images/sliimbay.png";
import tinypods from "../public/images/tinypods.png";
import sweetnabbody from "../public/images/sweetnabbody.png";
import mayfurs from "../public/images/mayfursbanner.png";
import anese from "../public/images/sweetnabbody.png";


export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Theo Daudebourg Portfolio</title>
        <meta name="description" content="Theo Daudebourg Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-white px-10 md:px-20 lg:px-40 dark:bg-[#121212] dark:text-white">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="">Theo Daudebourg</h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl"
                />
              </li>
            </ul>
          </nav>
          

          <div className="vitetestbg">
          <div className="mx-auto bg-gradient-to-b from-[#595CFF] rounded-full w-80 h-80 relative overflow-hidden mt-20 md:h-96 md:w-96">
         
            <Image
              src={ImageTheo}
              alt="profilimgtheo"
              layout="fill"
              objectFit="cover"
            />
            </div>
          </div>
        
          
          <div className="text-center p-10 py-10">
            <h2 className="text-2xl py-2 text-[#595CFF] md:text-4xl">
              Theo Daudebourg
            </h2>
            <h3 className="py-2 md:text-1xl hover:animate-bounce">Front End Web Developer</h3>
            <p className="py-5 dark:text-gray-300 ">
              Everyday i develop and design unique brands on
              <b> Shopify</b>.
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 PY-3 text-gray-600 dark:text-gray-300">
            <a href="https://www.linkedin.com/in/th%C3%A9o-daudebourg-85373a177/?locale=en_US" className="hover:text-[#595CFF]"><AiFillLinkedin /></a>
            <a href="https://www.youtube.com/channel/UChH_oneD9OKdCK-ChHFz-2w" className="hover:text-[#595CFF]"><AiFillYoutube /></a>
          </div>
          <div class="flex flex-col justify-center items-center py-10 leading-8">
            <button className="">
              <a
                className="animate-pulse bg-gradient-to-r from-[#595CFF] to-[#C6F8FF] text-white px-10 py-2 rounded-md border-none font-nikea"
                href="#"
              >

                Contact me
              </a>
            </button>
          </div>
        </section>
        <section className="text-center">
          <div className="py-10">
            <hr class="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700 "></hr>
            <h2 className="text-3xl text-[#595CFF]">a brief summary <br></br>of my experience</h2>
            <p className="text-md py-2 leading-8 dark:text-gray-300">
              Since 2017, i <b> design</b> and <b> develop</b>,
              <b> Shopify brands</b>, who are really making <b>sells</b>. <br />
              I work with
              <b> 6-7 figures brands,</b> the <b> top 100 brands</b> on
              <b> Shopify</b> and <b> Shopify Plus</b>.
              <br /> From <b>Developing</b> and
              <b> Designing </b> a theme from scratch to a small
              <b> modification</b> on a<b> button.</b> <br /> Or create a
              <b> full brand identity</b> which will put your <b>brand</b> way
              more far from <b>the others brands.</b> <br /> With her
              <b> unique identity</b>, it easily can bring you,
              <b> more prospects</b> and also<b> more sells</b>. <br />
            </p>
          </div>
        </section>
        <section className="pt-10">
          <div className="lg:flex gap-10">
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white dark:bg-opacity-5 dark:shadow-none dark:text-gray-300">
              <Image alt="" src={Designicon} width={100} height={100} />
              <h2 className="text-lg text-[#595CFF]">
                Beautiful Designs
              </h2>
              <h3 className="py-2 text-xs md:text-sm">
                Which tool i use to design your brand
              </h3>
              <p className="py-1">Suite Adobe - Photoshop - Illustrator </p>
              <p className="py-1">Blender - Cinema 4D</p>
              <p className="py-1"> Figma </p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white dark:bg-opacity-5 dark:shadow-none dark:text-gray-300">
              <Image alt="" src={Techstackicon} width={100} height={100} />
              <h2 className="text-lg text-[#595CFF]">Tech Stack</h2>
              <h3 className="py-2 text-xs md:text-sm">
                What i use to code the desire interface
              </h3>
              <p className="py-1">HTML - CSS/SCSS - Tailwind CSS</p>
              <p className="py-1">Javascript - React JS - Next JS</p>
              <p className="py-1"> JSON - JQUERY - PHP </p>
              <p className="py-1">
                Node JS & MySQL, Liquid
              </p>
            </div>
            <div className="text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white dark:bg-opacity-5 dark:shadow-none dark:text-gray-300">
              <Image alt="" src={Cmsicon} width={100} height={100} />
              <h2 className="text-lg  text-[#595CFF]">
                CMS PLATFORM
              </h2>
              <h3 className="py-2 text-xs md:text-sm">
                Which tool i use to transform my code
              </h3>
              <p className="py-1">Shopify and Shopify Plus</p>
              <p className="py-1">Wordpress & WooCommerce</p>
            </div>
          </div>
        </section>
        <section>
          <div className="text-center py-20">
            <h3 className="text-3xl py-1 text-[#595CFF] ">Portofolio</h3>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-300">
              Since the beginning of my journey as a front-end web developer and designer.<br></br>
              I&apos;ve done remote work for agencies consulted for startups
              and collaborated with talented people to create digital products
              for both business and consumer use.
            </p>
            <p className="text-md py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and e-commerce consulting.
            </p>
          </div>

          <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap">
            <div className="basis-1/3 flex-1">
              <div className="container relative w-full opacity-100">
                <Image
                  className="rounded-lg object-cover shadow-lg"
                  width={"100%"}
                  height={"100%"}
                  layout="responsive"
                  src={sweetnabbody}
                  alt="Sweetnabbody"
                />
                <div className="transition duration-500 ease-in-out rounded-lg h-full w-full opacity-0 shadow-lg shadow-[#595CFF] bg-[#000000eb] dark:bg-[#212121] absolute top-0 bottom-0 right-0 left-0 hover:opacity-100">
                  <div class="text-center h-full w-full">
                    <h2 className="text-[#595CFF] dark:[#595CFF]"><a href="https://sweetnabbody.com/">Sweetnabbody</a></h2>
                    <p className="text-white dark:text-white">A Shopify cosmetic brand <br></br>Designed and developped from scratch</p>
                    <ul className="pt-5 ">
                    <li> <h3 className="text-[#595CFF] dark:[#595CFF]">Theme Development stack</h3><p className="text-white">Liquid, Ajax, Javascript, Shopify </p></li>
                    <li className="pt-2 text-[#595CFF] dark:[#595CFF]"> <h3>Web Design</h3><p className="text-white">Photoshop, Illustrator, Figma, Blender </p></li>
                    </ul>
                    </div>
                </div>
              </div>
            </div>

            <div className="basis-1/3 flex-1">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={sakaspirits}
                alt='sakaspirits'
              />
            </div>
            <div className="basis-1/3 flex-1">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={sweetnabbody}
                alt='sweetnabbody'
              />
            </div>
            <div className="basis-1/3 flex-1">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={mayfurs}
                alt='mayfurs'
              />
            </div>
            <div className="basis-1/3 flex-1">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={tinypods}
                alt='tinypods'
              />
            </div>
            <div className="basis-1/3 flex-1">
              <Image
                className="rounded-lg object-cover"
                width={"100%"}
                height={"100%"}
                layout="responsive"
                src={sliimbay}
                alt='sliimbay'
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
