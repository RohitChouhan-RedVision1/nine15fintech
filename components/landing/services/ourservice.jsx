'use client'
import styles from './ourservice.module.css'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import SectionHeading from '../sectionHeading';
import Image from 'next/image';
import Link from 'next/link';

const OurServices = () => {
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/services',);
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
        <div className={styles.ourServices} id='services'>
            <div class="container mx-auto">
                <div class="grid grid-cols-5">
                    <div class="col-span-2">
                        <div className={styles.ourServiceContent}>
                            <div class="section-title">
                                <h3 class="text-anime-style-1">services</h3>
                                <h2 class="text-anime-style-2" data-cursor="-opaque">Expert finance & consult services <span>for success</span></h2>
                            </div>
                            <div className={styles.serviceContentBtn} data-aos="fade-up" data-aos-anchor-placement="bottom" >
                                <Link href="#services" class="btn-default">all services</Link>
                            </div>
                        </div>
                    </div>

                    <div class="col-span-3">
                        <div className={styles.ourServiceList}>
                            {services?.map((item, index) => (
                                <div className={styles.serviceItem} key={index}>
                                    <div className={styles.serviceNo}>
                                        <h2>0{index + 1}</h2>
                                    </div>
                                    <div className={styles.serviceContentBox}>
                                        <div className={styles.iconBox}>
                                            <img src={`/images/${item.imageSrc}`} alt="" />
                                        </div>

                                        <div className={styles.serviceItemContent}>
                                            <h3>{item.name}</h3>
                                            <p className=''>{item.description.slice(0, 150)}...</p>
                                            <Link href={`/services/${item.link}`} className={styles.serviceBtn}><img src="/images/arrow-white.svg" alt="" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className={styles.serviceFooter} data-wow-delay="0.8s">
                            <p>Let&apos;s make something great work together. <Link href="/contact-us">Get Free Quote</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurServices;
