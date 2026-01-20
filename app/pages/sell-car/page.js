import Layout from "../../components/Layout";
import SectionCustomersFeedback from "../../components/SectionCustomersFeedback";

export default function SellCar() {
  return (
    <Layout>
      <div className="min-h-screen ">
        {/* Hero Section */}
        <section className="bg-green-500 text-white text-center py-16 rounded-lg">
          <h1 className="text-4xl font-bold mb-4">Sell your car</h1>
          <p className="text-lg">List your car for sale and connect with buyers.</p>
        </section>

        {/* Overlapping Boxes */}
        <div className="relative -mt-12 flex flex-col md:flex-row justify-center gap-8 px-4">
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
        <SectionCustomersFeedback />
        
      </div>
    </Layout>
  );
}
