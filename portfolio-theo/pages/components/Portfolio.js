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
        <h3 className="text-5xl py-1 text-[#595CFF]">Portfolio</h3>
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
        <div className="flex flex-wrap justify-center gap-4 py-5 text-center font-nikea border border-gray-300 rounded-full">
        <a
            href="#"
            onClick={(e) => handleCategoryClick(e, 'All')}
            className="px-4 py-2 uppercase text-[#595CFF] hover:text-[#43447708] text-xl sm:text-2xl"
          >
            All
          </a>
          <a
            href="#"
            onClick={(e) => handleCategoryClick(e, 'Shopify')}
            className="px-4 py-2 uppercase text-[#595CFF] hover:text-[#43447708] text-xl sm:text-2xl"
          >
            Shopify
          </a>
          <a
            href="#"
            onClick={(e) => handleCategoryClick(e, 'Wordpress')}
            className="px-4 py-2 uppercase text-[#595CFF] hover:text-[#43447708] text-xl sm:text-2xl"
          >
            Wordpress
          </a>
          <a
            href="#"
            onClick={(e) => handleCategoryClick(e, 'WIX')}
            className="px-4 py-2 uppercase text-[#595CFF] hover:text-[#43447708] text-xl sm:text-2xl"
          >
            WIX
          </a>
        </div>
      </section>

      <section className="text-center">
        <div className="">
          <PortfolioList filteredItems={filteredItems} />
        </div>
      </section>
    </section>
  );
};

export default Portfolio;