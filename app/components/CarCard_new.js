export default function CarCard_new({handleCardClick, car}) {
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
            <div>
            <h2 className="text-xl font-bold mb-2">
                {car.make} {car.model}
            </h2>
            <p className="text-gray-600">{car.instock && "IN STOCK"}</p>
            </div>
            <div className="mt-auto">
            <p className="text-gray-400">
                Save £{car.saving}{" "}
                <span className="text-red-600 text-sm">£{car.price + car.saving}</span>
            </p>
            <p className="text-black-600">£{car.price}</p>
            <p className="text-gray-600">Distance: {car.distance} miles</p>
            </div>
        </div>
    </div>
  )
}