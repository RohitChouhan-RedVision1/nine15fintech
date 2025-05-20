"use client";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { footerData } from "@/data/footer";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import styles from "./Footer.module.css";

const Footer = ({ services, siteData, socialMedia, arnData }) => {
  const iconMap = {
    Facebook: <FaFacebookF className="text-[var(--rv-primary)]" />,
    Instagram: <FaInstagram className="text-[var(--rv-primary)]" />,
    Youtube: <FaYoutube className="text-[var(--rv-primary)]" />,
    Linkedln: <FaLinkedin className="text-[var(--rv-primary)]" />,
    Twitter: <FaXTwitter className="text-[var(--rv-primary)]" />,
  };

  const quicklinks = [
    {
      title: "About us",
      link: "/about-us",
    },
    {
      title: "Contact us",
      link: "/contact-us",
    },
    {
      title: "Financial calculator",
      link: "/tools/calculators",
    },
    {
      title: "Financial health",
      link: "/tools/financial-health",
    },
    {
      title: "Privacy policy",
      link: "/privacy-policy",
    },
    {
      title: "Commission disclosures",
      link: "/commission-disclosures",
    },
    {
      title: "Code of conduct",
      link: "/pdfs/code-of-conduct.pdf",
      download: true,
    },
  ];

  const [mainData, setMainData] = useState(siteData);
  const [usefulLink, setUsefulLink] = useState([]);

  const fetchLinks = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/useful-links?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (res.ok) {
      const data = await res.json();
      setUsefulLink(data);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <footer className={styles.mainFooter}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-1 md:col-span-3">
            <div className={styles.footerNewsletterBox}>
              <Image
                src={"/logo.png"}
                alt="logo"
                width={200}
                height={150}
                className="rounded"
              />
              <p className="mb-6 text-gray-100 py-4">
                Our journey began with a simple promise: to empower every
                individual in India to achieve their financial goals and protect
                what matters most. We know that life&apos;s uncertainties can be
                overwhelming, but with the right guidance and support, you can
                navigate them successfully.
              </p>
            </div>
          </div>

          <div className="col-span-1">
            <div className={styles.footerLinks}>
              <h3>Services</h3>
              <ul>
                {services?.map((sub, index) => (
                  <li className="" key={index}>
                    {!sub.children || sub.children.length === 0 ? (
                      <Link href={`/services/${sub.link}`} target="blank">
                        {sub.name}
                      </Link>
                    ) : (
                      <ul>
                        {sub.children.map((child, childIndex) => (
                          <li key={childIndex}>
                            <Link
                              href={`/services/${child.link}`}
                              target="blank"
                            >
                              {child.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-1">
            <div className={styles.footerLinks}>
              <h3>Quick link</h3>
              <ul>
                {quicklinks.map((sub, index) => (
                  <li key={index}>
                    {sub.download ? (
                      <a
                        href={sub.link}
                        download
                        className="hover:underline text-white"
                      >
                        {sub.title}
                      </a>
                    ) : (
                      <Link href={sub.link} className="hover:underline text-white">
                        {sub.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col-span-1">
            <div className={styles.footerLinks}>
              <h3>Useful link</h3>
              <ul>
                {usefulLink?.map((sub, index) => (
                  <li key={index}>
                    <Link href={sub?.link}>{sub?.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-7">
                        <div className={styles.footerCtaBox}>
                            <div className={styles.footerLogo}>
                                <Image src={"/images/amfi-logo.jpg"} width={80} height={80} alt="amfi" className="rounded" />
                            </div>
                            <div className={styles.footerContactBox}>
                                <div className={styles.footerContactItem}>
                                    <p>Need help?</p>
                                    <h3><Link href={`tel:${mainData?.mobile}`} className="hover:underline ml-3">{mainData?.mobile}</Link> </h3>
                                </div>
                                <div className={styles.footerContactItem}>
                                    <p>Email now</p>
                                    <h3><Link href={`mailto:${mainData?.email}`} className="hover:underline ml-3">
                                            {mainData?.email}
                                        </Link></h3>
                                </div>
                                <div className={styles.footerContactItem}>
                                    <p>ARN</p>
                                    <h3>{arnData[0]?.arn}</h3>
                                </div>
                                <div className={styles.footerContactItem}>
                                    <p>EUIN</p>
                                    <h3>{arnData[0]?.euins[0]?.euin}</h3>
                                </div>
                            </div>
                            <div className="py-3 md:px-1 px-4">
                                <p className=" text-gray-300 text-center">{mainData?.websiteName} is an AMFI Registered Mutual Fund Distributor.</p>
                                <p className=" text-gray-300 text-center">
                                    Disclaimer: Mutual Fund investments are subject to market risks, read all scheme related documents carefully. The NAVs of the schemes may go up or down depending upon the factors and forces affecting the securities market including the fluctuations in the interest rates. The past performance of the mutual funds is not necessarily indicative of future performance of the schemes. The Mutual Fund is not guaranteeing or assuring any dividend under any of the schemes and the same is subject to the availability and adequacy distributable surplus.
                                </p>
                                <p className=" text-gray-300 text-center">
                                    {mainData?.websiteName} makes no warranties or representations, express or implied, on products offered through the platform of {mainData?.websiteName}. It accepts no liability for any damages or losses, however, caused, in connection with the use of, or on the reliance of its product or related services. Terms and conditions of the website are applicable. Investments in Securities markets are subject to market risks, read all the related documents carefully before investing.
                                </p>
                            </div>
                        </div>
                    </div>

        <div className={styles.footerCopyright}>
          <div className={styles.footerCopyrightText}>
            <Link
              target="_blank"
              href="https://www.redvisiontechnologies.com/"
              className="hover:underline me-4 md:me-6"
            >
              <p>Designed & Developed by REDVision Global Technologies</p>
            </Link>
          </div>

          <div className="flex gap-x-3">
            {socialMedia
              .filter((link) => !link.isHidden)
              .map((link, index) => (
                <Link key={index} target="_blank" href={link.url}>
                  <div
                    className={`text-2xl font-semibold uppercase w-9 h-9 border bg-white rounded-full flex items-center justify-center`}
                  >
                    {iconMap[link.title] || (
                      <FaXTwitter className="text-[var(--rv-primary)]" />
                    )}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
