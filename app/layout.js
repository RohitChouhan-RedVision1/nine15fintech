// import { Poppins } from "next/font/google";
import "./globals.css";
import RenewalPopup from "@/components/renewalPopup";
import { SubscriptionProvider } from "@/context/SubscriptionContext";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next"

// const poppins = Poppins({
//   subsets: ["latin"],
//   display: "swap",
//   weight: ["400", "600", "700"], // You can adjust the weights as needed
// });

export const dynamic = "force-dynamic";
export const metadata = {
  title: {
    default: "NINE15 FINTECH SERVICES LLP",
    template: "%s - NINE15 FINTECH SERVICES LLP",
  },
  description:
    "Welcome to NINE15 FINTECH SERVICES LLP, your trusted financial companion in India. We are in mutual funds distribution services since ten years, we understand that your financial journey is more than just numbers; it's a story of dreams, aspirations, and the legacy you want to leave behind. At NINE15 FINTECH SERVICES LLP, we are driven by the belief that everyone deserves a secure and prosperous future.",
  twitter: {
    card: "summary_large_image",
  },
  author: "NINE15 FINTECH SERVICES LLP",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` `}>
        <SubscriptionProvider>
  <SpeedInsights/>
          {/* <RenewalPopup /> */}
          <div className="bg-white">
            {children}
          </div>
        </SubscriptionProvider>
      </body>
    </html>
  );
}
