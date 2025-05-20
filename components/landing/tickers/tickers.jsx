"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FiArrowUp, FiArrowDown } from 'react-icons/fi';
import { CarouselContent, CarouselItem, Carousel } from '../../ui/carousel';
import Autoplay from "embla-carousel-autoplay";
import styles from './Tickers.module.css';

const allowedIndices = ["SENSEX", "NIFTY 50", "GOLD", "USD/INR","SENSEX", "NIFTY 50", "GOLD", "USD/INR"];

const Tickers = () => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/tickers?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (response.status === 200) {
                const filtered = response.data.data.filter((item) =>
                    allowedIndices.includes(item.indexName)
                );
                setData(filtered);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(() => {
            fetchData();
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="mx-auto relative">
            <div className={`mx-auto relative ${styles.tickerContainer}`}>
                <Carousel className="relative" plugins={[Autoplay({ delay: 2000 })]}>
                    <CarouselContent className="flex -ml-0">
                        {data.map((item, index) => (
                            <div key={index} className="basis-1/1 md:basis-1/2 lg:basis-1/4">
                                <div className={styles.tickerItem}>
                                    <p className={styles.indexName}>{item.indexName}</p>
                                    <p className={styles.figure}>{item.figure}</p>
                                    <p className={`${styles.diffAmount} ${item.diff_amount > 0 ? styles.positive : styles.negative}`}>
                                        {item.diff_amount > 0 ? <FiArrowUp /> : <FiArrowDown />}
                                    </p>
                                    <p className={`${styles.diffAmount} ${item.diff_amount > 0 ? styles.positive : styles.negative}`}>
                                        {item.diff_amount}
                                    </p>
                                    <p className={`${styles.diffAmount} ${item.diff_amount > 0 ? styles.positive : styles.negative}`}>
                                        ({item.percentage}%)
                                    </p>
                                </div>
                            </div>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default Tickers;
