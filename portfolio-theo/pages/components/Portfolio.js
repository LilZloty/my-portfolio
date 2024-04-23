import React from 'react';
import PortfolioList from './PortfolioList';
import portfolioItems from './PortfolioData';

const Portfolio = ({ selectedCategory, handleCategoryClick }) => {
  const filteredItems = portfolioItems.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <section>
      <div className="text-center py-5">
        <h3 className="text-5xl py-1 text-[#595CFF] ">Portfolio</h3>
        <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-300">
          Since the beginning of my journey as a front-end web developer and
          designer.<br></br>
          I&apos;ve done remote work for agencies consulted for startups and
          collaborated with talented people to create digital products for both
          business and consumer use.
        </p>
        <p className="text-lg py-2 leading-8 text-gray-800 dark:text-gray-200">
          I offer from a wide range of services, including brand design,
          programming and e-commerce consulting.
        </p>
      </div>

      <section className="linkcategory py-10">
        <div className="w-full leading-none border border-gray-300 rounded-full py-5 text-center font-nikea">
          <a
            href="#"
            onClick={(e) => handleCategoryClick(e, 'Shopify')}
            className="mr-4 uppercase  text-[#595CFF] hover:text-[#43447708] text-3xl"
          >
            Shopify
          </a>
          <a
            href="#"
            onClick={(e) => handleCategoryClick(e, 'Wordpress')}
            className="mr-4 uppercase  text-[#595CFF] hover:text-[#43447708] text-3xl"
          >
            Wordpress
          </a>
          <a
            href="#"
            onClick={(e) => handleCategoryClick(e, 'WIX')}
            className="mr-4 uppercase  text-[#595CFF]
            hover:text-[#43447708] text-3xl"
          >
            WIX
          </a>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center ">
        <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap">
          <PortfolioList filteredItems={filteredItems} />
        </div>
      </section>
    </section>
  );
};

export default Portfolio;