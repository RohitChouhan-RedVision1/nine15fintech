"use client";
import { InputForm } from "@/components/contactform";
import React, { useEffect, useState } from "react";
import { IoCall, IoLocationSharp, IoMail } from "react-icons/io5";
import Image from "next/image";
import styles from "./contact.module.css";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

const ContactUs = () => {
  const [mainData, setMainData] = useState("");
  const [services, setServices] = useState([]);
  const [captcha, setCaptcha] = useState("");
  const [userCaptcha, setUserCaptcha] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    mobile: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    refreshCaptcha();
  }, []);
  const refreshCaptcha = () => {
    const randomString = Math.random()
      .toString(36)
      .substring(2, 8)
      .toUpperCase();
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

    const emailContent =
      "We’re excited to help you reach your financial goals.";

    const emailData = {
      to: formData.email,
      subject: "Thank You for Your Enquiry!",
      text: `Dear ${formData.username},\n\nWe sincerely appreciate your interest and the time you took to fill out our enquiry form. We have received your details, and our team will be in touch with you soon.\n\n${emailContent}`,
    };

    const senderData = {
      to: mainData?.email || "support@alpha72wealth.com",
      subject: "New Enquiry Received",
      text: `New Enquiry from Contact Us:\n\nUser Name: ${formData.username}\nEmail: ${formData.email}\nMobile: ${formData.mobile}\nMessage: ${formData.message}\n\n${emailContent}`,
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
          message: "",
        });
        setUserCaptcha("");
        refreshCaptcha();
      } else {
        alert("Something went wrong.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fetchdata = async () => {
    const data = await fetch("/api/admin/site-settings", {
      cache: "force-cache",
    });
    if (data.ok) {
      const maindata = await data.json();
      setMainData(maindata[0]);
    }
  };
  const fetchservice = async () => {
    const res = await fetch("/api/services");
    if (res.ok) {
      const data = await res.json();
      setServices(data);
    }
  };
  useEffect(() => {
    fetchservice();
  }, []);
  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <section>
      <div className="page-header">
        <div className="container mx-auto">
          <div className="items-center">
            <div className="page-header-box">
              <h1 className="text-anime-style-2" data-cursor="-opaque">
                Contact us
              </h1>
              <Breadcrumb>
                <BreadcrumbList className="text-white">
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Contact Us</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.pageContactUs}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-4">
            <div>
              <div className={styles.contactInfoItem}>
                <div className={styles.contactInfoImg}>
                  <figure className="image-anime">
                    <Image
                      src="/images/contact-info-img-1.jpg"
                      alt="Contact Info"
                      width={500}
                      height={300}
                    />
                  </figure>
                </div>
                <Link href={`tel:${mainData.mobile}`}>
                  <div className={styles.contactInfoBody}>
                    <div className={styles.iconBox}>
                      <Image
                        src="/images/icon-phone.svg"
                        alt="Phone Icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.contactInfoContent}>
                      <h3>call us any time!</h3>
                      <p>{mainData?.mobile}</p>
                      <p>{mainData?.mobile2}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <div className={styles.contactInfoItem}>
                <div className={styles.contactInfoImg}>
                  <figure className="image-anime">
                    <Image
                      src="/images/contact-info-img-2.jpg"
                      alt="Email Info"
                      width={500}
                      height={300}
                    />
                  </figure>
                </div>
                <Link href={`mailto:${mainData.email}`}>
                  <div className={styles.contactInfoBody}>
                    <div className={styles.iconBox}>
                      <Image
                        src="/images/icon-mail.svg"
                        alt="Mail Icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.contactInfoContent}>
                      <h3>send us e-mail</h3>
                      <p>{mainData?.email}</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div>
              <div className={styles.contactInfoItem}>
                <div className={styles.contactInfoImg}>
                  <figure className="image-anime">
                    <Image
                      src="/images/contact-info-img-1.jpg"
                      alt="Location Info"
                      width={500}
                      height={300}
                    />
                  </figure>
                </div>
                <a href={mainData.mapurl}>
                  <div className={styles.contactInfoBody}>
                    <div className={styles.iconBox}>
                      <Image
                        src="/images/icon-location.svg"
                        alt="Location Icon"
                        width={50}
                        height={50}
                      />
                    </div>
                    <div className={styles.contactInfoContent}>
                      <h3>finance office address</h3>
                      <p>{mainData?.address}</p>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.contactFormSection}`}>
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center">
            <div className="col-lg-6">
              <div className={styles.contactFormImg}>
                <figure className="image-anime">
                  <Image
                    src="/images/contact-us-img.jpg"
                    alt="Contact Us"
                    width={600}
                    height={400}
                  />
                </figure>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="section-title">
                <h3 className="wow fadeInUp">contact us</h3>
                <h2 className="text-anime-style-2" data-cursor="-opaque">
                  Get in Touch{" "}
                  <span className="text-[var(--rv-primary)]">with Us</span>
                </h2>
                <p className="wow fadeInUp" data-wow-delay="0.2s">
                  Have questions or need assistance? Reach out to us today!
                  We&apos;re here to provide expert solutions and friendly
                  support.
                </p>
              </div>
              <div className={styles.contactForm}>
                <form
                  id="contactForm"
                  action="#"
                  method="POST"
                  data-toggle="validator"
                  className="wow fadeInUp"
                  data-wow-delay="0.4s"
                  onSubmit={handleSubmit}
                >
                  <div className="grid">
                    <div className="form-group col-md-6 mb-2">
                      <input
                        type="text"
                        name="username"
                        className={styles.formControl}
                        placeholder="Full name"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-6 mb-2">
                      <input
                        type="text"
                        name="mobile"
                        className={styles.formControl}
                        placeholder="Phone no"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="form-group col-md-12 mb-2">
                      <input
                        type="email"
                        name="email"
                        className={styles.formControl}
                        placeholder="E-mail address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group col-md-12 ">
                    <textarea
                      name="message"
                      className={styles.formControl}
                      rows="4"
                      placeholder="Message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                  <div className="form-group col-md-12 mb-2">
                    <input
                      type="text"
                      name="captcha"
                      placeholder="Enter Captcha"
                      value={userCaptcha}
                      onChange={(e) => setUserCaptcha(e.target.value)}
                      className={`${styles.formControl}`}
                      required
                    />
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="bg-gray-100 px-4 py-2 rounded text-lg font-semibold tracking-widest">
                        {captcha}
                      </div>
                      <button
                        type="button"
                        onClick={refreshCaptcha}
                        className="btn-default btn-highlighted"
                      >
                        Refresh
                      </button>
                    </div>
                    
                  </div>
                  <div className="col-md-12">
                    <button
                      type="submit"
                      className="btn-default"
                      disabled={loading}
                    >
                      {loading ? "Sending..." : "Send Message"}
                    </button>
                    {submitted && (
                      <p className="text-green-600 mt-4">
                        Thank you! Your message has been sent.
                      </p>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.googleMap}>
        <div className={styles.googleMapIframe}>
          <iframe
            src={mainData?.iframe}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
