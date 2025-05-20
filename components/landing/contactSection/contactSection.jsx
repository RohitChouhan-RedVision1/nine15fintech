"use client";
import React, { useEffect, useState } from "react";
import styles from './Contact.module.css';
import Image from "next/image";
import SectionHeading from "../sectionHeading";
import { Button } from "@/components/ui/button";
import axios from "axios";
import HCaptcha from "@hcaptcha/react-hcaptcha";

export default function ContactUs() {
    const [sitedata, setSiteData] = useState("");
      const [hcaptchaToken, setHcaptchaToken] = useState("");
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
        fetchdata()
    }, []);

    const fetchdata = async () => {
        const data = await fetch("/api/admin/site-settings", { cache: "no-store" });
        if (data.ok) {
            const maindata = await data.json();
            setSiteData(maindata[0])
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!hcaptchaToken) {
      alert("Please complete the captcha verification.");
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
        <div className="container mx-auto py-[30px] md:py-[60px]">
            <div className={`${styles.consultationContainer} grid grid-cols-1 md:grid-cols-2`}>
                <div className={styles.imageContainer}>
                    <Image
                        src="/images/contact-us-img.png"
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
                  Get in touch{" "}
                  <span className="text-[var(--rv-secondary)]">with us</span>
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
                                <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Full name" className={styles.input} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Phone no" className={styles.input} required />
                            </div>
                            <div className={styles.inputGroup}>
                                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail address" className={styles.input} required />
                            </div>
                            
                            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Message" className={styles.textarea} required></textarea>

                            {/* CAPTCHA */}
                           
                            <div className="">
        <HCaptcha
          sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
          onVerify={setHcaptchaToken}
        />
      </div>
                            <button
                                type="submit"
                                className="btn-default  w-1/2"
                                disabled={loading}
                            >
                                {loading ? "Sending..." : "Send message"}
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
