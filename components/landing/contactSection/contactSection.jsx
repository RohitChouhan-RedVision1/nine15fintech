"use client";
import React, { useEffect, useState } from "react";
import styles from './Contact.module.css';
import Image from "next/image";
import SectionHeading from "../sectionHeading";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function ContactUs() {
    const [sitedata, setSiteData] = useState("");
    const [captcha, setCaptcha] = useState("");
    const [userCaptcha, setUserCaptcha] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        mobile: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        refreshCaptcha();
        fetchdata()
    }, []);

    const fetchdata = async () => {
        const data = await fetch("/api/admin/site-settings", { cache: "no-store" });
        if (data.ok) {
            const maindata = await data.json();
            setSiteData(maindata[0])
        }
    };

    const refreshCaptcha = () => {
        const randomString = Math.random().toString(36).substring(2, 8).toUpperCase();
        setCaptcha(randomString);
        setUserCaptcha("");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (userCaptcha.trim().toUpperCase() !== captcha.trim().toUpperCase()) {
            alert("Captcha doesn't match. Please try again.");
            refreshCaptcha();
            return;
        }

        setLoading(true);

        const emailContent = "We’re excited to help you reach your financial goals.";
        const emailData = {
            to: formData.email,
            subject: 'Thank You for Your Enquiry!',
            text: `Dear ${formData.username},\n\nWe sincerely appreciate your interest and the time you took to fill out our enquiry form. We have received your details, and our team will be in touch with you soon.\n\n${emailContent}`,
        };

        const senderData = {
            to:sitedata?.email, // change to sitedata.email if available
            subject: 'New Enquiry Received',
            text: `New Enquiry:\n\nName: ${formData.username}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\nSubject: ${formData.subject}\nMessage: ${formData.message}`,
        };

        try {
            const res = await axios.post("/api/leads", formData);

            if (res.status === 201) {
                await axios.post("/api/email", emailData);
                await axios.post("/api/email", senderData);

                setSubmitted(true);
                setFormData({
                    username: "",
                    mobile: "",
                    email: "",
                    subject: "",
                    message: "",
                });
                setUserCaptcha("");
                refreshCaptcha();
            } else {
                alert("Submission failed. Try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-screen-xl mx-auto py-[30px] md:py-[60px]">
            <div className={`${styles.consultationContainer} grid grid-cols-1 md:grid-cols-2`}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/images/contact-women.webp"
                        alt="Person working at desk"
                        width={600}
                        height={400}
                        className={styles.consultationImage}
                    />
                </div>

                <div className={styles.formContainer}>
                    <div className="section-title dark-section">
                <h3 className="wow fadeInUp">contact us</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Get in Touch{" "}
                  <span className="text-[var(--rv-secondary)]">with Us</span>
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Have questions or need assistance? Reach out to us today!
                  We&apos;re here to provide expert solutions and friendly
                  support.
                </p>
              </div>

                    {submitted ? (
                        <p className="text-green-600 font-semibold">Thank you! Your message has been sent.</p>
                    ) : (
                        <form className={styles.form} onSubmit={handleSubmit}>
                            <div className={styles.inputGroup}>
                                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Name" className={styles.input} required />
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className={styles.input} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Phone" className={styles.input} required />
                                <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className={styles.input} />
                            </div>
                            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className={styles.textarea} required></textarea>

                            {/* CAPTCHA */}
                           
                            <input type="text" value={userCaptcha} onChange={(e) => setUserCaptcha(e.target.value)} placeholder="Enter Captcha" className={styles.input} required />
                             <div className="flex items-center space-x-4 my-4 w-1/2">
                                <div className={`bg-[var(--rv-secondary)] p-2 rounded-sm w-1/2`} >{captcha}</div>
                                <button type="button" onClick={refreshCaptcha} className="btn-default btn-highlighted">Refresh</button>
                            </div>
                            <button
                                type="submit"
                                className="btn-default btn-highlighted w-1/2"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
