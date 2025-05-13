"use client";
import { footerData } from "@/data/footer";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function PrivacyPolicy() {
    const [data, setData] = useState('');
    const [mainData, setMainData] = useState("");
    const fetchdata = async () => {
        const data = await fetch("/api/admin/site-settings");
        if (data.ok) {
            const maindata = await data.json();
            setMainData(maindata[0])
        }
    };
    const fetchPolicy = async () => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_DATA_API}/api/open-apis/privacy-policy?apikey=${process.env.NEXT_PUBLIC_API_KEY}`);
            if (response.status === 200 && response.data && response.data[0]) {
                const data = response.data[0];
                setData(data.pvp);
            } else {
                console.error("Invalid data format:", response.data);
                alert("Failed to fetch services. Please try again.");
            }
        } catch (error) {
            console.error("Error fetching services:", error);
            alert("An error occurred while fetching services. Please try again.");
        }
    };
    useEffect(() => { fetchPolicy(); }, []);
    useEffect(() => { fetchdata(); }, []);

    function createMarkup() {
        const highlightedText = data
            .replace(/Your Company name/gi, `<mark style="background-color: white; font-size: 16px">${mainData?.title}</mark>`)
            .replace(/What we collect/gi, '<br><mark style="background-color: white; font-size: 25px">What we collect</mark> <br/>')
            .replace(/Name and contact details/gi, '<br><mark style="background-color: white; font-size: 25px">Name and contact details</mark>')
            .replace(/Collection Use of image data/gi, '<br><mark style="background-color: white; font-size: 25px">Collection Use of image data</mark>')
            .replace(/Use of location data/gi, '<br><mark style="background-color: white; font-size: 25px">Use of location data</mark>')
            .replace(/Security/, '<br><mark style="background-color: white; font-size: 25px">Security</mark>')
            .replace(/Links to other websites/, '<br><mark style="background-color: white; font-size: 25px">Links to other websites</mark>')
            .replace(/Controlling your personal information/gi, '<br><mark style="background-color: white; font-size: 25px">Controlling your personal information</mark>')
            .replace(/Security certificates/gi, '<br><mark style="background-color: white; font-size: 25px">Security certificates</mark>')
        return { __html: highlightedText };
    }

    return (
        <div className="text-gray-700 mx-auto container my-10 lg:px-40 md:px-20 px-10">
            <p dangerouslySetInnerHTML={createMarkup()} />
        </div>
    );
}
