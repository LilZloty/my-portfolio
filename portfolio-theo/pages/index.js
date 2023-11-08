import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiFillLinkedin, AiFillYoutube, AiFillGithub } from "react-icons/ai";
import { useState } from "react";
import PortfolioStructure from "./components/PortfolioStructure";
import portfolioItems from "./components/PortfolioData";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategoryClick = (e, category) => {
    e.preventDefault();
    setSelectedCategory(category);
  };

  const filteredItems = portfolioItems.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory
  );

  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Theo Daudebourg Portfolio</title>
        <meta name="description" content="Theo Daudebourg Portfolio" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </Head>
      <main className="px-10 md:px-20 lg:px-40 dark:bg-[#121212f0] dark:text-white py-10">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-[#202223] dark:text-[#4262b1] ">
              Theo Daudebourg
            </h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl text-[#202223] dark:text-white"
                />
              </li>
            </ul>
          </nav>
          <div className="md:h-96 md:w-96 mx-auto relative -z-0">
            <section className="img-bg md:h-96 md:w-96 mx-auto absolute dark:linear-gradient(-45deg, #595CFF 50%, #595CFF 50%)">
              {" "}
            </section>
            <div className="mx-auto bg-gradient-to-b from-[#595CFF] rounded-full w-80 h-80 overflow-hidden mt-20 md:h-96 md:w-96 ">
              <Image
                className=""
                src="/images/pfp.png"
                alt="profilimgtheo"
                width={500}
                height={500}
              />
            </div>
          </div>

          <div className="text-center py-10">
            <h2 className="text-5xl py-5 text-[#595CFF] md:text-4xl">
              Theo Daudebourg
            </h2>
            <h3 className="text-3xl py-2 md:text-1xl hover:animate-bounce text-[#202223]">
              Front End Web Developer
            </h3>
            <p className="py-5 text-[#202223] dark:text-gray-300 ">
              Everyday i develop and design unique brands on
              <b> Shopify</b> & <b>Wordpress</b>.
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 PY-3 text-gray-600 dark:text-gray-300">
            <a
              href="https://www.linkedin.com/in/theodaudebourg"
              className="hover:text-[#595CFF] text-[#202223]"
            >
              <AiFillLinkedin />
            </a>
            <a
              href="https://www.youtube.com/channel/UChH_oneD9OKdCK-ChHFz-2w"
              className="hover:text-[#595CFF] text-[#202223] "
            >
              <AiFillYoutube />
            </a>
          </div>
          <div className="flex flex-col justify-center items-center py-10 leading-8">
            <button className="">
              <a
                className="animate-pulse bg-gradient-to-r from-[#595CFF] to-[#C6F8FF] text-[#202223] px-10 py-2 rounded-md border-none font-nikea shadow-md"
                href="#"
              >
                Contact me
              </a>
            </button>
          </div>
        </section>
        <section className="text-center py-10 grid h-auto place-items-center w-auto pb-40 ">
          <div className="py-10">
            <hr className="my-4 mx-auto w-48 h-1 bg-blue-100 rounded border-0 md:my-10 dark:bg-gray-700 "></hr>
            <h2 className="text-5xl text-[#595CFF] pb-5 uppercase">
              A Brief summary <br></br>of my experience
            </h2>
            <p className="my-4 text-[#202223] mx-auto max-w-5xl text-lg">
              {" "}
              Since 2017, I've been designing and developing Shopify brands that
              sell.
            </p>
            <p className="my-4 text-[#202223] mx-auto max-w-3xl text-lg">
              I have worked and continue to work with 6-7 figure brands
              including the top 100 brands on Shopify/Plus, Wordpress, Wix,
              Squarespace and more.{" "}
            </p>
            <p className="my-4 text-[#202223] mx-auto max-w-3xl text-lg">
              From the development and design of a theme from scratch up to
              smaller features. Or in the creation of an entire brand identity.
              I always had to wear multiple hats throughout my career and this
              is something that i enjoy.
            </p>
          </div>
          <div className="lg:flex gap-10">
            <div className="max-w-md bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden transition duration-100 transform hover:bg-gray-100 hover:shadow-md docs-card">
              <div className="docs-card__body p-12 flex items-center">
                <div className="docs-icon docs-icon--32 docs-icon--pickaxe"></div>
                <div className="docs-card__content ml-4 flex flex-col items-center text-center">
                  <Image
                    alt="WebDesignicon"
                    src="/images/desktopicon.png"
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                  <h2 className="text-lg text-[#595CFF] mt-2">
                    Beautiful Designs
                  </h2>
                  <h3 className="py-2 text-xs md:text-sm text-[#202223]">
                    Which tools I use to design your brand
                  </h3>
                  <p className="py-1">Suite Adobe - Photoshop - Illustrator</p>
                  <p className="py-1">Blender - Cinema 4D</p>
                  <p className="py-1">Figma</p>
                </div>
              </div>
            </div>

            <div className="max-w-md bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden transition duration-100 transform hover:bg-gray-100 hover:shadow-md docs-card">
              <div className="docs-card__body p-12 flex items-center">
                <div className="docs-icon docs-icon--32 docs-icon--pickaxe"></div>
                <div className="docs-card__content ml-4 flex flex-col items-center text-center">
                  <Image
                    alt="Technologieicon"
                    src="/images/techstackiconns.png"
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                  <h2 className="text-lg text-[#595CFF] mt-2">Tech Stack</h2>
                  <h3 className="py-2 text-xs md:text-sm text-[#202223]">
                    What I use to code the desired interface
                  </h3>
                  <p className="py-1">HTML - CSS/SCSS - Tailwind CSS</p>
                  <p className="py-1">Javascript - React JS - Next JS</p>
                  <p className="py-1">JSON - JQUERY - PHP - AJAX</p>
                  <p className="py-1">Node JS - MySQL - Liquid</p>
                </div>
              </div>
            </div>

            <div className="max-w-md bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden transition duration-100 transform hover:bg-gray-100 hover:shadow-md docs-card">
              <div className="docs-card__body p-12 flex items-center">
                <div className="docs-icon docs-icon--32 docs-icon--pickaxe"></div>
                <div className="docs-card__content ml-4 flex flex-col items-center text-center">
                  <Image
                    alt="Cmsicon"
                    src="/images/cmsicons.png"
                    width={120}
                    height={120}
                    className="mx-auto"
                  />
                  <h2 className="text-lg text-[#595CFF] mt-2">CMS PLATFORM</h2>
                  <h3 className="py-2 text-xs md:text-sm text-[#202223]">
                    Which tool I use to transform my code
                  </h3>
                  <p className="py-1">Shopify & Shopify Plus</p>
                  <p className="py-1">Wordpress & WooCommerce</p>
                  <p className="py-1">Wix & Squarespace</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="text-center py-5">
            <h3 className="text-5xl py-1 text-[#595CFF] ">Portfolio</h3>
            <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-300">
              Since the beginning of my journey as a front-end web developer and
              designer.<br></br>
              I&apos;ve done remote work for agencies consulted for startups and
              collaborated with talented people to create digital products for
              both business and consumer use.
            </p>
            <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
              I offer from a wide range of services, including brand design,
              programming and e-commerce consulting.
            </p>
          </div>
        </section>

        <section className="linkcategory py-10">
          <div className="w-full leading-none border border-gray-300 rounded-full py-5 text-center font-nikea">
            <a
              href="#"
              onClick={(e) => handleCategoryClick(e, "Shopify")}
              className="mr-4 uppercase  text-[#595CFF] hover:text-[#43447708] text-3xl"
            >
              Shopify
            </a>
            <a
              href="#"
              onClick={(e) => handleCategoryClick(e, "Wordpress")}
              className="mr-4 uppercase  text-[#595CFF] hover:text-[#43447708] text-3xl"
            >
              Wordpress
            </a>
            <a
              href="#"
              onClick={(e) => handleCategoryClick(e, "WIX")}
              className="mr-4 uppercase  text-[#595CFF] hover:text-[#43447708] text-3xl"
            >
              WIX
            </a>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center ">
          <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap">
            {filteredItems.map((item, index) => (
              <PortfolioStructure key={index} {...item} />
            ))}
          </div>
        </section>
      </main>

      <footer className="pt-5 dark:bg-[#121212f0] dark:text-white py-10">
        <div className="mx-auto w-full container p-4 sm:p-6">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="" className="flex items-center">
                <span className="self-center text-2xl font-nikea whitespace-nowrap text-[#202223] dark:text-white">
                  Theo Daudebourg
                </span>
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-[#202223] uppercase dark:text-white">
                  Follow me
                </h2>
                <ul className="text-[#202223] dark:text-gray-400">
                  <li className="mb-4">
                    <a
                      href="https://github.com/LilZloty"
                      className="hover:underline "
                    >
                      Github
                    </a>
                  </li>
                  <li className="mb-4">
                    <a
                      href="https://www.Linkedin.com/in/theodaudebourg/"
                      className="hover:underline "
                    >
                      Linkedin
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-[#202223] uppercase dark:text-white">
                  Legal
                </h2>
                <ul className="text-[#202223] dark:text-gray-400">
                  <li className="mb-4">
                    <a href="#" className="hover:underline">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Terms and Conditions
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-[#202223] sm:text-center dark:text-gray-400">
              © 2023
              <a
                href="https://theodaudebourg.vercel.app"
                className="hover:underline"
              >
                Theo Daudebourg
              </a>
              . All Rights Reserved.
            </span>
            <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a href="https://github.com/LilZloty" className="">
                <span className="w-5 h-5">
                  {" "}
                  <AiFillGithub />{" "}
                </span>
              </a>
              <a
                href="https://www.Linkedin.com/in/theodaudebourg"
                className="hover:text-[#595CFF] text-[#202223]"
              >
                <p className="w-5 h-5">
                  {" "}
                  <AiFillLinkedin />{" "}
                </p>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
