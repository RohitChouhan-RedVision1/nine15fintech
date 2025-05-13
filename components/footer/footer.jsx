"use client";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { footerData } from "@/data/footer";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";
import styles from './Footer.module.css'

const Footer = () => {
    const quicklinks = [
        {
            title: "About Us",
            link: "/about-us"
        },
        {
            title: "Contact Us",
            link: "/contact-us"
        },
        // {
        //     title: "Blogs",
        //     link: "/blogs"
        // },
        // {
        //     title: "Download Forms",
        //     link: "/tools/download-forms"
        // },
        {
            title: "Financial Calculator",
            link: "/tools/calculators"
        },
        {
            title: "Financial Health",
            link: "/tools/financial-health"
        },
        {
            title: "Privacy Policy",
            link: "/privacy-policy"
        },
        {
            title: "Commission Disclosures",
            link: "/commission-disclosures"
        },
    ]
    const [mainData, setMainData] = useState("");
    const [usefulLink, setUsefulLink] = useState([]);
    const [services, setServices] = useState([]);
    const fetchdata = async () => {
        const data = await fetch("/api/admin/site-settings", { cache: "force-cache" });
        if (data.ok) {
            const maindata = await data.json();
            setMainData(maindata[0])
        }
    };
    const fetchservice = async () => {
        const res = await fetch("/api/services");
        if (res.ok) {
            const data = await res.json();
            setServices(data)
        }
    };
    const fetchLinks = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/useful-links?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
        if (res.ok) {
            const data = await res.json();
            setUsefulLink(data)
        }
    };
    useEffect(() => { fetchservice(); }, []);
    useEffect(() => { fetchLinks(); }, []);
    useEffect(() => { fetchdata(); }, []);
    // console.log(mainData)
    return (
        <footer className={styles.mainFooter}>
            <div class="container mx-auto">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <div class="col-span-1 md:col-span-3">
                        <div className={styles.footerNewsletterBox}>
                            <Image
                                src={"/logo.png"}
                                alt="logo"
                                width={120}
                                height={150}
                                className="rounded"
                            />
                            <p className="mb-6 text-gray-100 py-4">Our journey began with a simple promise: to empower every individual in India to achieve their financial goals and protect what matters most. We know that life&apos;s uncertainties can be overwhelming, but with the right guidance and support, you can navigate them successfully.</p>
                            {/* <div className={styles.footerNewsletterTitle}>
                                <h3>Don&apos;t missed subscribed!</h3>
                            </div>
                            <div className={styles.newsletterForm}>
                                <form id="newsletterForm" action="#" method="POST">
                                    <div className={styles.formGroup}>
                                        <input type="email" name="email" className={styles.formControl} id="mail" placeholder="Enter Your Email" required="" />
                                        <button type="submit" className={styles.newsletterBtn}>
                                            <Image src="/images/arrow-white.svg" alt="Subscribe" width={40} height={20} />
                                        </button>
                                    </div>
                                </form>
                            </div> */}
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className={styles.footerLinks}>
                            <h3>Services</h3>
                            <ul>
                                {services?.map((sub, index) => (
                                    <li className="mb-5" key={index}>
                                        {!sub.children || sub.children.length === 0 ? (
                                            <Link href={sub.link} target="blank"><p>{sub.name}</p></Link>
                                        ) : (
                                            <ul className="">
                                                {sub.children.map((child, childIndex) => (
                                                    <li key={childIndex} className="mb-1">
                                                        <Link href={child.link} target="blank">
                                                            <p>{child.name}</p>
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
                            <h3>Quick Links</h3>
                            <ul>
                                {quicklinks?.map((sub, index) => (
                                    <li key={index}>
                                        <Link href={sub?.link}>{sub?.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="col-span-1">
                        <div className={styles.footerLinks}>
                            <h3>Usefull Link</h3>
                            <ul>
                                {usefulLink?.map((sub, index) => (
                                    <li key={index}><Link href={sub?.link}>{sub?.title}</Link></li>
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
                                    <p>Need Help?</p>
                                    <h3>{mainData?.mobile}</h3>
                                </div>
                                <div className={styles.footerContactItem}>
                                    <p>Email Now</p>
                                    <h3>{mainData?.email}</h3>
                                </div>
                                <div className={styles.footerContactItem}>
                                    <p>ARN</p>
                                    <h3>{mainData?.arn}</h3>
                                </div>
                                <div className={styles.footerContactItem}>
                                    <p>EUIN</p>
                                    <h3>{mainData?.euin}</h3>
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
                                <Link target="_blank" href="https://www.redvisiontechnologies.com/" className="hover:underline me-4 md:me-6"><p>Designed & Developed by REDVision global technology</p></Link>
                            </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;