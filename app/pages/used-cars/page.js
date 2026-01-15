"use client";

import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

export default function UsedCars() {
  const [usedCars, setUsedCars] = useState([]); // State to store the car data
  const [carImages, setCarImages] = useState([]); // State to store images from Unsplash

  // Fetch the JSON data from the public folder
  useEffect(() => {
    const fetchUsedCars = async () => {
      try {
        const response = await fetch("/mock_used.json"); // Fetch from public folder
        const data = await response.json();
        setUsedCars(data); // Update state with fetched data

        // Fetch images from Unsplash
        const images = await fetchCarImages();
        setCarImages(images);
      } catch (error) {
        console.error("Error fetching used cars data:", error);
      }
    };

    fetchUsedCars();
  }, []);

  // Fetch car images from Unsplash
  const fetchCarImages = async () => {
    const accessKey = process.env.NEXT_PUBLIC_UNSPLASH_KEY; // Use Unsplash Access Key from environment variables
    const images = [];

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=cars&per_page=10&page=3`,
        {
          headers: {
            Authorization: `Client-ID ${accessKey}`,
          },
        }
      );
      const data = await response.json();
      images.push(...data.results.map((result) => result.urls.small)); // Extract image URLs
    } catch (error) {
      console.error("Error fetching images from Unsplash:", error);
    }

    return images;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search submitted");
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gray-200 text-black text-center py-16 relative rounded-lg">
        <h1 className="text-4xl font-bold mb-4">Used Cars</h1>
        <p className="text-lg">Find the best deals on pre-owned cars.</p>

        {/* Overlapping Search Bar */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-12 bg-white shadow-lg rounded-lg p-4 w-11/12 max-w-4xl">
          <form
            className="flex flex-wrap items-center gap-4"
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Postcode"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Make"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Model"
              className="flex-1 p-2 border border-gray-300 rounded"
            />
            <button
              type="submit"
              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition-all"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Page Content */}
      <div className="p-8 mt-20">
        <h2 className="text-2xl font-bold mb-4">Explore Our Collection</h2>
        <p>Browse through a wide range of high-quality used cars.</p>

        {/* Car Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {usedCars.slice(0, 4).map((car, index) => (
            <div
              key={car.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <img
                src={carImages[index] || "/placeholder.jpg"} // Use Unsplash image or placeholder
                alt="Car"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">
                  {car.make} {car.model}
                </h3>
                <p className="text-sm text-gray-600">Year: {car.year}</p>
                <p className="text-sm text-gray-600">
                  Mileage: {car.mileage.toLocaleString()} miles
                </p>
                <p className="text-sm text-gray-600">Engine: {car.enginesize}L</p>
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}