"use client"
import AboutSection from '@/components/landing/about-us/aboutus';
import Image from 'next/image';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import styles from './about.module.css'

export default function AboutUs() {
    return (
        <section className="">
            <div className="page-header">
                <div className="container mx-auto">
                    <div className="items-center">
                        <div className="page-header-box">
                            <h1 className="text-anime-style-2" data-cursor="-opaque">About us</h1>
                            <Breadcrumb>
                                <BreadcrumbList className="text-white">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>About Us</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <AboutSection />
            <div className="our-approach ">
                <div className="container mx-auto ">
                    <div className='py-[60px]'>
                        <div className="grid grid-cols-2 section-row items-center">
                        <div>
                            <div className="section-title">
                                <h3 className="wow fadeInUp">our approach</h3>
                                <h2 className="wow fadeInUp" data-wow-delay="0.2s">Customized strategies for <span>financial success</span></h2>
                            </div>
                        </div>
                        <div>
                            <div className="section-btn wow fadeInUp" data-wow-delay="0.2s">
                                <a href="contact.html" className="btn-default">Contact now</a>
                            </div>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-3">
                        <div className="col-lg-4 col-md-6">
                            <div className={styles.missionVissionItem}>
                                <div className={styles.missionVissionHeader}>
                                    <div className={styles.iconBox}>
                                        <Image src="/images/icon-our-mission.svg" alt="Our Mission Icon" layout='responsive' width={64} height={64} />
                                    </div>
                                    <div className={styles.missionVissionContent}>
                                        <h3>our mission</h3>
                                        <p>Empowering clients with tailored financial strategies for sustainable growth.</p>
                                    </div>
                                </div>
                                <div className={styles.missionVissionImageclass}>
                                    <figure className="image-anime">
                                        <Image src="/images/our-value-img.jpg" alt="Our Value Image" layout='responsive' width={300} height={200} />
                                    </figure>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className={styles.missionVissionItem}>
                                <div className={styles.missionVissionHeader}>
                                    <div className={styles.iconBox}>
                                        <Image src="/images/icon-our-vision.svg" alt="Our Vision Icon" layout='responsive' width={64} height={64} />
                                    </div>
                                    <div className={styles.missionVissionContent}>
                                        <h3>our vision</h3>
                                        <p>Empowering clients with tailored financial strategies for sustainable growth.</p>
                                    </div>
                                </div>
                                <div className={styles.missionVissionImageclass}>
                                    <figure className="image-anime">
                                        <Image src="/images/our-value-img.jpg" alt="Our Value Image" layout='responsive' width={300} height={200} />
                                    </figure>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className={styles.missionVissionItem}>
                                <div className={styles.missionVissionHeader}>
                                    <div className={styles.iconBox}>
                                        <Image src="/images/icon-our-value.svg" alt="Our Value Icon" layout='responsive' width={64} height={64} />
                                    </div>
                                    <div className={styles.missionVissionContent}>
                                        <h3>our value</h3>
                                        <p>Empowering clients with tailored financial strategies for sustainable growth.</p>
                                    </div>
                                </div>
                                <div className={styles.missionVissionImageclass}>
                                    <figure className="image-anime">
                                        <Image src="/images/our-value-img.jpg" alt="Our Value Image" layout='responsive' width={300} height={200} />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </section >
    )
}
