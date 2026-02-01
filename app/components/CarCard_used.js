import Image from "next/image";

export default function CarCard_used({handleCardClick, car}) {
    return (
      <div
        className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col max-w-[300px] w-full mx-auto cursor-pointer"
        onClick={() => handleCardClick(car)}
        >
          <div className="relative w-full h-48">
            <Image
                src={car.image}
                alt={`${car.make} ${car.model}`}
                className="object-cover"
                loading="eager"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
            />
          </div>
          <div className="p-4 flex flex-col justify-between flex-1">
            {/* Car Details */}
            <div>
                <h2 className="text-xl font-bold mb-2 dark:text-black">
                {car.make} {car.model}
                </h2>
                <p className="text-gray-600">{car.instock && "IN STOCK"}</p>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto">
                <p className="text-black-600 dark:text-black">£{car.price}</p>
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