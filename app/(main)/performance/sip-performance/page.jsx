"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { SipPerformanceChart } from "@/components/charts/sipPerformanceChart";
import { FaFilePdf } from "react-icons/fa6";
import SipPerformanceTable from "@/components/sipPerformanceTable";
import { generatePDF } from "@/lib/generatePdf";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const FormSchema = z.object({
    username: z
      .string()
      .min(2, { message: "Username must be at least 2 characters." }),
    mobile: z.string().nonempty({ message: "Mobile number is required." }),
    email: z.string().email({ message: "Invalid email address." }),
  });
  function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const dd = String(today.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  }
  const [schemesData, setSchemesData] = useState([]);
  const [result, setResult] = useState(null);
  const [isMonthlySip, setIsMonthlySip] = useState(true);
  const [allAcmdata, setAllAcmdata] = useState([]);
  const [selectedAcms, setSelectedAcms] = useState([]);
  const [funds, setFunds] = useState([]);
  const [startsipDate, setStartSipDate] = useState("2021-10-14");
  const [endsipDate, setEndSipDate] = useState(getTodayDate());
  const [valuationDate, setValuationDate] = useState(getTodayDate());
  const [sipAmount, setSipAmount] = useState(10000);
  const [pcode, setPcode] = useState("");
  const [title, setTitle] = useState("");
  const [viewby, setViewBy] = useState("graph");
  const [assetCategory, setAssetCategory] = useState([]);
  const [selectedAssets, setSelectedAssets] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [graphData, setGraphData] = useState(false);

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      mobile: "",
      email: "",
      message: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    setLoading(true);
    const emaildata = {
      user: data?.username,
      to: data?.email,
      subject: "Test Email",
      text: "This is a test email sent from Nodemailer!",
    };

    try {
      const response = await axios.post("/api/leads/", data);
      const info = await axios.post("/api/email/", emaildata);
      if (response.status === 201) {
        toast({
          description: "Your message has been sent.",
        });
        form.reset();
      } else {
        alert(response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred.");
    }
    localStorage.setItem("formSubmitted", "true");
    localStorage.setItem("submissionTimestamp", Date.now().toString());
    setIsModalOpen(false);
    setLoading(false);
    setIsSubmitted(true);
    setGraphData(true);
    haldleSubmit();
  };

  // Constants for time calculations
  const TWENTY_DAYS_IN_MS = 15 * 24 * 60 * 60 * 1000; // 15 days in milliseconds

  useEffect(() => {
    // Check if the form has already been submitted (stored in localStorage)
    const formSubmitted = localStorage.getItem("formSubmitted");
    const submissionTimestamp = localStorage.getItem("submissionTimestamp");

    if (formSubmitted === "true" && submissionTimestamp) {
      const currentTime = Date.now();
      const timeDifference = currentTime - submissionTimestamp;

      // If 20 days have passed since submission, clear the localStorage
      if (timeDifference > TWENTY_DAYS_IN_MS) {
        localStorage.removeItem("formSubmitted");
        localStorage.removeItem("submissionTimestamp");
        setIsSubmitted(false); // Allow form to open again
      } else {
        setIsSubmitted(true); // Keep form closed if within 20 days
      }
    }
  }, []);

  const fetcAcm = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/all-amc?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setAllAcmdata(response.data);
    } catch (error) {
      console.error("Error fetching AMC data:", error);
    }
  };

  const fetcAssetCategory = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/get-assets?apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setAssetCategory(response.data);
    } catch (error) {
      console.error("Error fetching AMC data:", error);
    }
  };

  useEffect(() => {
    fetchSchemes();
  }, [selectedAcms]);

  React.useEffect(() => {
    fetcAcm();
    fetcAssetCategory();
  }, []);

  const handleAssetSelect = (scheme) => {
    const assetClass = scheme?.assets_class;
    if (assetClass) {
      setSelectedAssets((prevSelected) => {
        const updatedSelection = new Set(prevSelected);

        if (updatedSelection.has(assetClass)) {
          // If already selected, remove it
          updatedSelection.delete(assetClass);
        } else {
          // If not selected, add it
          updatedSelection.add(assetClass);
        }

        return updatedSelection; // Return updated Set
      });
    } else {
      console.warn("No valid assets_class found in selectedAcm");
    }
  };

  useEffect(() => {
    // Convert the Set back to an array and filter out undefined values
    const updatedFunds = Array.from(selectedAssets).filter(
      (fund) => fund !== undefined
    ); // Remove undefined values
    // Fetch asset data after updating funds
    if (updatedFunds.length > 0) {
      fetchAsset(updatedFunds);
    }
  }, [selectedAssets]);

  const fetchAsset = async (funds) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/get-sub-assets?subAssetClass=${funds}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setSchemesData(response); // Update the state with fetched schemes
    } catch (error) {
      console.error("Error fetching schemes data:", error);
    }
  };

  const fetchSchemes = async (selectedAcm) => {
    // Check if the fund is already in the array to avoid duplicates
    if (!funds?.includes(selectedAcm?.fund)) {
      // Append the new fund to the existing array
      setFunds((prevFunds) => [...prevFunds, selectedAcm?.fund]);
    }
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/all-scheme?fund=${funds}&apikey=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setSchemesData(response); // Update the state with fetched schemes
    } catch (error) {
      console.error("Error fetching schemes data:", error);
    }
  };

  // Handle selecting/deselecting AMCs
  const handleAcmSelect = (scheme) => {
    if (selectedAcms.includes(scheme)) {
      setSelectedAcms(selectedAcms.filter((s) => s !== scheme));
    } else {
      setSelectedAcms([...selectedAcms, scheme]);
      fetchSchemes(scheme); // Fetch schemes when an AMC is selected
    }
  };

  const haldleSubmit = async () => {
    if (selectedAcms.length === 0 && selectedAssets.size === 0) {
      toast({
        variant: "destructive",
        title: "Please select scheme",
      });
      setGraphData(false);
    } else {
      try {
        const response = await axios.post(
          "https://wealthelite.in/eliteN/research-calculator/sip-performance",
          {
            startDate: startsipDate,
            endDate: endsipDate,
            fundPcode: pcode,
            valuationAsOnDate: valuationDate,
            amount: Number(sipAmount),
          },
          {
            auth: {
              username: "redvision_calcutors_user",
              password: "7uXtqvbW6PI6r4enIT1MKs7XH897G3Un",
            },
          }
        );
        if (response.data.data == null) {
          setGraphData(false);
        } else {
          setGraphData(true);
          setResult(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching schemes data:", error);
      }
    }
  };

  const handlePdf = async (result, title, startsipDate, valuationDate) => {
    generatePDF(result, title, startsipDate, valuationDate, "graphId");
  };

  const handleModelOpen = (open) => {
    // Check if no schemes are selected
    if (selectedAcms.length === 0 && selectedAssets.size === 0) {
      toast({
        variant: "destructive",
        title: "Please select scheme",
      });
    } else {
      setIsModalOpen((prevState) => !prevState);
    }
  };

  return (
    <div className="">
      <div className="page-header">
              <div className="container mx-auto">
                <div className="items-center">
                  <div className="page-header-box">
                    <h1 className="text-anime-style-2" data-cursor="-opaque">
                      SIP  Perfomance
                    </h1>
                    <Breadcrumb>
                      <BreadcrumbList className="text-white">
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                         <BreadcrumbItem>
                          <BreadcrumbLink href="/tools/calculators">Performance</BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbPage>SIP  Perfomance</BreadcrumbPage>
                        </BreadcrumbItem>
                      </BreadcrumbList>
                    </Breadcrumb>
                  </div>
                </div>
              </div>
            </div>
      <div className="max-w-screen-xl mx-auto py-[30px] md:py-[60px]">
      <Toaster />
     
      <div>
        <div>
          <div className="col-span-1 border border-gray-200 rounded-2xl bg-white hover:text-white p-2 mb-3">
            <div className="sip-calculator container mx-auto p-3 sticky top-0 z-10">
              {/* Investment Type Toggle */}
              <div className="flex space-x-4 mb-8">
                <Button
                  onClick={() => (
                    setIsMonthlySip(true),
                    setSchemesData([]),
                    setGraphData(false)
                  )}
                  className={`text-sm rounded-full hover:bg-[var(--rv-primary)] hover:text-white ${
                    isMonthlySip
                      ? "bg-[var(--rv-secondary)] text-[var(--rv-primary)]"
                      : "bg-[var(--rv-primary)] text-white"
                  }`}
                >
                  Fund House
                </Button>
                <Button
                  onClick={() => (
                    setIsMonthlySip(false),
                    setSchemesData([]),
                    setGraphData(false)
                  )}
                  className={`text-sm rounded-full hover:bg-[var(--rv-primary)] hover:text-white ${
                    !isMonthlySip
                      ? "bg-[var(--rv-secondary)] text-[var(--rv-primary)]"
                      : "bg-[var(--rv-primary)] text-white"
                  }`}
                >
                  Asset Category
                </Button>
              </div>

              <div className="input-fields mt-5 mb-5">
                {isMonthlySip ? (
                  <div className="w-full">
                    <h1 className="font-semibold text-gray-700">Select ACM</h1>
                    <div className="max-w-full mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                      <input
                        type="text"
                        placeholder="Search Scheme"
                        className="w-full px-3 py-2 border rounded mb-1"
                      />
                      {/* Render checkboxes for each AMC */}
                      {allAcmdata?.map((scheme, index) => (
                        <div key={index} className="flex items-center mb-1">
                          <input
                            type="checkbox"
                            id={`acm-${index}`}
                            checked={selectedAcms.includes(scheme)}
                            onChange={() => handleAcmSelect(scheme)}
                            className="mr-2"
                          />
                          <label
                            htmlFor={`acm-${index}`}
                            className="text-stone-900 text-sm"
                          >
                            {scheme?.funddes}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2  gap-x-4 gap-y-4">
                    <div>
                      <h1 className="font-semibold text-gray-700">
                        Select Equity Funds
                      </h1>
                      <div className="mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                        {/* Equity Funds checkboxes here */}
                        {assetCategory
                          ?.filter((item) => item.nav_c2 === "Equity")
                          .map((scheme, index) => (
                            <div key={index} className="flex items-center mb-1">
                              <input
                                type="checkbox"
                                id={`asset-${index}`}
                                checked={selectedAssets.has(
                                  scheme.assets_class
                                )}
                                onChange={() => handleAssetSelect(scheme)}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`asset-${index}`}
                                className="text-stone-900 text-sm"
                              >
                                Equity - {scheme?.assets_class}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h1 className="font-semibold text-gray-700">
                        Select Debt Funds
                      </h1>
                      <div className="mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                        {assetCategory
                          ?.filter((item) => item.nav_c2 === "Debt")
                          .map((scheme, index) => (
                            <div key={index} className="flex items-center mb-1">
                              <input
                                type="checkbox"
                                id={`asset-${index}`}
                                checked={selectedAssets.has(
                                  scheme.assets_class
                                )}
                                onChange={() => handleAssetSelect(scheme)}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`asset-${index}`}
                                className="text-stone-900 text-sm"
                              >
                                Debt - {scheme?.assets_class}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h1 className="font-semibold text-gray-700">
                        Select Hybrid Funds
                      </h1>
                      <div className="mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                        {/* Hybrid Funds checkboxes here */}
                        {assetCategory
                          ?.filter((item) => item.nav_c2 === "Hybrid")
                          .map((scheme, index) => (
                            <div key={index} className="flex items-center mb-1">
                              <input
                                type="checkbox"
                                id={`asset-${index}`}
                                checked={selectedAssets.has(
                                  scheme.assets_class
                                )}
                                onChange={() => handleAssetSelect(scheme)}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`asset-${index}`}
                                className="text-stone-900 text-sm"
                              >
                                Hybrid - {scheme?.assets_class}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                    <div>
                      <h1 className="font-semibold text-gray-700">
                        Select Commodity Funds/ Others
                      </h1>
                      <div className="mt-2 border border-gray-300 p-3 rounded h-60 overflow-y-auto">
                        {assetCategory
                          ?.filter(
                            (item) =>
                              item.nav_c2 === "Other " ||
                              item.nav_c2 === "Others" ||
                              item.nav_c2 === "Sol Oriented"
                          )
                          .map((scheme, index) => (
                            <div key={index} className="flex items-center mb-1">
                              <input
                                type="checkbox"
                                id={`asset-${index}`}
                                checked={selectedAssets.has(
                                  scheme.assets_class
                                )}
                                onChange={() => handleAssetSelect(scheme)}
                                className="mr-2"
                              />
                              <label
                                htmlFor={`asset-${index}`}
                                className="text-stone-900 text-sm"
                              >
                                Other - {scheme?.assets_class}
                              </label>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <hr />
              <div className="grid grid-cols-1 lg:grid-cols-6">
                <div className="col-span-2 mt-2 overflow-y-auto p-2">
                  {/* Dropdown for selecting a scheme */}
                  <div className="mb-4">
                    <label
                      htmlFor="schemeSelect"
                      className="text-sm block font-semibold text-gray-700 mb-1"
                    >
                      Select Scheme
                    </label>
                    <select
                      id="schemeSelect"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      onChange={(e) => {
                        const selectedScheme = schemesData?.data?.find(
                          (scheme) => scheme.funddes === e.target.value
                        );
                        setPcode(selectedScheme?.pcode);
                        setTitle(selectedScheme?.funddes);
                      }}
                    >
                      <option value="" selected>
                        Choose a scheme
                      </option>
                      {schemesData
                        ? schemesData &&
                          schemesData?.data?.map((scheme, index) => (
                            <option key={index} value={scheme?.funddes}>
                              {scheme?.funddes}
                            </option>
                          ))
                        : "Loading..."}
                    </select>
                  </div>
                </div>
                <div className="col-span-2 mt-2 overflow-y-auto p-2">
                  {/* Text input for scheme name */}
                  <div className="mb-4">
                    <label
                      htmlFor="schemeName"
                      className="text-sm block font-semibold text-gray-700 mb-1"
                    >
                      SIP Amount (Monthly)
                    </label>
                    <input
                      type="number"
                      id="schemeName"
                      placeholder="Enter scheme name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={sipAmount}
                      onChange={(e) => setSipAmount(e.target.value)}
                    />
                  </div>
                </div>

                {/* Date input for selecting a date */}
                <div className="col-span-2 mt-2 overflow-y-auto p-2">
                  <div className="mb-4">
                    <label
                      htmlFor="schemeDate"
                      className="text-sm block font-semibold text-gray-700 mb-1"
                    >
                      SIP Start Date
                    </label>
                    <input
                      type="date"
                      id="schemeDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      value={startsipDate}
                      onChange={(e) => setStartSipDate(e.target.value)}
                    />
                  </div>
                </div>
                {/* Date input for selecting a date */}
                <div className="col-span-2 mt-2 overflow-y-auto p-2">
                  <div className="mb-4">
                    <label
                      htmlFor="schemeDate"
                      className="text-sm block font-semibold text-gray-700 mb-1"
                    >
                      SIP End Date
                    </label>
                    <input
                      type="date"
                      id="schemeDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      min={startsipDate}
                      value={endsipDate}
                      onChange={(e) => setEndSipDate(e.target.value)}
                    />
                  </div>
                </div>
                {/* Date input for selecting a date */}
                <div className="col-span-2 mt-2 overflow-y-auto p-2">
                  <div className="mb-4">
                    <label
                      htmlFor="schemeDate"
                      className="text-sm block font-semibold text-gray-700 mb-1"
                    >
                      Valuation As On
                    </label>
                    <input
                      type="date"
                      id="schemeDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      min={endsipDate}
                      max={getTodayDate()}
                      value={valuationDate}
                      onChange={(e) => setValuationDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <Button
                className="bg-[var(--rv-secondary)] text-[var(--rv-primary)] hover:bg-[var(--rv-primary)]  hover:text-white"
                onClick={() => haldleSubmit()}
                // disabled={!pcode} // disables when pcode is falsy (empty, null, undefined)
              >
                Show
              </Button>
            </div>
          </div>
          <div className="col-span-1">
            {graphData && (
              <div className="mb-5 flex justify-between">
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    className={`border-2 ${
                      viewby === "graph" ? "border-blue-600" : "border-gray-600"
                    } uppercase font-semibold text-gray-800`}
                    onClick={() => setViewBy("graph")}
                  >
                    Graph
                  </Button>
                  <Button
                    variant="outline"
                    className={`border-2 ${
                      viewby === "table" ? "border-blue-600" : "border-gray-600"
                    } uppercase font-semibold text-gray-800`}
                    onClick={() => setViewBy("table")}
                  >
                    Table
                  </Button>
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() =>
                    handlePdf(
                      result.sipData,
                      title,
                      startsipDate,
                      valuationDate
                    )
                  }
                >
                  <h1 className="text-2xl">
                    <FaFilePdf />
                  </h1>
                </div>
              </div>
            )}
            {result ? (
              viewby === "graph" ? (
                <div id="graphId">
                  <div>
                    {" "}
                    {/* Adjust width as needed */}
                    {graphData && (
                      <SipPerformanceChart
                        piedata={result}
                        startDate={startsipDate}
                        endDate={valuationDate}
                        title={title}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div>{graphData && <SipPerformanceTable data={result} />}</div>
              )
            ) : (
              <div>No Data Found</div>
            )}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
