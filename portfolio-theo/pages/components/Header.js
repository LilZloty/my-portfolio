import React from 'react';
import { BsFillMoonStarsFill } from 'react-icons/bs';

const Header = ({ darkMode, setDarkMode }) => {
  return (
    <nav className="py-10 mb-12 flex justify-between">
      <h1 className="text-[#202223] dark:text-[#4262b1] ">Theo Daudebourg</h1>
      <ul className="flex items-center">
        <li>
          <BsFillMoonStarsFill
            onClick={() => setDarkMode(!darkMode)}
            className="cursor-pointer text-2xl text-[#202223] dark:text-white"
          />
        </li>
      </ul>
    </nav>
  );
};

export default Header;