import { CircleArrowLeft } from "lucide-react";
import Image from "next/image";
import { IoArrowUpCircle } from "react-icons/io5";

export default function WhatWeDo() {
    return (
        <div class="what-we-do">
            <div class="container mx-auto">
                <div class="grid grid-cols-2 align-items-center">
                    <div class="col-lg-6">
                        <div class="what-we-do-content">
                            <div class="section-title">
                                <h3 class="wow fadeInUp">what we do</h3>
                                <h2 class="text-anime-style-2" data-cursor="-opaque">Driving financial growth <span>and success</span></h2>
                                <p class="wow fadeInUp" data-wow-delay="0.2s">We provide expert financial and consulting solutions designed to foster growth, stability, and long-term success.</p>
                            </div>

                            <div class="what-we-do-list wow fadeInUp" data-wow-delay="0.4s">
                                <ul>
                                    <li><CircleArrowLeft color='var(--accent-color)' />strategic financial planning</li>
                                    <li><CircleArrowLeft color='var(--accent-color)' />expert investment advisory</li>
                                    <li><CircleArrowLeft color='var(--accent-color)' />risk assessment & mitigation</li>
                                    <li><CircleArrowLeft color='var(--accent-color)' />retirement & future planning</li>
                                </ul>
                            </div>

                            <div class="what-we-do-btn wow fadeInUp" data-wow-delay="0.6s">
                                <a href="contact.html" class="btn-default">contact now</a>
                            </div>
                        </div>
                    </div>

                    <div class="col-lg-6">
                        <div class="what-we-do-images">
                            <div class="what-do-we-img-1">
                                <figure class="image-anime">
                                    <Image src="/images/what-we-do-img-1.jpg" alt="what we do" width={500} height={300} layout="responsive" />
                                </figure>
                            </div>

                            <div class="what-do-we-img-2">
                                <figure class="image-anime">
                                    <Image src="/images/what-we-do-img-2.jpg" alt="what we do" width={500} height={300} layout="responsive" />
                                </figure>
                            </div>

                            <div class="experience-counter-box">
                                <div class="experience-counter-no">
                                    <h2><span class="counter">25</span>+</h2>
                                </div>
                                <div class="experience-counter-content">
                                    <p>Years of experience in finance</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}