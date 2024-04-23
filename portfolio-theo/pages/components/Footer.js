import React from 'react';
import { AiFillLinkedin, AiFillGithub } from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className="pt-5 dark:bg-[#121212f0] dark:text-white py-10">
      <div className="mx-auto w-full container p-4 sm:p-6">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <a href="" className="flex items-center">
              <span className="self-center text-2xl font-nikea whitespace-nowrap text-[#202223] dark:text-white">
                Theo Daudebourg
              </span>
            </a>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[#202223] uppercase dark:text-white">
                Follow me
              </h2>
              <ul className="text-[#202223] dark:text-gray-400">
                <li className="mb-4">
                  <a
                    href="https://github.com/LilZloty"
                    className="hover:underline "
                  >
                    Github
                  </a>
                </li>
                <li className="mb-4">
                  <a
                    href="https://www.Linkedin.com/in/theodaudebourg/"
                    className="hover:underline "
                  >
                    Linkedin
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h2 className="mb-6 text-sm font-semibold text-[#202223] uppercase dark:text-white">
                Legal
              </h2>
              <ul className="text-[#202223] dark:text-gray-400">
                <li className="mb-4">
                  <a href="#" className="hover:underline">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Terms and Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-[#202223] sm:text-center dark:text-gray-400">
            © 2023
            <a
              href="https://theodaudebourg.vercel.app"
              className="hover:underline"
            >
              Theo Daudebourg
            </a>
            . All Rights Reserved.
          </span>
          <div className="flex mt-4 space-x-6 sm:justify-center sm:mt-0">
            <a href="https://github.com/LilZloty" className="">
              <span className="w-5 h-5">
                {' '}
                <AiFillGithub />{' '}
              </span>
            </a>
            <a
              href="https://www.Linkedin.com/in/theodaudebourg"
              className="hover:text-[#595CFF] text-[#202223]"
            >
              <p className="w-5 h-5">
                {' '}
                <AiFillLinkedin />{' '}
              </p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;