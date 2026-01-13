"use client";
import { useEffect, useState } from "react";

export default function SellCar() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/toyota?format=json"
    )
      .then((res) => res.json())
      .then((data) => {
        setCars(data.Results.slice(0, 20)); // limit for demo
        setLoading(false);
        console.log("Fetched car models:", data.Results);
        
      });
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Sell Your Car</h1>
        <p>Loading car models...</p>
      </div>
    );
  }

  return (
    <div className="container">

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-4">Sell Your Car</h1>
        <p>List your car for sale and connect with buyers.</p>
      </div>
      
      <h1>Car Listings</h1>

      <div className="grid">
        {cars.length > 0 && cars.map((car) => (
          <div key={car.Model_ID} className="card">
            <img
              src={`https://images.unsplash.com/featured/?${car.Make_Name},${car.Model_Name},car`}
              alt={`${car.Make_Name} ${car.Model_Name}`}
              loading="lazy"
            />
            <h3>{car.Make_Name}</h3>
            <p>{car.Model_Name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
