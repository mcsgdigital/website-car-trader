import Image from "next/image";

export default function CarCard_lightbox_new({ car, closeLightbox }) {
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-8 relative h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={closeLightbox}
            >
              ✕
            </button>

            {/* Gallery Section */}
            <div className="mb-8 relative w-full h-64">
              <Image
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="object-cover rounded-lg shadow-lg"
                  loading="eager"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
              />
              <button
                className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Gallery
              </button>
            </div>

            {/* Two-Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-gray-600">Location: {car.city}</p>
                </div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold dark:text-black">
                    {car.make} {car.model}
                  </h2>
                  <p className="text-gray-600">Price: £{car.price}</p>
                </div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold dark:text-gray-400">Overview</h3>
                  <p className="text-gray-600">Year: {car.year}</p>
                  <p className="text-gray-600">Gearbox: {car.gearbox ? "Manual" : "Automatic"}</p>
                  <p className="text-gray-600">Mileage: {car.mileage}</p>
                  <p className="text-gray-600">Engine: {car.enginesize}L</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold dark:text-gray-400">Description</h3>
                  <p className="text-gray-600">
                    This is a high-quality car with excellent features, perfect for your needs.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="sticky top-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4">Contact Seller</h3>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-4">
                    Call: {car.contact_phone}
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}