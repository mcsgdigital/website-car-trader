import Layout from "./components/Layout";
import HeroSection_home from "./components/HeroSection_home";
import SectionDiscover from "./components/SectionDiscover";

export default function Home() {
    return (
        <Layout>
            <HeroSection_home />
            <SectionDiscover />
        </Layout>
    );
}
