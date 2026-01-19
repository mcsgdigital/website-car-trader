import Layout from "./components/Layout";

export default function Home() {
    return (
        <Layout>
            {/* Hero Section */}
            <section
                className="relative flex items-center justify-center h-[27vh] bg-cover bg-center bg-no-repeat rounded-lg"
                style={{ backgroundImage: "url('/images/home-hero.jpeg')" }}
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
                <img
                    src="/images/home-hero-logo.png"
                    alt="Home Hero Logo"
                    className="absolute bottom-2 right-2 md:bottom-4 md:right-4 w-16 md:w-24 h-auto"
                />
            </section>

            {/* Cards Section */}
            <h2 className="text-center text-3xl font-bold mt-16 mb-8">
                Discover more from Car Traders
            </h2>
            <div className="w-11/12 max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 mx-auto">
                {/* Card 1 */}
                <div className="md:col-span-6 bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src="/images/service-1.jpg"
                        alt="Service 1"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">
                            Premium Car Services
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Get the best maintenance and repair services for
                            your car.
                        </p>
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="md:col-span-3 bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src="/images/service-2.jpg"
                        alt="Service 2"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">
                            Car Financing
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Flexible financing options to help you own your
                            dream car.
                        </p>
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Learn More
                        </button>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="md:col-span-3 bg-white shadow-lg rounded-lg overflow-hidden">
                    <img
                        src="/images/service-3.jpg"
                        alt="Service 3"
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2">
                            Trade-In Offers
                        </h3>
                        <p className="text-gray-600 mb-4">
                            Trade in your old car and get the best value for it.
                        </p>
                        <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600">
                            Learn More
                        </button>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
