import Footer from "@/components/footer/footer";
import Navbar from "@/components/header/header";
import WebPopup from "@/components/webpopup";
import AnimatedCursor from "react-animated-cursor"
// import UpdatePopup from "@/components/updatepopup";

export default async function Layout({ children }) {
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
            <Navbar />
            {children}
            <Footer />
            {/* <UpdatePopup /> */}
            <WebPopup />
        </div>
    );
}