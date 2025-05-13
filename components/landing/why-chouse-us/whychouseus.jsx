'use client'
import Image from 'next/image'
import React from 'react'
import styles from './WhyChooseUs.module.css'
import { CircleArrowLeft } from 'lucide-react'

const WhyChooseUs = () => {
    const data = [
        {
            title: "Deep Industry Experience",
            description: "6+ years of industry expertise, crafting winning strategies in Mutual Funds and Commercial Insurance. Your financial security, our priority. Choose experience, choose us."
        },
        {
            title: "Consulting Expertise",
            description: "Service over sales defines us. Our consulting respects your time – we connect only when it suits you, ensuring no disruptions. Your convenience, our commitment."
        },
    ]
    return (
        <div className={styles.whyChooseUs}>
            <div className="container mx-auto">
                <div className="grid grid-cols-2 items-center">
                    <div className="col-lg-6">
                        <div className={styles.whyChooseContent}>
                            <div className="section-title">
                                <h3 className="wow fadeInUp">Why Choose Us</h3>
                                <h2 className="text-anime-style-2" data-cursor="-opaque">Why trust us <span>our finances</span></h2>
                            </div>
                            <div className={styles.whyChooseBoxList} data-aos="fade-up" data-aos-anchor-placement="bottom" >
                                {data.map((item, index) => (
                                    <div key={index} className={`${styles.whyChooseBox} wow fadeInUp`} data-wow-delay={`${0.2 * (index + 1)}s`}>
                                        <div className={styles.iconBox}>
                                            <Image src={`/images/icon-why-choose-${index + 1}.svg`} alt="" width={50} height={50} />
                                        </div>
                                        <div className={styles.whyChooseBoxContent}>
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={`${styles.whyChooseList}`} data-aos="fade-up" data-aos-anchor-placement="bottom" >
                                <ul>
                                    <li className='flex items-center justify-center gap-x-3'><span><CircleArrowLeft color='var(--accent-color)' /></span> Strategic Financial Planning</li>
                                    <li className='flex items-center justify-center gap-x-3'><span><CircleArrowLeft color='var(--accent-color)'/></span> Expert Investment Advisory</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className={styles.whyChooseImage}>
                            <div className={styles.whyChooseImg1} data-aos="fade-left" data-aos-anchor-placement="bottom-center" >
                                <figure className="image-anime">
                                    <Image src="/images/why-choose-img-1.jpg" alt="" width={500} height={300} />
                                </figure>
                            </div>
                            <div className={styles.whyChooseImg2} data-aos="fade-left" data-aos-anchor-placement="bottom" >
                                <figure className="image-anime">
                                    <Image src="/images/why-choose-img-2.jpg" alt="" width={500} height={300} />
                                </figure>
                            </div>
                            <div className={styles.whyChooseContactCircle}>
                                <Image src="/images/contact-us-img.svg" alt="" width={100} height={100} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WhyChooseUs;