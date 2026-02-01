import Layout from "./components/Layout";
import HeroSection_home from "./components/HeroSection_home";
import SectionDiscover from "./components/SectionDiscover";

export default function Home() {
    console.log("Rendering Home Page");

    return (
        <Layout>
            <HeroSection_home />
            <SectionDiscover />
        </Layout>
    );
}
