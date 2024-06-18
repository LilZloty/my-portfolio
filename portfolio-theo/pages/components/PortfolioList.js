import React from 'react';
import PortfolioStructure from './PortfolioStructure';

const PortfolioList = ({ filteredItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
      {filteredItems.map((item, index) => (
        <PortfolioStructure key={index} {...item} />
      ))}
    </div>
  );
};

export default PortfolioList;