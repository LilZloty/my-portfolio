import Head from 'next/head'
import Image from "next/image";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { AiFillLinkedin, AiFillYoutube } from "react-icons/ai";
import { useState, useEffect } from "react";
import AnimatedText from './AnimatedText'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [index, setIndex] = useState(0);
  const [hover, setHover] = useState(false);
  return (
    <div className={darkMode ? "dark" : ""}>
      <Head>
        <title>Theo Daudebourg Portfolio</title>
        <meta name="description" content="Theo Daudebourg Portfolio" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-10 md:px-20 lg:px-40 dark:bg-[#121212f0] dark:text-white py-10">
        <section className="min-h-screen">
          <nav className="py-10 mb-12 flex justify-between">
            <h1 className="text-black dark:text-[#4262b1]">Theo Daudebourg</h1>
            <ul className="flex items-center">
              <li>
                <BsFillMoonStarsFill
                  onClick={() => setDarkMode(!darkMode)}
                  className="cursor-pointer text-2xl text-black dark:text-white"
                />
              </li>
            </ul>
          </nav>
          
          <div className="md:h-96 md:w-96 mx-auto relative -z-0">
           <section className="img-bg md:h-96 md:w-96 mx-auto absolute dark:linear-gradient(-45deg, #595CFF 50%, #595CFF 50%)">  </section>
          <div className="mx-auto bg-gradient-to-b from-[#595CFF] rounded-full w-80 h-80 overflow-hidden mt-20 md:h-96 md:w-96 ">
         
            <Image
              className=""
              src="/images/pfp.png"
              alt="profilimgtheo"
              width={500}
              height={500}/>
            </div>
            
            </div>
          
          <div className="text-center p-10 py-10">
            <h2 className="text-2xl py-2 text-[#595CFF] md:text-4xl">
              Theo Daudebourg
            </h2>
            <h3 className="py-2 md:text-1xl hover:animate-bounce text-black">Front End Web Developer</h3>
            <p className="py-5 text-black dark:text-gray-300 ">
              Everyday i develop and design unique brands on
              <b> Shopify</b> & <b>Wordpress</b>.
            </p>
          </div>
          <div className="text-5xl flex justify-center gap-16 PY-3 text-gray-600 dark:text-gray-300">
            <a href="https://www.linkedin.com/in/theodaudebourg" className="hover:text-[#595CFF] text-black"><AiFillLinkedin /></a>
            <a href="https://www.youtube.com/channel/UChH_oneD9OKdCK-ChHFz-2w" className="hover:text-[#595CFF] text-black "><AiFillYoutube /></a>
          </div>
          <div className="flex flex-col justify-center items-center py-10 leading-8">
            <button className="">
              <a
                className="animate-pulse bg-gradient-to-r from-[#595CFF] to-[#C6F8FF] text-black px-10 py-2 rounded-md border-none font-nikea shadow-md" 
                href="#"
              >

                Contact me
              </a>
            </button>
          </div>
        </section>
        <section className="text-center">
          <div className="py-10">
            <hr className="my-4 mx-auto w-48 h-1 bg-gray-100 rounded border-0 md:my-10 dark:bg-gray-700 "></hr>
            <h2 className="text-3xl text-[#595CFF] pb-5 uppercase">A Brief summary <br></br>of my experience</h2>
            <p className="my-4 text-black mx-auto max-w-2xl"> Since 2017, I've been designing and developing Shopify brands that sell. I have worked and continue to work with 6-7 figure brands including the top 100 brands on Shopify, Shopify Plus, and Wordpress. From the development and design of a theme from scratch up to smaller features.
Or in the creation of an entire brand identity. I was engaged and had to wear multiple hats throughout my career.
            </p>
          </div>
        </section>
        <section className="grid h-auto place-items-center w-auto">
          <div className="lg:flex gap-10">
            
            <div className="glowing text-center shadow-lg p-10 rounded-xl my-10 dark:bg-white dark:bg-opacity-5 dark:shadow-none dark:text-gray-300  barbelssides-bg">
              <Image
                alt="WebDesignicon"
                src="/images/designicon.png"
                width={100}
                height={100}
                 />
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
              <Image
                alt="Technologieicon"
                src="/images/techstackicon.png"
                width={100}
                height={100}
                 />
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
              <Image
                alt="Cmsicon"
                src="/images/cmsicon.png"
                width={100}
                height={100}
                />
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
          </section>
          <section>
          <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap">
          <div className="basis-1/3 flex-1">
                          <div className="container relative w-full">
                    <Image
                      className="rounded-lg object-cover shadow-lg transition-all duration-500 hover:opacity-40"
                      width={300}
                                height={300}
                      src="/images/Sweetnabbody.png"
                      alt="Sweetnabbody"
                    />
                    <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center">
                      <div className="text-center p-4 bg-transparent transition-all duration-500 opacity-0 hover:opacity-100 hover:bg-[#000000eb] hover:dark:bg-[#212121] rounded-lg md:w-full md:h-full md:rounded-lg sm:h-screen flex flex-col items-center justify-center">
                        <h2 className="text-[#595CFF] dark:[#595CFF]">
                          <a href="https://sweetnabbody.com/">Sweetnabbody</a>
                        </h2>
                        <p className="text-black dark:text-white">
                          A Shopify cosmetic brand <br></br>Designed and developed from
                          scratch
                        </p>
                        <ul className="pt-5 ">
                          <li>
                            <h3 className="text-[#595CFF] dark:[#595CFF]">
                              Theme Development stack
                            </h3>
                            <p className="text-black">Liquid, Ajax, Javascript, Shopify </p>
                          </li>
                          <li className="pt-2 text-[#595CFF] dark:[#595CFF]">
                            <h3>Web Design</h3>
                            <p className="text-black">
                              Photoshop, Illustrator, Figma, Blender{" "}
                            </p>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>




                            <div className="basis-1/3 flex-1">
                              <Image
                                className="rounded-lg object-cover"
                                width={300}
                                height={300}
                                alt="sakaspirits"
                                src="/images/sakaspirits.jpg"
                              
                      />
                            </div>
                            <div className="basis-1/3 flex-1">
                              <Image
                                className="rounded-lg object-cover"
                                width={300}
                                height={300}
                                src="/images/Sweetnabbody.png"
                                alt="Sweetnabbody" />
                            </div>
                            <div className="basis-1/3 flex-1">
                              <Image
                                className="rounded-lg object-cover"
                                width={300}
                                height={300}
                                src="/images/mayfursbanner.png"
                                alt="mayfurs"/>
                            </div>
                            <div className="basis-1/3 flex-1">
                              <Image
                                className="rounded-lg object-cover"
                                width={300}
                                height={300}
                                src="/images/Sweetnabbody.png"
                                alt="Sweetnabbody"
                              />
                            </div>
                            <div className="basis-1/3 flex-1">
                              <Image
                                className="rounded-lg object-cover"
                                width={300}
                                height={300}
                                src="/images/sliimbay.png"
                                alt="Sliimbay" 
                                />
                            </div>
                          </div>
        </section>

      </main>
      
<footer className="pt-5 dark:bg-[#121212f0] dark:text-white py-10">
    <div className="mx-auto w-full container p-4 sm:p-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
              <a href="https://flowbite.com/" className="flex items-center">
                  <span className="self-center text-2xl font-nikea whitespace-nowrap text-black dark:text-white">Theo Daudebourg</span>
              </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-black uppercase dark:text-white">Follow me</h2>
                  <ul className="text-black dark:text-gray-400">
                      <li className="mb-4">
                          <a href="https://github.com/LilZloty" className="hover:underline ">Github</a>
                      </li>
                      <li className="mb-4">
                          <a href="https://www.linkedin.com/in/theodaudebourg/" className="hover:underline ">Linkedin</a>
                      </li>
                  </ul>
              </div>
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-black uppercase dark:text-white">Legal</h2>
                  <ul className="text-black dark:text-gray-400">
                      <li className="mb-4">
                          <a href="#" className="hover:underline">Privacy Policy</a>
                      </li>
                      <li>
                          <a href="#" className="hover:underline">Terms and Conditions</a>
                      </li>
                  </ul>
              </div>
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-black sm:text-center dark:text-gray-400">© 2023 <a href="https://theodaudebourg.vercel.app" className="hover:underline">Theo Daudebourg</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
              <a href="https://github.com/LilZloty" className="text-black hover:text-gray-900 dark:hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                  <span className="sr-only">GitHub account</span>
              </a>
              <a href="https://www.linkedin.com/in/theodaudebourg" className="hover:text-[#595CFF] text-black">
                <AiFillLinkedin className='w-5 h-5' />
                </a>
          </div>
      </div>
    </div>
</footer>
    </div>
  );
}
