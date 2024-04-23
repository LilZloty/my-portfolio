import React from 'react';
import Image from 'next/image';
import { AiFillLinkedin, AiFillYoutube } from 'react-icons/ai';

const Hero = () => {
  return (
    <section className="min-h-screen">
      <div className="md:h-96 md:w-96 mx-auto relative -z-0">
        <section className="img-bg md:h-96 md:w-96 mx-auto absolute dark:linear-gradient(-45deg, #595CFF 50%, #595CFF 50%)">
          {' '}
        </section>
        <div className="mx-auto bg-gradient-to-b from-[#595CFF] rounded-full w-80 h-80 overflow-hidden mt-20 md:h-96 md:w-96 ">
          <Image
            className=""
            src="/images/pfp.png"
            alt="profilimgtheo"
            width={500}
            height={500}
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
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
  );
};

export default Hero;