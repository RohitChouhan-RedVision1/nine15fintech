"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import { usePathname } from "next/navigation";
import Image from "next/image";
import axios from "axios";

const Navbar = () => {
  const path = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [showServices, setShowServices] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showNfo, setShowNfo] = useState(false);

  const toggleServices = () => {
    setShowServices((prev) => !prev);
  };
  const toggletools = () => {
    setShowTools((prev) => !prev);
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get("/api/services");
      if (response.status === 200) {
        if (response.data && Array.isArray(response.data)) {
          setServices(response.data);
        } else {
          console.error("Invalid data format:", response.data);
          alert("Failed to fetch services. Please try again.");
        }
      } else {
        console.error("Failed to fetch services:", response.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <div>
      <header
        className={`bg-[var(--dark-color)] border border-[var(--dark-color)] w-full z-50 transition-all duration-300 ${
          isScrolled ? "fixed top-0 shadow-lg" : "relative"
        }`}
      >
        <div className="header-sticky">
          <nav>
            <div className="container mx-auto flex flex-wrap items-center justify-between p-2">
              <Link className="navbar-brand" href="/">
                <Image src="/logo.png" alt="Logo" width={80} height={100} />
              </Link>
              <div className="main-menu" id="navbar-dropdown">
                <div className="nav-menu-wrapper">
                  <ul className="flex flex-col font-medium md:p-0 mt-4 border border-gray-100 rounded-lg md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 ">
                    <li className="nav-item">
                      <Link className="nav-link" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link flex gap-2 items-center text-center" href="#">
                        Services <FaChevronDown className=""/>
                      </Link>
                      <ul>
                        {services.map((subItem, subIndex) => (
                          <li key={subIndex}>
                            {subItem.children.length !== 0 ? (
                              <div className="relative group">
                                <button className="flex items-center justify-between w-full px-4 py-2 hover:bg-gray-300">
                                  {subItem.name}
                                  <svg
                                    className="w-2.5 h-2.5 ms-2.5"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 10 6"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="m1 1 4 4 4-4"
                                    />
                                  </svg>
                                </button>
                                <div className="absolute left-full top-0 hidden group-hover:block bg-white divide-y divide-gray-900 rounded-lg shadow w-60">
                                  <ul className="py-2 text-sm text-gray-600">
                                    {subItem.children.map(
                                      (child, childIndex) => (
                                        <li key={childIndex}>
                                          <Link
                                            href={child.link}
                                            className="block px-4 py-2 hover:bg-gray-300"
                                          >
                                            {child.name}
                                          </Link>
                                        </li>
                                      )
                                    )}
                                  </ul>
                                </div>
                              </div>
                            ) : (
                              <Link
                                href={`/services/${subItem.link}`}
                                className="block px-4 py-2"
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link flex gap-2 items-center text-center" href="#">
                        Tools <FaChevronDown className=""/>
                      </Link>
                      <ul>
                        {/* <li>
                                                    <Link href="/tools/download-forms" className="">
                                                        Download Forms
                                                    </Link>
                                                </li> */}
                        <li>
                          <Link href="/tools/calculators" className="block">
                            Financial Calculators
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/tools/financial-health"
                            className="block"
                          >
                            Financial Health
                          </Link>
                        </li>
                        <li>
                          <Link href="/tools/risk-profile" className="block">
                            Risk Profile
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/tools/pay-premium-online"
                            className="block"
                          >
                            Pay Premium Online
                          </Link>
                        </li>
                        <li>
                          <Link href="/tools/useful-links" className="block">
                            Useful Links
                          </Link>
                        </li>
                      </ul>
                    </li>
                    {/* <li className="nav-item">
                      <Link className="nav-link" href="/blogs">
                        Blogs
                      </Link>
                    </li> */}
                    <li className="nav-item">
                      <Link className="nav-link" href="/about-us">
                        About us
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" href="/contact-us">
                        Contact us
                      </Link>
                    </li>
                    <div className="header-btn flex">
                      <Link
                        href="/login"
                        className="btn-default btn-highlighted"
                      >
                        Login
                      </Link>
                    </div>
                  </ul>
                </div>
              </div>
              <div className="nav-button">
                <button
                  onClick={() => setIsMobileMenuOpen(true)}
                  className="text-[var(--rv-primary)]  bg-[var(--rv-secondary)] p-2"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
              {isMobileMenuOpen && (
                <div className="fixed top-0 right-0 w-64 h-full bg-[var(--rv-primary)] shadow-lg z-[1000] transition-transform duration-300">
                  <div className="flex justify-end p-4">
                    <button onClick={() => setIsMobileMenuOpen(false)}>
                      <svg
                        className="w-6 h-6 text-[var(--rv-third)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <nav className="flex flex-col space-y-4 p-4">
                    <Link className="text-[var(--rv-secondary)]" href="/">
                      Home
                    </Link>

                    {/* Services dropdown toggle */}
                    <button
                      onClick={toggleServices}
                      className="text-left text-[var(--rv-secondary)] font-semibold flex items-center  justify-between "
                    >
                      Services <FaChevronDown className=""/>
                    </button>

                    {/* Dropdown content */}
                    {showServices && (
                      <div className="ml-4 flex flex-col space-y-2  text-sm">
                        {services.map((service, index) => (
                          <Link
                            className="text-[var(--rv-secondary)]"
                            key={index}
                            href={`/services/${service.link}`}
                          >
                            {service.name}
                          </Link>
                        ))}
                      </div>
                    )}

                    <button
                      onClick={toggletools}
                      className="text-left text-[var(--rv-secondary)] font-semibold flex items-center  justify-between "
                    >
                      Tools <FaChevronDown/>
                    </button>

                    {/* Dropdown content */}
                    {showTools && (
                      <div className="flex flex-col space-y-4 text-sm text-[var(--rv-secondary)]">
                        <Link href="/tools/calculators">
                          Financial Calculator
                        </Link>
                        {/* <Link href="/tools/download-forms">
                    Download Forms
                  </Link> */}
                        <Link href="/tools/risk-profile">Risk Profile</Link>
                        <Link href="/tools/financial-health">
                          Financial Health
                        </Link>
                       
                        <Link href="/tools/pay-premium-online">
                          Pay Premium Online
                        </Link>
                         <Link href="/tools/useful-links">Useful Links</Link>
                      </div>
                    )}

                    {/* <button
                onClick={toggleNfo}
                className="text-left text-[var(--rv-secondary)] font-semibold "
              >
                Add on's
              </button>

              {showNfo && (
                <div className="flex flex-col space-y-4 text-sm">
                <Link href="/add-ons/top-funds">Top Funds</Link>
                <Link href="/add-ons/compare-funds">
                  Compare Funds
                </Link>
                <Link href="/add-ons/nfo">NFO</Link>
                <Link href="/">Search Funds</Link>
              </div>
              )} */}

                    {/* <Link className="text-[var(--rv-secondary)]" href="/blogs">
                      Blogs
                    </Link> */}
                    <Link
                      className="text-[var(--rv-secondary)]"
                      href="/about-us"
                    >
                      About Us
                    </Link>
                    <Link
                      className="text-[var(--rv-secondary)]"
                      href="/contact-us"
                    >
                      Contact Us
                    </Link>
                    <Link className="text-[var(--rv-secondary)]" href="/login">
                      Login
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
