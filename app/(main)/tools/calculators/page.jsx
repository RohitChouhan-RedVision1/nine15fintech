"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import {
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { calculators, performance } from "@/data/calculators";

export default function Page() {
  const [isMonthlySip, setIsMonthlySip] = useState(true);
  return (
    <div className="">
       <div className="page-header">
               <div className="container mx-auto">
                 <div className="items-center">
                   <div className="page-header-box">
                     <h1 className="text-anime-style-2" data-cursor="-opaque">
                       Financial calculators
                     </h1>
                     <Breadcrumb>
                       <BreadcrumbList className="text-white">
                         <BreadcrumbItem>
                           <BreadcrumbLink href="/">Home</BreadcrumbLink>
                         </BreadcrumbItem>
                         <BreadcrumbSeparator />
                         <BreadcrumbItem>
                           <BreadcrumbLink href="/tools">Tools</BreadcrumbLink>
                         </BreadcrumbItem>
                         <BreadcrumbSeparator />
                         <BreadcrumbItem>
                           <BreadcrumbPage>Financial calculators</BreadcrumbPage>
                         </BreadcrumbItem>
                       </BreadcrumbList>
                     </Breadcrumb>
                   </div>
                 </div>
               </div>
             </div>
      <div className="max-w-screen-xl mx-auto py-[30px] lg:py-[100px]">
      <section className="">
        <div className=" mx-auto">
        <div className="flex justify-center mb-14">
  <div className="inline-flex border border-[var(--rv-primary)]  rounded-full shadow-inner">
    <Button
      onClick={() => setIsMonthlySip(true)}
      className={`px-10 md:px-20  py-4 text-lg font-medium border border-[var(--rv-primary)] hover:bg-[var(--rv-primary)] hover:text-white rounded-l-full transition-all duration-300 ${
        isMonthlySip
          ? "bg-[var(--rv-primary)] text-white"
          : "bg-[var(--rv-secondary)] text-[var(--rv-primary)]"
      }`}
    >
      Calculators
    </Button>
    <Button
      onClick={() => setIsMonthlySip(false)}
      className={`px-10 md:px-20 py-4 text-lg hover:bg-[var(--rv-primary)] hover:text-white font-medium border border-[var(--rv-primary)] rounded-r-full transition-all duration-300 ${
        !isMonthlySip
           ? "bg-[var(--rv-primary)] text-white"
          : "bg-[var(--rv-secondary)] text-[var(--rv-primary)]"
      }`}
    >
      Performance
    </Button>
  </div>
</div>

          {isMonthlySip ? (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
              {calculators.map((item, index) => (
                <Link href={item?.route} key={index}>
                  <div className="px-2 bg-[var(--rv-primary)]  h-14  flex  gap-4 rounded items-center text-center shadow-md group">
                    <div>
                      <Image src={item?.image} alt="" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-md text-center group-hover:text-[#F3F3E0] mb-0">
                        {item?.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
              {performance.map((item, index) => (
                <Link href={item.link} key={index}>
                  <div className="px-2  bg-[var(--rv-primary)]  h-14 flex gap-4 items-center rounded-md  shadow-md group">
                    <div>
                      <Image src={item?.image} alt="" width={20} height={20} />
                    </div>
                    <div>
                      <p className="font-bold text-white text-md group-hover:[#F3F3E0] mb-0">
                        {item?.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
    </div>
  );
}
