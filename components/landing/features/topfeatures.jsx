'use client';
import styles from './topfeatures.module.css';
import React from 'react';
import { calculators } from '@/data/calculators';
import Image from 'next/image';

const TopFeatures = () => {
    const cardData = [
        {
            animation: "fade-right",
            link: "/tools/download-forms",
            title: 'Download Form',
            images: {
                default: '/images/cloud-file.svg',
                hover: '/images/cloud-file.svg'
            }
        },
        {
            animation: "fade-up",
            link: "/tools/calculators",
            title: 'Financial Calculator',
            images: {
                default: '/images/calculator.svg',
                hover: '/images/calculator.svg'
            }
        },
        {
            animation: "fade-up",
            link: "/tools/financial-health",
            title: 'Financial Health',
            images: {
                default: '/images/medical-report.svg',
                hover: '/images/medical-report.svg'
            }
        },
        {
            link: "/tools/risk-profile",
            animation: "fade-right",
            title: 'Risk Profile',
            images: {
                default: '/images/profile-account.svg',
                hover: '/images/profile-account.svg'
            }
        },
        {
            link: "/tools/pay-premium-online",
            animation: "fade-right",
            title: 'Pay Premium Online',
            images: {
                default: '/images/vip-card.svg',
                hover: '/images/vip-card.svg'
            }
        },
        {
            link: "/tools/useful-links",
            animation: "fade-right",
            title: 'Useful Links',
            images: {
                default: '/images/link.svg',
                hover: '/images/link.svg'
            }
        }
    ];
    return (
        <div className={styles.ourFeature}>
            <div className="container mx-auto">
                <div className="grid-cols-2 section-row align-items-center">
                    <div>
                        <div className="section-title dark-section">
                            <h3 className="wow fadeInUp">Our Feature</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">
                                Key features of our finance <span>and consulting</span>
                            </h2>
                        </div>
                    </div>
                    <div>
                        <div className="section-btn wow fadeInUp" data-wow-delay="0.2s">
                            <a href="contact.html" className="btn-default">Contact Now</a>
                        </div>
                    </div>
                </div>

                <div className={styles.ourFeatureList}>
                    {cardData?.map((item, index) => (
                        <div
                            key={index}
                            className={`${styles.ourFeatureItem} wow fadeInUp`}
                            data-wow-delay={`${index * 0.2}s`}
                        >
                            <div className={styles.iconBox}>
                                <Image src={`images/icon-our-feature-${index + 1}.svg`} alt="Feature Icon" width={200} height={200} layout='response'/>
                            </div>
                            <div className={styles.featureItemContent}>
                                <h3>{item.title}</h3>
                                <p>
                                    Our Financial Solutions offer tailored strategies to meet your unique goals, focusing on growth and risk management.
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.ourFeatureFooter}>
                    <p>
                        <span>Free</span> Let&apos;s make something great work together.{' '}
                        <a href="contact.html">Get Free Quote</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TopFeatures;
