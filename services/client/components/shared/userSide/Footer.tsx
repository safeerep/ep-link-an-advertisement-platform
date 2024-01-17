import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-4">
      <div className="container">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full md:w-1/4 px-4 mb-8 md:mb-0">
            <img
              src=""
              alt="logo"
              className="w-full mb-5"
            />
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
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Cart
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
              <li>
                <a href="" className="text-dark text-decoration-none">
                  Resources
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
      </div>
    </footer>
  );
};

export default Footer;
