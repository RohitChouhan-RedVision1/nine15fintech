import BlogCards from "@/components/landing/blog-cards/blogcards";
import formatDate from "@/lib/formatDate";
import axios from "axios";
import Image from "next/image";
import { Suspense } from "react";
import Loading from "../loading";

// FETCH DATA WITH AN API
const getData = async (slug) => {
    const res = await axios.get(`http://localhost:3000/api/blogs/singlepost/${slug}`);
    if (res.status !== 200) {
        throw new Error("Something went wrong");
    }
    return res?.data[0];
};

const getRecentBlog = async (slug) => {
    const res = await axios.get('http://localhost:3000/api/blogs/dashboardblogs');
    if (res.status !== 200) {
        throw new Error("Something went wrong");
    }
    return res?.data;
};

// SEO - dynamic
export const generateMetadata = async ({ params }) => {
    const { slug } = params;

    const post = await getData(slug);
    return {
        title: post.metatitle,
        description: post.description,
        keywords: post.keywords,
    };
};

const SinglePostPage = async ({ params }) => {
    const { slug } = params;
    // // FETCH DATA WITH AN API
    const post = await getData(slug);
    const recentPost = await getRecentBlog();

    function createMarkup() {
        return { __html: post?.content }
    }
    return (
        <div className="flex lg:px-60 md:px-20 px-10 py-10 flex-col">
            <div className="text-center justify-center items-center">
                <div className="mb-16">
                    <h1 className="text-5xl font-bold text-gray-800 mb-5">{post.posttitle}</h1>
                    <div className="">
                        <span className="text-lg text-gray-800">Published </span>
                        <span className="text-lg text-purple-800">
                            {formatDate(post.createdAt)}
                        </span>
                    </div>
                </div>
                {post.image.url && (
                    <div>
                        <Image src={post.image.url}
                            alt={post.image.url}
                            width={900}
                            height={900}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="rounded mx-auto" />
                    </div>
                )}
                <div className="mb-10">
                    <h1 className="">{post.title}</h1>
                    <div className="my-5">
                        {post && (
                            <Suspense fallback={<div>Loading...</div>}>
                                <div dangerouslySetInnerHTML={createMarkup()} />
                            </Suspense>
                        )}
                    </div>
                </div>
            </div>
            <div className="">
                <h1 className="font-bold text-xl">Recent Posts</h1>
                <div className="grid grid-cols-3 gap-3">
                    {recentPost?.slice(0, 6).map((item, index) => (
                        <div key={index}>
                            <Suspense fallback={<Loading />}>
                                <BlogCards item={item} />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default SinglePostPage;