import Image from "next/image";

export default function SectionDiscover() {

    return (
        <div className="mb-16">
            <h2 className="text-center text-3xl font-bold mt-16 mb-8">
                Discover more from Car Traders
            </h2>
            <div className="w-11/12 max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 mx-auto">
                {/* Card 1 */}
                <div className="md:col-span-6 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative w-full h-48">
                        <Image
                            src="images/service-1.jpg"
                            alt="Service 1"
                            className="object-cover"
                            loading="eager"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 dark:text-black">
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
                    <div className="relative w-full h-48">
                        <Image
                            src="images/service-2.jpg"
                            alt="Service 2"
                            className="object-cover"
                            loading="eager"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 dark:text-black">
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
                    <div className="relative w-full h-48">
                        <Image
                            src="images/service-3.jpg"
                            alt="Service 3"
                            className="object-cover"
                            loading="eager"
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>
                    <div className="p-4">
                        <h3 className="text-xl font-bold mb-2 dark:text-black">
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
        </div>
    );
}