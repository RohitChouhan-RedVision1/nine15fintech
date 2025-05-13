"use client"
import React, { useEffect } from "react";
import Homepage from "@/components/landing/hero-section/heroSection";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import FinancialTool from "@/components/landing/tools/financialtools";
import AboutUs from "@/components/landing/about-us/aboutus";
import SubscribCard from "@/components/landing/subscribcard";
import Tickers from "@/components/landing/tickers/tickers";
import EmiCalculator from "@/components/landing/emicalculatort";
import WhyChouseUs from "@/components/landing/why-chouse-us/whychouseus";

import { CarouselSpacing, Testimonials } from "@/components/landing/testimonials/testimonials";
import TopFeatures from "@/components/landing/features/topfeatures";
import OurServices from "@/components/landing/services/ourservice";
import { OurPosts } from "@/components/landing/our-blogs/ourposts";
import FaqSection from "@/components/landing/faqsection";
import FactsSection from "@/components/landing/facts/facts";
import WhatWeDo from "@/components/landing/what-we-do/whatwedo";
import HowWork from "@/components/landing/how-work/howwork";
import ContactUs from '@/components/landing/contactSection/contactSection';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import '@/lib/ScrollSmoother'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
import SplitType from 'split-type';
import FeaturesSection from "@/components/landing/featuresSection/featuresSection";

gsap.registerPlugin(ScrollTrigger);

export default function Page({ children }) {
    useEffect(() => {
        AOS.init({
            duration: 1000, // Animation duration (in ms)
            easing: "ease-in-out", // Easing type
            once: true, // Trigger animation only once
            mirror: false, // No repeat on scroll up
        });
    }, []);

    useEffect(() => {
        const animateText = (selector, options) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element) => {
                const splitText = new SplitType(element, { types: "words, chars" });
                gsap.from(splitText.chars, options);
            });
        };

        animateText('.text-anime-style-1', {
            duration: 1,
            delay: 0.5,
            x: 20,
            autoAlpha: 0,
            stagger: 0.05,
            scrollTrigger: { trigger: '.text-anime-style-1', start: "top 85%" },
        });

        animateText('.text-anime-style-2', {
            duration: 1,
            delay: 0.1,
            x: 20,
            autoAlpha: 0,
            stagger: 0.03,
            ease: "power2.out",
            scrollTrigger: { trigger: '.text-anime-style-2', start: "top 85%" },
        });
    }, []);

    return (
        <div className="bg-slate-50 flex flex-col">
            <main>
                <Suspense fallback={<Skeleton />}>
                    <Tickers />
                </Suspense>
                <Suspense fallback={<Skeleton />}>
                    <Homepage />
                </Suspense>
                {/* <WhyChouseUs /> */}
                <AboutUs />
                <FeaturesSection/>
                {/* <OurServices />
                <WhyChouseUs /> */}
                {/* <TopFeatures /> */}
                {/* <FactsSection />
                <WhatWeDo />
                <HowWork /> */}
                {/* <FinancialTool />
                <EmiCalculator /> */}
                {/* <FaqSection />
                <Testimonials />
                <OurPosts /> */}
                {/* <SubscribCard /> */}
                <ContactUs/>
                
            </main>
        </div>
    );
}