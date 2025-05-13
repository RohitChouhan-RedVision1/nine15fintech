import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { FaRegCheckCircle } from "react-icons/fa";

export const metadata = {
  title: "Mutual Funds",
  description:
    "Explore a diverse range of mutual funds tailored to your financial goals and risk appetite.",
};

const MutualFunds = () => {
  return (
    <div>
       <div className="page-header">
              <div className="container mx-auto">
                <div className="items-center">
                  <div className="page-header-box">
                    <h1 className="text-anime-style-2" data-cursor="-opaque">
                      Mutual Funds
                    </h1>
                    <Breadcrumb>
                      <BreadcrumbList className="text-white">
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Services</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>Mutual Funds</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
            </div>
      <div className="max-w-screen-xl mx-auto py-[30px] lg:py-[60px]">
        {/* Introduction */}
        <p className="text-2xl font-semibold text-gray-800 mb-4">
          Diversified. Managed. Growth.
        </p>
        <div className="mb-8">
          <p className="text-gray-700">
            Mutual Funds are professionally managed investment schemes that pool money from multiple investors to invest in diversified asset classes. At Contango Asset, we offer a wide range of mutual fund options that align with your financial goals, risk profile, and investment horizon.
          </p>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-700">
            Whether you&apos;re looking to grow your wealth, save taxes, or build a retirement corpus, our curated mutual fund solutions offer flexibility, transparency, and expert fund management to help you succeed in your investment journey.
          </p>
        </div>

        {/* Types of Mutual Funds */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Types of Mutual Funds
          </h2>
          <ul className="list-disc pl-5 space-y-4 text-gray-700">
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Equity Funds:</strong> Invest in stocks for higher growth potential over the long term.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Debt Funds:</strong> Lower risk investment in government and corporate bonds.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Hybrid Funds:</strong> Combine equity and debt for balanced risk and return.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>ELSS (Tax Saving Funds):</strong> Get tax benefits under Section 80C with a 3-year lock-in.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Liquid Funds:</strong> Ideal for parking surplus funds with quick liquidity.
            </li>
          </ul>
        </div>

        {/* Features */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Invest in Mutual Funds with Us
          </h2>
          <ul className="list-disc pl-5 space-y-4 text-gray-700">
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Diversified Portfolio:</strong> Reduce risk through asset diversification across sectors and markets.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Professional Management:</strong> Expert fund managers handle all investment decisions.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Flexible Investment Options:</strong> Start with SIPs or lump sums based on your convenience.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Liquidity:</strong> Easy entry and exit options with most open-ended funds.
            </li>
            <li className="flex items-start gap-2">
              <FaRegCheckCircle className="text-green-600 text-2xl" />
              <strong>Goal-Based Planning:</strong> Tailored solutions for retirement, education, and wealth creation.
            </li>
          </ul>
        </div>

        {/* Conclusion and CTA */}
        <div className="text-center mt-8">
          <p className="text-gray-700 mb-4">
            Take control of your financial future with smart mutual fund investments. Whether you&apos;re new to investing or a seasoned pro, Contango Asset offers the right mix of funds to help you meet your goals.
          </p>
          <Link
                        href="/contact-us"
                        className="btn-default btn-highlighted"
                      >
                        Explore Funds Now
                      </Link>
       
        </div>
      </div>
    </div>
  );
};

export default MutualFunds;
