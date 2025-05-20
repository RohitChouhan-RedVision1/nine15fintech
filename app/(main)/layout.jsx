import Footer from "@/components/footer/footer";
import Navbar from "@/components/header/header";
import WebPopup from "@/components/webpopup";
import { getArn, getServiceData, getSiteData, getSocialMedia } from "@/lib/functions";
// import UpdatePopup from "@/components/updatepopup";

export default async function Layout({ children }) {
    const services=await getServiceData();
    const siteData=await getSiteData();
    const socialMedia=await getSocialMedia();
    const arnData=await getArn()
    return (
        <div>
            {/* <AnimatedCursor
                innerSize={8}
                outerSize={12}
                color="43, 209, 25"
                outerAlpha={0.5}
                innerScale={1}
                outerScale={5}
                showSystemCursor={true}
                clickables={[
                    'button',
                    'h1',
                    'h2',
                    'h3',
                    '.link',
                    '[data-cursor-text]'
                ]}
                outerStyle={{
                    mixBlendMode: 'exclusion'
                }}
                innerStyle={{
                    backgroundColor: 'var(--accent-color)'
                }}
            /> */}
            <Navbar services={services} />
            {children}
            <Footer services={services} siteData={siteData} socialMedia={socialMedia} arnData={arnData} />
            {/* <UpdatePopup /> */}
            <WebPopup />
        </div>
    );
}