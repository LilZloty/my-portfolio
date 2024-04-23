import React from 'react';
import PortfolioStructure from './PortfolioStructure';

const PortfolioList = ({ filteredItems }) => {
  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:flex-wrap">
      {filteredItems.map((item, index) => (
        <PortfolioStructure key={index} {...item} />
      ))}
    </div>
  );
};

export default PortfolioList;