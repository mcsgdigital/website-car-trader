import Image from "next/image";
import { basePath } from "../../next.config";

export default function HeroSection_home() {
    console.log("Rendering HeroSection_home component");
    
    return (
        <section
            className="relative flex items-center justify-center h-[27vh] bg-cover bg-center bg-no-repeat rounded-lg"
            style={{ backgroundImage: `url(${basePath}/images/home-hero.jpeg)` }}
        >
            {/* Left Content */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white md:left-8">
                <h1 className="text-2xl md:text-4xl font-bold mb-2">
                    SEAT Arona
                </h1>
                <p className="text-sm md:text-lg mb-4 mr-4">
                    Compact SUV with a bold design. Starting at just{" "}
                    <span className="font-bold">£199/month</span>.
                </p>
                <button className="bg-green-500 text-white py-1 px-3 md:py-2 md:px-4 text-sm md:text-base rounded hover:bg-green-600 transition-all">
                    Discover more
                </button>
            </div>

            {/* Logo Image */}
            <Image
                src={`${basePath}/images/home-hero-logo.png`}
                alt="Home Hero Logo"
                className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-16 md:w-24 h-auto"
                loading="eager"
                width={96}
                height={76}
            />
        </section>
    );
}