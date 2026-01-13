import CarCard from "../CarCard";

const cars = [
  { id: 1, name: "Ford Mustang", price: "$45,000" },
  { id: 2, name: "BMW M3", price: "$60,000" },
];

export default function Cars() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {cars.map(car => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
}
