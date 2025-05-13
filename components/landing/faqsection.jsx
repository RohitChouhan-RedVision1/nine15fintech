import Image from "next/image";
import React from "react";

const FaqSection = () => {
    return (
        <div className="our-faqs">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 section-row items-center">
                    <div className="col-lg-6">
                        <div className="section-title">
                            <h3 className="wow fadeInUp">faqs</h3>
                            <h2 className="text-anime-style-2" data-cursor="-opaque">Your most frequently asked <span>questions answered</span></h2>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="section-btn wow fadeInUp" data-wow-delay="0.2s">
                            <a href="faqs.html" className="btn-default">view all FAQs</a>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 items-center">
                    <div className="col-lg-6">
                        <div className="our-faqs-image">
                            <div className="our-faqs-img">
                                <figure className="image-anime">
                                    <Image src="/images/faqs-img.jpg" alt="FAQ Image" width={500} height={500} />
                                </figure>
                            </div>
                            <div className="client-review-box">
                                <div className="client-review-box-content">
                                    <p>100+ Client <span><i className="fa-solid fa-star"></i> 5.0 (250 Reviews)</span></p>
                                </div>
                                <div className="client-review-images">
                                    <div className="client-image">
                                        <figure className="image-anime">
                                            <Image src="/images/satisfy-client-img-1.jpg" alt="Client 1" width={300} height={300} />
                                        </figure>
                                    </div>
                                    <div className="client-image">
                                        <figure className="image-anime">
                                            <Image src="/images/satisfy-client-img-3.jpg" alt="Client 3" width={100} height={100} />
                                        </figure>
                                    </div>

                                    <div className="client-image">
                                        <figure className="image-anime">
                                            <Image src="/images/satisfy-client-img-4.jpg" alt="Client 4" width={100} height={100} />
                                        </figure>
                                    </div>

                                    <div className="client-image">
                                        <figure className="image-anime">
                                            <Image src="/images/satisfy-client-img-5.jpg" alt="Client 5" width={100} height={100} />
                                        </figure>
                                    </div>

                                    <div className="client-image add-more">
                                        <p><span className="counter">30</span>+</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="our-faq-section">
                            <div className="faq-accordion" id="faqaccordion">
                                <div className="accordion-item wow fadeInUp">
                                    <h2 className="accordion-header" id="heading1">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                            What services do you offer?
                                        </button>
                                    </h2>
                                    <div id="collapse1" className="accordion-collapse collapse" aria-labelledby="heading1" data-bs-parent="#faqaccordion">
                                        <div className="accordion-body">
                                            <p>If you&apos;re uncertain about managing investments, planning for retirement, or structuring your finances, consulting a financial professional can help. Our team assists in clarifying your goals, optimizing your strategies.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeInUp" data-wow-delay="0.2s">
                                    <h2 className="accordion-header" id="heading2">
                                        <button className="accordion-button " type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                                            How do I know if I need a financial consultant?
                                        </button>
                                    </h2>
                                    <div id="collapse2" className="accordion-collapse collapse show" aria-labelledby="heading2" data-bs-parent="#faqaccordion">
                                        <div className="accordion-body">
                                            <p>If you&apos;re uncertain about managing investments, planning for retirement, or structuring your finances, consulting a financial professional can help. Our team assists in clarifying your goals, optimizing your strategies.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeInUp" data-wow-delay="0.4s">
                                    <h2 className="accordion-header" id="heading3">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                                            What can I expect from an initial consultation?
                                        </button>
                                    </h2>
                                    <div id="collapse3" className="accordion-collapse collapse" aria-labelledby="heading3" data-bs-parent="#faqaccordion">
                                        <div className="accordion-body">
                                            <p>If you&apos;re uncertain about managing investments, planning for retirement, or structuring your finances, consulting a financial professional can help. Our team assists in clarifying your goals, optimizing your strategies.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeInUp" data-wow-delay="0.6s">
                                    <h2 className="accordion-header" id="heading4">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="false" aria-controls="collapse4">
                                            Are my consultations confidential?
                                        </button>
                                    </h2>
                                    <div id="collapse4" className="accordion-collapse collapse" aria-labelledby="heading4" data-bs-parent="#faqaccordion">
                                        <div className="accordion-body">
                                            <p>If you&apos;re uncertain about managing investments, planning for retirement, or structuring your finances, consulting a financial professional can help. Our team assists in clarifying your goals, optimizing your strategies.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item wow fadeInUp" data-wow-delay="0.8s">
                                    <h2 className="accordion-header" id="heading5">
                                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse5" aria-expanded="false" aria-controls="collapse5">
                                            What kind of clients do you work with?
                                        </button>
                                    </h2>
                                    <div id="collapse5" className="accordion-collapse collapse" aria-labelledby="heading5" data-bs-parent="#faqaccordion">
                                        <div className="accordion-body">
                                            <p>If you&apos;re uncertain about managing investments, planning for retirement, or structuring your finances, consulting a financial professional can help. Our team assists in clarifying your goals, optimizing your strategies.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FaqSection;
