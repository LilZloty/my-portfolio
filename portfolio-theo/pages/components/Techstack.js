import React from 'react';
import Image from 'next/image';

const Techstack = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-40">
      <div className="max-w-md bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden transition duration-100 transform hover:bg-gray-100 hover:shadow-md docs-card">
        <div className="docs-card__body p-12 flex flex-col h-full">
          <div className="docs-card__content flex flex-col items-center text-center">
            <div className="h-32 flex items-center justify-center">
              <Image
                alt="WebDesignicon"
                src="/images/desktopicon.png"
                width={120}
                height={120}
                className="mx-auto"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }}
              />
            </div>
            <h2 className="text-lg text-[#595CFF] mt-6 mb-4">
              Beautiful Designs
            </h2>
            <h3 className="text-xs md:text-sm text-[#202223] mb-4">
              Which tools I use to design your brand
            </h3>
            <div className="mt-auto dark:text-[#202223]">
              <p className="py-1">Suite Adobe - Photoshop - Illustrator</p>
              <p className="py-1">Blender - Cinema 4D</p>
              <p className="py-1">Figma</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden transition duration-100 transform hover:bg-gray-100 hover:shadow-md docs-card">
        <div className="docs-card__body p-12 flex flex-col h-full">
          <div className="docs-card__content flex flex-col items-center text-center">
            <div className="h-32 flex items-center justify-center">
              <Image
                alt="Technologieicon"
                src="/images/techstackiconns.png"
                width={120}
                height={120}
                className="mx-auto"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }}
              />
            </div>
            <h2 className="text-lg text-[#595CFF] mt-6 mb-4">Tech Stack</h2>
            <h3 className="text-xs md:text-sm text-[#202223] mb-4">
              What I use to code the desired interface
            </h3>
            <div className="mt-auto dark:text-[#202223]">
              <p className="py-1">HTML - CSS/SCSS - Tailwind CSS</p>
              <p className="py-1">Javascript - React JS - Next JS</p>
              <p className="py-1">JSON - JQUERY - PHP - AJAX</p>
              <p className="py-1">Node JS - MySQL - Liquid</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-md bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden transition duration-100 transform hover:bg-gray-100 hover:shadow-md docs-card">
        <div className="docs-card__body p-12 flex flex-col h-full">
          <div className="docs-card__content flex flex-col items-center text-center">
            <div className="h-32 flex items-center justify-center">
              <Image
                alt="Cmsicon"
                src="/images/cmsicons.png"
                width={120}
                height={120}
                className="mx-auto"
                style={{
                  maxWidth: "100%",
                  height: "auto"
                }}
              />
            </div>
            <h2 className="text-lg text-[#595CFF] mt-6 mb-4">CMS PLATFORM</h2>
            <h3 className="text-xs md:text-sm text-[#202223] mb-4">
              Which tool I use to transform my code
            </h3>
            <div className="mt-auto dark:text-[#202223]">
              <p className="py-1">Shopify & Shopify Plus</p>
              <p className="py-1">Wordpress & WooCommerce</p>
              <p className="py-1">Wix & Squarespace</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Techstack;