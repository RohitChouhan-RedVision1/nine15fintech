"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const UsefulLinksPage = () => {
  const [usefulLink, setUsefulLink] = useState([]);
  const fetchLinks = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/useful-links?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
    );
    if (res.ok) {
      const data = await res.json();
      setUsefulLink(data);
    }
  };
  // useEffect(() => { fetchservice(); }, []);
  useEffect(() => {
    fetchLinks();
  }, []);
  return (
    <div className="">
       <div className="page-header">
                                 <div className="container mx-auto">
                                   <div className="items-center">
                                     <div className="page-header-box">
                                       <h1 className="text-anime-style-2" data-cursor="-opaque">
                                         Useful links
                                       </h1>
                                       <Breadcrumb>
                                         <BreadcrumbList className="text-white">
                                           <BreadcrumbItem>
                                             <BreadcrumbLink href="/">Home</BreadcrumbLink>
                                           </BreadcrumbItem>
                                           <BreadcrumbSeparator />
                                           <BreadcrumbItem>
                                             <BreadcrumbPage>Useful links</BreadcrumbPage>
                                           </BreadcrumbItem>
                                         </BreadcrumbList>
                                       </Breadcrumb>
                                     </div>
                                   </div>
                                 </div>
                               </div>
    <div className="">
      <div className="container mx-auto md:px-20 px-4 pt-5 py-[100]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 py-[60px]">
          {usefulLink.map((link, index) => (
            <Link href={link.link} key={index} legacyBehavior>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--rv-secondary)] text-white border rounded-lg shadow-md p-4 text-center hover:shadow-lg transition hover:bg-[var(--rv-primary)] hover:text-white duration-300 flex flex-col justify-center items-center"
              >
                <h3 className="text-xl font-semibold">{link.title}</h3>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default UsefulLinksPage;
