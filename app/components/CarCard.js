import Link from "next/link";

export default function CarCard({ car }) {
  return (
    <div className="border p-4 rounded">
      <h3 className="text-xl font-semibold">{car.name}</h3>
      <p className="text-gray-500">{car.price}</p>
      <Link
        href={`/cars/${car.id}`}
        className="text-blue-600 underline"
      >
        View Details
      </Link>
    </div>
  );
}
