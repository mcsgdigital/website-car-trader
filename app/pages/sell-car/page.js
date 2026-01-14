import Layout from "../../components/Layout";

export default function SellCar() {
  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-green-500 text-white text-center py-16">
          <h1 className="text-4xl font-bold mb-4">Sell your car</h1>
          <p className="text-lg">List your car for sale and connect with buyers.</p>
        </section>

        {/* Overlapping Boxes */}
        <div className="relative -mt-12 flex justify-center gap-8 px-4">
          {/* Box 1: Advertise on Car Traders */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Advertise on Car Traders</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Reach thousands of buyers</li>
              <li>Easy-to-use ad tools</li>
              <li>Boost your car&apos;s visibility</li>
            </ul>
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all">
              Place ad
            </button>
          </div>

          {/* Box 2: Sell fast to dealers */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold mb-4">Sell fast for free</h2>
            <ul className="list-disc list-inside text-gray-700 mb-6">
              <li>Instant offers from dealers</li>
              <li>No ad placement required</li>
              <li>Quick and hassle-free process</li>
            </ul>
            <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all">
              Sell for free
            </button>
          </div>
        </div>

        {/* Customer Feedback Section */}
        <section className="bg-white py-16">
          <h2 className="text-3xl font-bold text-center mb-12">Join our happy customers</h2>
          <div className="flex flex-wrap justify-center gap-8 px-4">
            {/* Feedback Block 1 */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
              <p className="text-gray-700 italic mb-4">
                "The process was so easy! I sold my car within a week and got a great price."
              </p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-500 font-bold">- John Doe</p>
            </div>

            {/* Feedback Block 2 */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
              <p className="text-gray-700 italic mb-4">
                "I loved how simple it was to place an ad. Highly recommend Car Traders!"
              </p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-500 font-bold">- Jane Smith</p>
            </div>

            {/* Feedback Block 3 */}
            <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
              <p className="text-gray-700 italic mb-4">
                "Selling my car to a dealer was quick and hassle-free. Great experience overall!"
              </p>
              <div className="flex items-center mb-4">
                <span className="text-yellow-500">★★★★★</span>
              </div>
              <p className="text-gray-500 font-bold">- Alex Johnson</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
