export default function CarCard_used({handleCardClick, car}) {
    return (
      <div
        className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col max-w-[300px] w-full mx-auto cursor-pointer"
        onClick={() => handleCardClick(car)}
        >
        <img
            src={car.image}
            alt={`${car.make} ${car.model}`}
            className="w-full h-48 object-cover"
            loading="lazy"
        />
          <div className="p-4 flex flex-col justify-between flex-1">
            {/* Car Details */}
            <div>
                <h2 className="text-xl font-bold mb-2">
                {car.make} {car.model}
                </h2>
                <p className="text-gray-600">{car.instock && "IN STOCK"}</p>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto">
                <p className="text-black-600">£{car.price}</p>
                <p className="text-sm text-gray-600">Mileage: {car.mileage.toLocaleString()} miles</p>
                <p className="text-sm text-gray-600">Year: {car.year}</p>
                <p className="text-sm text-gray-600">Engine: {car.engine}L</p>
                <p className="text-sm text-gray-600">Gearbox: {car.gearbox ? "Manual" : "Automatic"}</p>
                <p className="text-sm text-gray-600">Location: {car.city}</p>
            </div>
        </div>
      </div>
    )
  }