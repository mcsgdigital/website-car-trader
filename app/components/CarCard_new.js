import Image from "next/image";

export default function CarCard_new({handleCardClick, car}) {
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
            <div>
            <h2 className="text-xl font-bold mb-2 dark:text-black">
                {car.make} {car.model}
            </h2>
            <p className="text-gray-600">{car.instock && "IN STOCK"}</p>
            </div>
            <div className="mt-auto">
            <p className="text-gray-400">
                Save £{car.saving}{" "}
                <span className="text-red-600 text-sm">£{car.price + car.saving}</span>
            </p>
            <p className="text-black-600 dark:text-black">£{car.price}</p>
            <p className="text-gray-600">Distance: {car.distance} miles</p>
            </div>
        </div>
    </div>
  )
}