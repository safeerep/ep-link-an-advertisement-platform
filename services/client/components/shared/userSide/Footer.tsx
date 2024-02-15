import Image from 'next/image';
import React from 'react';

const Footer = () => {
  return (
    <>
        <div className="flex flex-wrap p-4 border-t-2 border-black">
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
          <Image src="/brand.png"
          alt='logo'
          width={200} height={200}
          className='mb-5' />
            <ul className="list-none">
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="" className="text-dark text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="" className="text-dark text-decoration-none">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h5 className="text-dark">Quick Links</h5>
            <ul className="list-none">
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Shop
                </a>
              </li>
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Categories
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h5 className="text-dark">Categories</h5>
            <ul className="list-none">
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Legal
                </a>
              </li>
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Company Info
                </a>
              </li>
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Features
                </a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 px-4">
            <h5 className="text-dark">Get in Touch</h5>
            <p className="text-dark">Subscribe to our newsletter for updates:</p>
            <form action="" method="get">
              <div className="mb-3">
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded"
                  placeholder="Enter your email"
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className='bg-slate-900 h-10'>

        </div>
        </>
  );
};

export default Footer;
