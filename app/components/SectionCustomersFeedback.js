export default function SectionCustomersFeedback() {
    return (
        <section className="bg-white rounded-lg mb-16 py-16">
            <h2 className="text-3xl font-bold text-center mb-12 dark:text-black">Join our happy customers</h2>
            <div className="flex flex-wrap justify-center gap-8 px-4">
                {/* Feedback Block 1 */}
                <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
                <p className="text-gray-700 italic mb-4">
                    &quot;The process was so easy! I sold my car within a week and got a great price.&quot;
                </p>
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-gray-500 font-bold">- John Doe</p>
                </div>
        
                {/* Feedback Block 2 */}
                <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
                <p className="text-gray-700 italic mb-4">
                    &quot;I loved how simple it was to place an ad. Highly recommend Car Traders!&quot;
                </p>
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-gray-500 font-bold">- Jane Smith</p>
                </div>
        
                {/* Feedback Block 3 */}
                <div className="bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-sm">
                <p className="text-gray-700 italic mb-4">
                    &quot;Selling my car to dealers through Car Traders was quick and hassle-free.&quot;
                </p>
                <div className="flex items-center mb-4">
                    <span className="text-yellow-500">★★★★★</span>
                </div>
                <p className="text-gray-500 font-bold">- Mike Johnson</p>
                </div>
            </div>
        </section>
    );
}