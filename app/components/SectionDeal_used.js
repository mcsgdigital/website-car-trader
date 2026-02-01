import Image from "next/image";

export default function SectionDeal_used({ data, title, description}) {
    return (
      <section className="bg-gray-100 py-8 mt-20 mb-16 rounded-lg">
        <h2 className="text-3xl font-bold text-left mb-2 ml-5 dark:text-black">{title}</h2>
        <p className="text-left text-gray-600 mb-6 ml-5">
        {description}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8 px-4">
          {data.map((deal) => (
            <div
              key={deal.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
            >
              <div className="relative w-full h-48">
                <Image
                    src={deal.image}
                    alt={deal.make + " " + deal.model}
                    className="object-cover"
                    loading="eager"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"  
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2 dark:text-black">{deal.makeModel}</h3>
                <p className="text-xl text-green-600 font-bold mb-2">
                £{Number(deal.price.replace(/[^0-9.-]+/g, "")).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Year: {deal.year}</p>
                <p className="text-sm text-gray-600">Mileage: {deal.mileage}</p>
                <p className="text-sm text-gray-600">Engine: {deal.enginesize}L</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
}