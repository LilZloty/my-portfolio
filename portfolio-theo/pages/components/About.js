import React from 'react';

const About = () => {
  return (
    <section className="text-center py-10 grid h-auto place-items-center w-auto ">
      <div className="py-10">
        <hr className="my-4 mx-auto w-48 h-1 bg-blue-100 rounded border-0 md:my-10 dark:bg-gray-700 "></hr>
        <h2 className="text-5xl text-[#595CFF] pb-5 uppercase">
          A Brief summary <br></br>of my experience
        </h2>
        <p className="my-4 text-[#202223] mx-auto max-w-5xl text-lg">
          {' '}
          Since 2017, I've been designing and developing Shopify brands that
          sell.
        </p>
        <p className="my-4 text-[#202223] mx-auto max-w-3xl text-lg">
          I have worked and continue to work with 6-7 figure brands including
          the top 100 brands on Shopify/Plus, Wordpress, Wix, Squarespace and
          more.{' '}
        </p>
        <p className="my-4 text-[#202223] mx-auto max-w-3xl text-lg">
          From the development and design of a theme from scratch up to smaller
          features. Or in the creation of an entire brand identity. I always had
          to wear multiple hats throughout my career and this is something that
          i enjoy.
        </p>
      </div>
    </section>

  );
};

export default About;