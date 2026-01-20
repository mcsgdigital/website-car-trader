"use client";
import { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout";

import HeroSection from "../../components/HeroSection";
import FilterBar from "../../components/FilterBar";
import Gallery from "../../components/Gallery";
import CarCard_new from "../../components/CarCard_new";
import FilterPopup from "../../components/FilterPopup";


export default function NewCars() {
  const [cars, setCars] = useState([]); // State to store loaded cars
  const [totalCars, setTotalCars] = useState(0); // State to store the total number of cars
  const [showGallery, setShowGallery] = useState(false); // State to toggle between hero and gallery
  const [selectedCar, setSelectedCar] = useState(null); // State to store the selected car for the lightbox
  const [page, setPage] = useState(1); // State to track the current page
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [hasMore, setHasMore] = useState(true); // State to track if more cars are available
  const [activeFilter, setActiveFilter] = useState(null); // State to track the active filter
  const [expandedCategory, setExpandedCategory] = useState(null); // State to track the expanded category
  const [latestDeals, setLatestDeals] = useState([]); // State to store latest deals with images

  const calculateCardsToDisplay = () => {
    const galleryWidth = window.innerWidth; // Width of the screen
    const galleryHeight = window.innerHeight * 0.8; // 80% of the viewport height
    const cardWidth = 300; // Approximate width of each card (including margins)
    const cardHeight = 400; // Approximate height of each card (including margins)

    const cardsPerRow = Math.floor(galleryWidth / cardWidth); // Number of cards per row
    const rows = Math.floor(galleryHeight / cardHeight); // Number of rows that fit in the gallery

    return cardsPerRow * rows; // Total number of cards to display
  };

  // Function to handle the "Search" button click
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent form submission
    try {
      const response = await fetch("/mock_new.json"); // Load JSON from public folder
      const data = await response.json();

      setTotalCars(data.length); // Set the total number of cars

      const cardsToDisplay = calculateCardsToDisplay(); // Calculate the number of cards to display
      const initialCars = data.slice(0, cardsToDisplay); // Get the required number of cars
      const carsWithImages = await fetchInitialImages(initialCars); // Fetch images for the cars
      setCars(carsWithImages); // Display the cars with images
      setShowGallery(true); // Show the gallery
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  };

  const fetchInitialImages = async (data) => {
    
    try {
      const unsplashResponse = await fetch(
        `https://api.unsplash.com/search/photos?query=cars&per_page=10&page=1`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`,
          },
        }
      );
      const unsplashData = await unsplashResponse.json();
  
      // Map over the initial cars and add images from Unsplash
      return data.map((car, index) => {
        if (unsplashData.results[index]) {
          return {
            ...car, // Keep existing car properties
            image: unsplashData.results[index].urls.small, // Add Unsplash image
          };
        }
        return car;
      });
    } catch (error) {
      console.error("Error fetching initial images from Unsplash:", error);
      return data; // Return the original data if there is an error
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

      if (unsplashData.results.length === 0) {
        setHasMore(false); // No more images available
        return;
      }

      const newCars = data.map((car, index) => {
        if (unsplashData.results[index]) {
          return {
            ...car,
            image: unsplashData.results[index].urls.small, // Add Unsplash image
          };
        }
        return car;
      });

      setCars((prevCars) => [...prevCars, ...newCars]); // Append new cars
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
      const fetchNextBatch = async () => {
        try {
          const response = await fetch("/mock_new.json"); // Load JSON from public folder
          const data = await response.json();

          const cardsToDisplay = calculateCardsToDisplay(); // Calculate the number of cards to display
          const startIndex = (page - 1) * cardsToDisplay;
          const endIndex = page * cardsToDisplay;
          const nextBatch = data.slice(startIndex, endIndex); // Get the next batch of cars

          if (nextBatch.length === 0) {
            setHasMore(false); // No more cars to load
            return;
          }

          replaceImages(nextBatch, page); // Fetch images for the next batch of cars
        } catch (error) {
          console.error("Error fetching cars for page:", page, error);
        }
      };

      fetchNextBatch();
    }
  }, [page]);

  // Use IntersectionObserver to detect when the user scrolls to the bottom
  useEffect(() => {
    if (!showGallery) return; // Only initialize the observer when the gallery is open

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadMoreCars(); // Load more cars when the bottom is visible
          }
        });
      },
      { threshold: 0.5 } // Adjust threshold for better triggering
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
  }, [showGallery, loadMoreCars]);

  useEffect(() => {
    if (activeFilter) {
      setExpandedCategory(activeFilter); // Automatically expand the matching category
    }
  }, [activeFilter]);

  // Function to fetch Unsplash images for Latest Deals
  const fetchLatestDealsImages = async () => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=cars&per_page=4&page=1`,
        {
          headers: {
            Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_KEY}`, // Use your Unsplash API key
          },
        }
      );
      const data = await response.json();

      // Map the fetched images to car details
      const deals = data.results.map((image, index) => ({
        id: index,
        price: `£${[299, 249, 199, 329][index]}/month`, // Random prices
        initialPayment: `£${[1000, 750, 500, 1250][index]} initial payment`, // Random initial payments
        contract: `${[24, 36, 48, 36][index]} month contract`, // Random contract lengths
        mileage: `${[5000, 8000, 10000, 12000][index]} miles p/a`, // Random mileage
        makeModel: ["BMW 3 Series", "Audi A4", "Mercedes-Benz C-Class", "Tesla Model 3"][index], // Random car models
        spec: [
          "M Sport, 2.0L Diesel, Automatic",
          "S Line, 1.5L Petrol, Manual",
          "AMG Line, 2.0L Petrol, Automatic",
          "Long Range, Electric, Automatic",
        ][index], // Random specs
        image: image.urls.small, // Unsplash image URL
      }));

      setLatestDeals(deals); // Update state with fetched deals
    } catch (error) {
      console.error("Error fetching Unsplash images for Latest Deals:", error);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchLatestDealsImages();
  }, []);

  // Function to handle clicking on a car card
  const handleCardClick = (car) => {
    setSelectedCar(car); // Set the selected car
  };

  // Function to close the lightbox
  const closeLightbox = () => {
    setSelectedCar(null); // Clear the selected car
  };

  const toggleCategory = (category) => {
    setExpandedCategory((prev) => (prev === category ? null : category)); // Toggle the category
  };

  return (
    <Layout>
      {/* Main Content */}
      {!showGallery ? (
        <>
          {/* Hero Section */}
          <HeroSection
            title="New Cars"
            subtitle="Meet your perfect car"
            onSearch={handleSearch}
            bgColor="bg-green-500"
          />

          {/* Latest Deals Section */}
          <section className="bg-gray-100 py-16 mt-20 rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-12">Latest Deals</h2>
            <p className="text-center text-gray-600 mb-12">
              Discover our handpicked deals on the latest cars with flexible contracts and affordable prices.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8 px-4">
              {latestDeals.map((deal) => (
                <div
                  key={deal.id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
                >
                  <img
                    src={deal.image}
                    alt={deal.makeModel}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      {/* Left Column: Price */}
                      <div className="text-left">
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-2xl font-bold text-green-500">{deal.price.split("/")[0]}</p>
                        <p className="text-xs text-gray-500">Per month (inc. VAT)</p>
                      </div>

                      {/* Right Column: Details */}
                      <div className="text-sm text-gray-600 flex flex-col gap-1">
                        <p className="whitespace-nowrap">
                          <span className="font-bold">{deal.initialPayment.split(" ")[0]}</span>{" "}
                          {deal.initialPayment.split(" ").slice(1).join(" ")}
                        </p>
                        <p className="whitespace-nowrap">
                          <span className="font-bold">{deal.contract.split(" ")[0]}</span>{" "}
                          {deal.contract.split(" ").slice(1).join(" ")}
                        </p>
                        <p className="whitespace-nowrap">
                          <span className="font-bold">{deal.mileage.split(" ")[0]}</span>{" "}
                          {deal.mileage.split(" ").slice(1).join(" ")}
                        </p>
                      </div>
                    </div>

                    <hr className="border-t border-gray-200 my-4" />

                    <h3 className="text-lg font-bold mb-2">{deal.makeModel}</h3>
                    <p className="text-gray-600">{deal.spec}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 2x2 Section */}
          <section className="bg-gray-100 py-16 mt-20 rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-4">
              {/* Top Left Block */}
              <div className="flex flex-col justify-start">
                <div className="w-[70%] m-auto">
                  <h3 className="text-2xl font-bold mb-4">Find the best new cars</h3>
                  <p className="text-gray-600 mb-4">
                    Explore a wide range of new cars tailored to your needs and budget.
                  </p>
                  <button className="border border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-all cursor-pointer">
                    Explore Now
                  </button>
                </div>
              </div>

              {/* Top Right Block */}
              <div className="relative">
                <img
                  src="/images/newcars-driving-down.jpg"
                  alt="Driving down the road"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Bottom Left Block */}
              <div className="relative">
                <img
                  src="/images/newcars-keys.jpg"
                  alt="Car keys"
                  className="w-full h-full object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Bottom Right Block */}
              <div className="flex flex-col justify-start">
                <div className="w-[70%] m-auto">
                  <h3 className="text-2xl font-bold mb-4">Buy with confidence</h3>
                  <p className="text-gray-600 mb-4">
                    Enjoy peace of mind with trusted dealers and secure transactions.
                  </p>
                  <button className="border border-green-500 text-green-500 px-4 py-2 rounded-full hover:bg-green-500 hover:text-white transition-all cursor-pointer">
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : (
        // If showGallery is true, display the Gallery
        <>
          {/* Close Button */}
          <button
            className="absolute right-4 bg-red-500 hover:bg-red-600 text-white w-8 h-8 rounded flex items-center justify-center shadow-lg transition-all cursor-pointer z-20"
            onClick={() => setShowGallery(false)} // Close the gallery
          >
            ✕
          </button>
          <FilterBar activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <Gallery
            ComponentCard={CarCard_new}
            cars={cars}
            totalCars={totalCars}
            handleCardClick={handleCardClick}
            isLoading={isLoading}
          />
        </>
      )}

      <FilterPopup
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        toggleCategory={toggleCategory}
      />
    </Layout>
  );
}