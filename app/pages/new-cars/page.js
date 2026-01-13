"use client";
import { useState, useEffect, useCallback } from "react";

export default function NewCars() {
  const [cars, setCars] = useState([]); // State to store loaded cars
  const [totalCars, setTotalCars] = useState(0); // State to store the total number of cars
  const [showGallery, setShowGallery] = useState(false); // State to toggle between hero and gallery
  const [selectedCar, setSelectedCar] = useState(null); // State to store the selected car for the lightbox
  const [page, setPage] = useState(1); // State to track the current page
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [hasMore, setHasMore] = useState(true); // State to track if more cars are available

  // Function to handle the "Search" button click
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch("/mock_cars.json"); // Load JSON from public folder
      const data = await response.json();
      console.log("Cars data loaded:", data); // Debugging log

      setTotalCars(data.length); // Set the total number of cars
      setCars(data.slice(0, 10)); // Display the first 10 cars initially
      replaceImages(data.slice(0, 10), 1); // Fetch images for the first page
      setShowGallery(true); // Show the gallery
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  };

  // Function to fetch Unsplash images and replace car images
  const replaceImages = async (data, page) => {
    try {
      setIsLoading(true); // Set loading state
      const unsplashResponse = await fetch(
        `https://api.unsplash.com/search/photos?query=cars&per_page=10&page=${page}`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
          },
        }
      );
      const unsplashData = await unsplashResponse.json();
      console.log("Unsplash API response:", unsplashData);

      if (unsplashData.results.length === 0) {
        setHasMore(false); // No more images available
        return;
      }

      // Map over the new cars and add images from Unsplash
      const newCars = data.map((car, index) => {
        if (unsplashData.results[index]) {
          return {
            ...car, // Keep existing car properties
            image: unsplashData.results[index].urls.small, // Add Unsplash image
          };
        }
        return car;
      });

      // Append the new cars to the existing cars without modifying the old ones
      setCars((prevCars) => [...prevCars, ...newCars]);
    } catch (error) {
      console.error("Error fetching from Unsplash:", error);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  // Function to load more cars when scrolling
  const loadMoreCars = useCallback(() => {
    if (!isLoading && hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment the page number
    }
  }, [isLoading, hasMore]);

  // Use Effect to fetch more cars when the page changes
  useEffect(() => {
    if (page > 1) {
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10;
      replaceImages(cars.slice(startIndex, endIndex), page); // Fetch the next page of images
    }
  }, [page]);

  // Use IntersectionObserver to detect when the user scrolls to the bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMoreCars(); // Load more cars when the bottom is visible
        }
      },
      { threshold: 1.0 }
    );

    const sentinel = document.querySelector("#scroll-sentinel");
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
    };
  }, [loadMoreCars]);

  // Function to handle clicking on a car card
  const handleCardClick = (car) => {
    setSelectedCar(car); // Set the selected car
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setSelectedCar(null); // Clear the selected car
  };

  return (
    <div className="relative">
      {/* If showGallery is false, display the Hero Section */}
      {!showGallery ? (
        <>
          {/* Hero Section */}
          <div className="bg-green-500 text-white text-center py-16">
            <h1 className="text-4xl font-bold mb-4">New Cars</h1>
            <p className="text-lg">Meet your perfect car</p>
          </div>

          {/* Overlapping Search Bar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-8 bg-white shadow-lg rounded-lg p-4 w-11/12 max-w-4xl">
            <form
              className="flex flex-wrap items-center gap-4"
              onSubmit={handleSearch}
            >
              {/* Postcode Input */}
              <input
                type="text"
                placeholder="Postcode"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              {/* Make Input */}
              <input
                type="text"
                placeholder="Make"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              {/* Model Input */}
              <input
                type="text"
                placeholder="Model"
                className="flex-1 p-2 border border-gray-300 rounded"
              />
              {/* Search Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
              >
                Search
              </button>
            </form>
          </div>
        </>
      ) : (
        // If showGallery is true, display the Gallery
        <div
          className="p-8 h-[80vh] overflow-y-auto" // Make the gallery scrollable
          id="scrollable-gallery"
        >
          <h1 className="text-3xl font-bold mb-8">Available Cars</h1>
          {/* Number of Results */}
          <p className="text-gray-600 mb-8">
            See {cars.length} of {totalCars} {totalCars === 1 ? "result" : "results"} found
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {cars.map((car, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col max-w-[300px] w-full mx-auto cursor-pointer"
                onClick={() => handleCardClick(car)}
              >
                {/* Car Image */}
                <img
                  src={car.image}
                  alt={`${car.make} ${car.model}`}
                  className="w-full h-48 object-cover"
                  loading="lazy" // Enable lazy loading
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
                    <p className="text-gray-400">
                      Save £{car.saving}{" "}
                      <span className="text-red-600 text-sm">
                        £{car.price + car.saving}
                      </span>
                    </p>
                    <p className="text-black-600">£{car.price}</p>
                    <p className="text-gray-600">Distance: {car.distance} miles</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Scroll Sentinel */}
          <div id="scroll-sentinel" className="h-4"></div> {/* Scroll sentinel */}
          {isLoading && <p>Loading more images...</p>}
        </div>
      )}

      {/* Lightbox Section */}
      {selectedCar && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-4xl p-8 relative h-[80vh] overflow-y-auto">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
              onClick={closeLightbox}
            >
              ✕
            </button>

            {/* Gallery Section */}
            <div className="mb-8 relative">
              <img
                src={selectedCar.image}
                alt={`${selectedCar.make} ${selectedCar.model}`}
                className="w-full h-64 object-cover rounded-lg"
              />
              <button
                className="absolute bottom-4 left-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Gallery
              </button>
            </div>

            {/* Two-Column Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <p className="text-gray-600">Distance: {selectedCar.distance} miles</p>
                </div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h2 className="text-xl font-bold">
                    {selectedCar.make} {selectedCar.model}
                  </h2>
                  <p className="text-gray-600">Price: £{selectedCar.price}</p>
                  <p className="text-gray-600">Saving: £{selectedCar.saving}</p>
                </div>
                <div className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold">Overview</h3>
                  <p>Gearbox: {selectedCar.gearbox ? "Manual" : "Automatic"}</p>
                  <p>Doors: {selectedCar.doors}</p>
                  <p>Engine: {selectedCar.engine}L</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
                  <h3 className="text-lg font-bold">Description</h3>
                  <p>
                    This is a high-quality car with excellent features, perfect for your needs.
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="sticky top-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-bold mb-4">Contact Seller</h3>
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mb-4">
                    Call: {selectedCar.contact_phone}
                  </button>
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full">
                    Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}