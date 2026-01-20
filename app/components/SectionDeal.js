export default function SectionDeal({ title, description, data }) {
    return (
        <section className="bg-gray-100 py-16 mt-20 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-12">{title}</h2>
            <p className="text-center text-gray-600 mb-12">
              {description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8 px-4">
              {data.map((car) => (
                <div
                  key={car.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={car.image}
                    alt={car.makeModel}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      {/* Left Column: Price */}
                      <div className="text-left">
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-2xl font-bold text-green-500">{car.price.split("/")[0]}</p>
                        <p className="text-xs text-gray-500">Per month (inc. VAT)</p>
                      </div>

                      {/* Right Column: Details */}
                      <div className="text-sm text-gray-600 flex flex-col gap-1">
                        <p className="whitespace-nowrap">
                          <span className="font-bold">{car.initialPayment.split(" ")[0]}</span>{" "}
                          {car.initialPayment.split(" ").slice(1).join(" ")}
                        </p>
                        <p className="whitespace-nowrap">
                          <span className="font-bold">{car.contract.split(" ")[0]}</span>{" "}
                          {car.contract.split(" ").slice(1).join(" ")}
                        </p>
                        <p className="whitespace-nowrap">
                          <span className="font-bold">{car.mileage.split(" ")[0]}</span>{" "}
                          {car.mileage.split(" ").slice(1).join(" ")}
                        </p>
                      </div>
                    </div>

                    <hr className="border-t border-gray-200 my-4" />

                    <h3 className="text-lg font-bold mb-2">{car.makeModel}</h3>
                    <p className="text-gray-600">{car.spec}</p>
                  </div>
                </div>
              ))}
            </div>
        </section>
    );
}