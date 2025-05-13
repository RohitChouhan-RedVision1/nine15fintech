"use client"
import BlogCards from '@/components/landing/blog-cards/blogcards';
import axios from 'axios';
import React, { Suspense } from 'react';
import Loading from './loading';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";

const Blogs = () => {
    const [data, setData] = React.useState([])
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                // const res = await axios.get("/api/blogs/dashboardblogs");
                const res = await axios.get("/api/blogs/dashboardblogs", { cache: "force-cache" });
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
        <section>
            <div className="page-header">
                <div className="container mx-auto">
                    <div className="items-center">
                        <div className="page-header-box">
                            <h1 className="text-anime-style-2" data-cursor="-opaque">Blogs</h1>
                            <Breadcrumb>
                                <BreadcrumbList className="text-white">
                                    <BreadcrumbItem>
                                        <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                    </BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                    <BreadcrumbItem>
                                        <BreadcrumbPage>Our Blogs</BreadcrumbPage>
                                    </BreadcrumbItem>
                                </BreadcrumbList>
                            </Breadcrumb>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container mx-auto py-20'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                    <Suspense fallback={<Loading />}>
                        {data?.map((item, index) => (
                            <div key={index} className='container mx-auto'>
                                <BlogCards item={item} />
                            </div>
                        ))}
                    </Suspense>
                </div>
            </div>
        </section>
    )
}

export default Blogs