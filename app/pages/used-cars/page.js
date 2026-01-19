"use client";

import Layout from "../../components/Layout";

export default function UsedCars() {
  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gray-500 text-white text-center py-16 relative rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Used Cars</h1>
          <p className="text-lg">Find the best deals on pre-owned cars.</p>

          {/* Search Button */}
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-12%]">
            <button
              className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all shadow-lg border-4 border-white"
              onClick={() => console.log("Search button clicked")} // Replace with your search functionality
            >
              Search
            </button>
          </div>
        </section>

        {/* Customer Feedback Section */}
        <section className="bg-white py-16">
          <h2 className="text-3xl font-bold text-center mb-12">What our customers say</h2>
          <div className="flex flex-wrap justify-center gap-8 px-4">
            {/* Feedback Block 1 */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
              <p className="text-gray-700 italic mb-4">
                "I found the perfect used car at an amazing price. Highly recommend!"
              </p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-500 font-bold">- Sarah Williams</p>
            </div>

            {/* Feedback Block 2 */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
              <p className="text-gray-700 italic mb-4">
                "Selling my used car was so easy. The platform is very user-friendly."
              </p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-500 font-bold">- Michael Brown</p>
            </div>

            {/* Feedback Block 3 */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
              <p className="text-gray-700 italic mb-4">
                "Great selection of used cars. I found exactly what I was looking for!"
              </p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-500 font-bold">- Emily Davis</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}