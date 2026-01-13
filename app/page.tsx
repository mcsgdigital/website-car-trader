export default function Home() {
    return (
        <>
            {/* Hero Section with Cards */}
            <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                {/* Hero Content */}
                <div className="w-11/12 max-w-6xl bg-white rounded-lg shadow-lg p-8 flex mt-[5%]">
                    {/* Form Section */}
                    <div className="w-1/3 pr-8">
                        <h2 className="text-2xl font-bold mb-4">
                            Find Your Dream Car
                        </h2>
                        <form className="space-y-4">
                            <input
                                type="text"
                                placeholder="Enter car model"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <input
                                type="text"
                                placeholder="Enter location"
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                            >
                                Search
                            </button>
                        </form>
                    </div>

                    {/* Cars and Message Section */}
                    <div className="w-2/3 relative flex justify-center">
                        {/* Rounded Box with Message */}
                        <div className="absolute bg-gray-800 text-white rounded-lg p-4 text-center w-1/2 h-2/3 -top-2">
                            <p className="text-lg font-semibold">
                                Choose a car
                            </p>
                            <p className="text-sm font-normal text-zinc-300">
                                Largest selection of vehicles
                            </p>
                            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Browse
                            </button>
                        </div>

                        {/* Cars Images */}
                        <div className="flex justify-around w-full z-10 mt-15">
                            <img
                                src="/images/car-2.png"
                                alt="Car 1"
                                className="w-3/8 object-contain"
                            />
                            <img
                                src="/images/car-1.png"
                                alt="Car 2"
                                className="w-3/8 object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                <h2 className="text-center text-3xl font-bold mt-16 mb-8">
                    Discover more from Car Traders
                </h2>
                <div className="w-11/12 max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
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
                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
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
                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
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
                                Trade in your old car and get the best value for
                                it.
                            </p>
                            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                                Learn More
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
