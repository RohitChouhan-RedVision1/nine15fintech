import Image from 'next/image';
import styles from './Facts.module.css';

export default function FactsSection() {
    return (
        <div className={styles.factCounter}>
            <div className="container mx-auto">
                <div className="grid grid-cols-2 items-center">
                    <div className="col-lg-6">
                        <div className={styles.factCounterImage}>
                            <div className={styles.factCounterImg}>
                                <figure className="image-anime">
                                    <Image src="/images/fact-counter-img.jpg" alt="Fact Counter" width={500} height={300} />
                                </figure>
                            </div>
                            <div className={styles.factCounterSkillbar}>
                                <Image src="/images/fact-counter-skillbar-img.png" alt="Skillbar" width={500} height={300} />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className={styles.factCounterContent}>
                            <div className="section-title">
                                <h3 className="wow fadeInUp">some facts</h3>
                                <h2 className="text-anime-style-2" data-cursor="-opaque">Key facts our <span>expertise</span></h2>
                                <p className="wow fadeInUp" data-wow-delay="0.2s">Our expertise is built on years of industry experience, proven financial strategies and a commitment to client success.</p>
                            </div>
                            <div className={styles.factCounterBoxList}>
                                <div className={styles.factCounterBox}>
                                    <div className={styles.iconBox}>
                                        <Image src="/images/icon-fact-counter-1.svg" alt="Icon 1" width={50} height={50} />
                                    </div>

                                    <div className={styles.factCounterBoxContent}>
                                        <h2><span className="counter">25</span>+</h2>
                                        <p>Years of experience</p>
                                    </div>
                                </div>
                                <div className={styles.factCounterBox}>
                                    <div className={styles.iconBox}>
                                        <Image src="/images/icon-fact-counter-2.svg" alt="Icon 2" width={50} height={50} />
                                    </div>

                                    <div className={styles.factCounterBoxContent}>
                                        <h2><span className="counter">80</span>%+</h2>
                                        <p>Client success rate</p>
                                    </div>
                                </div>
                                <div className={styles.factCounterBox}>
                                    <div className={styles.iconBox}>
                                        <Image src="/images/icon-fact-counter-3.svg" alt="Icon 3" width={50} height={50} />
                                    </div>

                                    <div className={styles.factCounterBoxContent}>
                                        <h2><span className="counter">20</span>+</h2>
                                        <p>Global research</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.factCounterList + " wow fadeInUp"} data-wow-delay="0.4s">
                                <ul>
                                    <li>Strategic financial planning</li>
                                    <li>Expert investment advisory</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}