"use client";
import React, { useEffect, useState } from 'react';
import { IoCall, IoLocationSharp, IoMail } from 'react-icons/io5';
import axios from 'axios';
import { Toaster } from "@/components/ui/toaster"
import { toast } from '@/hooks/use-toast';
import { footerData } from '@/data/footer';
import Image from 'next/image';
import { InputForm } from '../contactform';
import SectionHeading from './sectionHeading';
const ContactUs = () => {
    const [services, setServices] = useState([]);
    const [siteData, setSiteData] = useState([]);

    const fetchServices = async () => {
        try {
            const response = await axios.get('/api/services');
            if (response.status === 200) {
                if (response.data && Array.isArray(response.data)) {
                    setServices(response.data);
                } else {
                    console.error("Invalid data format:", response.data);
                    alert("Failed to fetch services. Please try again.");
                }
            } else {
                console.error("Failed to fetch services:", response.data);
                alert("Failed to fetch services. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
        }
    };
    const fetchSiteData = async () => {
        try {
            const res = await axios.get(`/api/admin/site-settings`);
            if (res.status === 200) {
                const data = res.data
                setSiteData(data[0])
            }
        }
        catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        fetchServices();
    }, []);
    useEffect(() => {
        fetchSiteData();
    }, []);
    return (
        <section>
            <div className="max-w-screen-xl my-20 container mx-auto">
                <SectionHeading title="Contact Us" description="Contact now to get in touch" />
                <div className="my-10 grid grid-cols-1 md:grid-cols-5 gap-6">
                    <div className='space-y-2 col-span-2'>
                        <ContactInfo
                            icon={<IoLocationSharp />}
                            title="Address"
                            info={siteData?.address}
                        />
                        <ContactInfo
                            icon={<IoMail />}
                            title="Email"
                            info={siteData?.email}
                        />
                        <ContactInfo
                            icon={<IoCall />}
                            title="Call"
                            info={siteData?.mobile}
                        />
                    </div>
                    <div className='col-span-3'>
                        <InputForm services={services} sitedata={siteData} />
                    </div>
                </div>
            </div>
            <Toaster />
        </section >
    );
};

const ContactInfo = ({ icon, title, info }) => (
    <div className="rounded flex flex-col justify-center items-center text-center gap-x-5 py-6 px-3 bg-white shadow-lg">
        <div className="secondarycolor text-3xl mb-2 border-dashed border-2 border-gray-400 rounded-full p-2">
            {icon}
        </div>
        <div className="">
            <h1 className="font-bold primarycolor text-xl mb-3">{title}</h1>
            <p
                className="font-normal text-gray-800 text-md"
                dangerouslySetInnerHTML={{ __html: info }}
            />
        </div>
    </div>
);

export default ContactUs;