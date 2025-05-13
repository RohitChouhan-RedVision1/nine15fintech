"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import styles from './testimonials.module.css';
import Link from "next/link";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Image from "next/image";

export function Testimonials() {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        fetch('/api/testimonials')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                setTestimonials(result);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    function createMarkup(post) {
        return { __html: post };
    }

    return (
        <div className={styles.ourtestimonial}>
            <div className="container mx-auto">
                <div className="grid grid-cols-5">
                    <div className="col-span-2">
                        <div className={styles.testimonialcontent}>
                            <div className="section-title dark-section">
                                <h3 className="wow fadeInUp">Our Testimonial</h3>
                                <h2 className="text-anime-style-2" data-cursor="-opaque">
                                    1250+ Customers Say <span>About Our Finance</span>
                                </h2>
                                <p className="wow fadeInUp" data-wow-delay="0.2s">
                                    With over 1,250 satisfied clients, our finance and consulting services have earned praise for reliability, personalized guidance, and impactful results.
                                </p>
                            </div>
                            <div className="testimonial-btn">
                                <Link href="/contact-us" className="btn-default">Contact Now</Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-span-3">
                        <div className={styles.testimonialsliderbox}>
                            <div className={styles.testimonialslider}>
                                <Swiper
                                    spaceBetween={30}
                                    slidesPerView={1}
                                    autoplay={{
                                        delay: 2000,
                                        disableOnInteraction: false,
                                    }}
                                    modules={[Autoplay]}
                                    loop={true}
                                >
                                    <div className="swiper-wrapper" data-cursor-text="Drag">
                                        {testimonials.map((testimonial, index) => (
                                            <SwiperSlide key={index}>
                                                <div className="testimonial-item">
                                                    <div className={styles.testimonialheader}>
                                                        <div className={styles.customerlogo}>
                                                            <Image
                                                                src="/images/logo.svg"
                                                                alt="logo"
                                                                width={50}
                                                                height={50}
                                                                className="rounded"
                                                            />
                                                        </div>
                                                        <div className={styles.testimonialquotes}>
                                                            <Image src="/images/testimonial-quotes.svg" alt="Quotes" width={50} height={50} />
                                                        </div>
                                                    </div>
                                                    <div className={styles.testimonialbody}>
                                                        <p className="text-xl" dangerouslySetInnerHTML={createMarkup(testimonial.content)}></p>
                                                    </div>
                                                    <div className={styles.testimonialauthor}>
                                                        <div className={styles.authorimage}>
                                                            <figure>
                                                                <Image src={testimonial.image.url} alt={testimonial.authorName} width={100} height={100} />
                                                            </figure>
                                                        </div>
                                                        <div className={styles.authorcontent}>
                                                            <h3>{testimonial.author} / <span>{testimonial.designation}</span></h3>
                                                        </div>
                                                    </div>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </div>
                                    <div className={styles.testimonialpagination}></div>
                                </Swiper>
                            </div>
                            <div className={styles.customerratingboxes}>
                                <div className={styles.customerratingbox}>
                                    <div className={styles.customerratingimage}>
                                        <Image src="/images/icon-google.svg" alt="Google Rating" width={50} height={50} />
                                    </div>
                                    <div className={styles.customerratingcontent}>
                                        <p>Google Rating</p>
                                        <div className={styles.customerratingcounter}>
                                            <h3>5.0</h3>
                                            <div className={styles.customerratingstarbox}>
                                                {[...Array(5)].map((_, i) => (
                                                    <i key={i} className="fa-solid fa-star"></i>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.customerratingbox}>
                                    <div className={styles.customerratingcounter}>
                                        <p>5.0 Rated</p>
                                    </div>
                                    <div className={styles.customerratingstarbox}>
                                        <div className={styles.customerratingstar}>
                                            {[...Array(5)].map((_, i) => (
                                                <i key={i} className="fa-solid fa-star"></i>
                                            ))}
                                        </div>
                                        <div className={styles.starratingimg}>
                                            <Image src="/images/customer-rating-img.svg" alt="Rating" width={50} height={50} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${styles.customerratingbox} ${styles.customerratingcontent}`}>
                                    <p>Total Rating <span>5.0</span> based on 1250+ reviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 