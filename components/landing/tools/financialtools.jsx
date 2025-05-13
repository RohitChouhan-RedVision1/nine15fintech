'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import SectionHeading from '../sectionHeading'
import styles from './financialtools.module.css'

const FinancialTools = () => {
    const cardData = [
        {
            animation: "fade-right",
            link: "/tools/download-forms",
            title: 'Download Form',
            description: 'Easily download essential forms online, streamlining transactions for a convenient and hassle-free experience.',
            images: {
                default: '/images/cloud-file.svg',
                hover: '/images/cloud-file.svg'
            }
        },
        {
            animation: "fade-up",
            link: "/tools/calculators",
            title: 'Financial Calculator',
            description: 'Assess your risk tolerance and financial profile to customize your investments according to your risk-taking capacity.',
            images: {
                default: '/images/calculator.svg',
                hover: '/images/calculator.svg'
            }
        },
        {
            animation: "fade-up",
            link: "/tools/financial-health",
            title: 'Financial Health',
            description: 'Evaluate your financial well-being with our Financial Health tool. Understand your income, expenses, and investments to create a balanced financial plan that secures your future.',
            images: {
                default: '/images/medical-report.svg',
                hover: '/images/medical-report.svg'
            }
        },
        {
            link: "/tools/risk-profile",
            animation: "fade-right",
            title: 'Risk Profile',
            description: 'Assess your risk tolerance and financial profile to customize your investments according to your risk-taking capacity.',
            images: {
                default: '/images/profile-account.svg',
                hover: '/images/profile-account.svg'
            }
        },
        {
            link: "/tools/pay-premium-online",
            animation: "fade-right",
            title: 'Pay Premium Online',
            description: 'Make premium payments online conveniently, safeguarding your financial well-being at your fingertips.',
            images: { default: '/images/vip-card.svg', hover: '/images/vip-card.svg' }
        },
        {
            link: "/tools/useful-links",
            animation: "fade-right",
            title: 'Useful Links',
            description: 'These links help you make informed decisions and navigate financial processes with ease.',
            images: {
                default: '/images/link.svg',
                hover: '/images/link.svg'
            }
        }

    ];
    return (
        <div className='my-10 mt-20 md:px-1 px-4 py-10 bg-[#006c6e1c]'>
            <div className="relative after:content-[''] after:absolute after:top-0 after:left-0 after:w-xl after:h-xl after:bg-black after:rotate-45">
                <div className="max-w-screen-xl mx-auto">
                    <SectionHeading title="Financial Tools" description="Our Financial Tools" />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-center gap-5 mt-10">
                        {cardData.map((card, index) => (
                            <div className={styles.single_feature_box} key={index}>
                                <div className={styles.single_feature_seven}>
                                    <Link href={card.link}>
                                        <div className={styles.single_feature_six_seven_icon}>
                                            <div className="flex justify-center">
                                                <Image src={card.images.default} alt="tools_icons" width={50} height={50} />
                                            </div>
                                        </div>
                                        <div className={styles.single_feature_seven_content}>
                                            <h4>{card.title}</h4>
                                            <p>{card.description}</p>
                                            <span className="view_more_btn"><i className="fa fa-long-arrow-right"></i></span>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FinancialTools;