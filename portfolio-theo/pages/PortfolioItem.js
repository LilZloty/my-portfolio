import Image from 'next/image';
import React from 'react';

export default function PortfolioItem({ title, imageSrc, altText, description, link, technologies }) {
  return (
    <div className="basis-1/3 flex-1">
      <div className="container relative w-full">
      <div className="image-container">
        <Image
          className="rounded-lg object-cover shadow-lg transition-all duration-500 hover:opacity-40"
          width={500}
          height={500}
          src={imageSrc}
          alt={altText}
        /></div>
        <div className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-center information-tab">
          <div className="text-center p-4 bg-transparent transition-all duration-500 opacity-0 hover:opacity-100 hover:bg-[#000000eb] hover:dark:bg-[#212121] rounded-lg md:w-full md:h-full md:rounded-lg sm:h-screen flex flex-col items-center justify-center">
            <h2 className="text-[#595CFF] dark:[#595CFF] text-2xl">
              <a href={link}>{title}</a>
            </h2>
            <p className="text-white dark:text-white pb-8">{description}</p>
            <h3 className="text-[#595CFF] dark:[#595CFF] font-size">Theme Development stack</h3>
            <ul className="pb-5">
              {technologies.map((tech, techIndex) => (
                <li key={techIndex}>
                  <p className="text-white">{tech}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}