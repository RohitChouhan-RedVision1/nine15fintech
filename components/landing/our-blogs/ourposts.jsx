"use client"
import Link from "next/link"
import axios from "axios"
import { useEffect, useState } from "react"
import formatDate from "@/lib/formatDate";
import styles from './ourposts.module.css'

export function OurPosts() {
    const [data, setData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/blogs/dashboardblogs");
                if (res.status === 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error("Failed to fetch blogs", error);
            }
        };

        fetchData();
    }, []);
    return (
        <div className={styles.ourBlog}>
            <div class="container mx-auto">
                <div class="grid grid-cols-2 section-row">
                    <div class="col-lg-6">
                        <div class="section-title">
                            <h3 class="wow fadeInUp">blog / post</h3>
                            <h2 class="text-anime-style-2" data-cursor="-opaque">Finance insights, updates <span>and trends</span></h2>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="section-btn wow fadeInUp" data-wow-delay="0.2s">
                            <Link href="/blogs" class="btn-default">view all post</Link>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    {data?.map((item, index) => (
                        <div class="col-md-6" key={index}>
                            <div className={styles.postItem}>
                                <div className={styles.postFeaturedImage}>
                                    <Link href={`blogs/${item.slug}`}>
                                        <figure class="image-anime">
                                            <img src={item?.image?.url} alt="" />
                                        </figure>
                                    </Link>
                                </div>
                                <div className={styles.postItemBody}>
                                    <div className={styles.postItemMeta}>
                                        <ul>
                                            <li><i class="fa-solid fa-calendar-days"></i>{formatDate(item?.createdAt)}</li>
                                        </ul>
                                    </div>
                                    <div className={styles.postItemContent}>
                                        <h2><Link href={`blogs/${item?.slug}`}>{item?.posttitle}</Link></h2>
                                    </div>
                                    <div className={styles.postItemBtn}>
                                        <Link href={`blogs/${item?.slug}`} className={styles.readmoreBtn}>read more</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
