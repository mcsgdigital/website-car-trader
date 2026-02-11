"use client";
import { useState, useEffect, useCallback } from "react";

import HeroSection from "../../components/HeroSection";
import FilterBar from "../../components/FilterBar";
import Gallery from "../../components/Gallery";
import FilterPopup from "../../components/FilterPopup";
import CarCard_used from "../../components/CarCard_used";
import Layout from "../../components/Layout";
import CarCard_lightbox_used from "../../components/CarCard_lightbox_used";
import SectionDeal_used from "../../components/SectionDeal_used";

export default function UsedCars() {
  const [data, setData] = useState([]); // State to store all car data
  const [cars, setCars] = useState([]); // State to store filtered or loaded cars
  const [totalCars, setTotalCars] = useState(0); // State to store the total number of cars
  const [showGallery, setShowGallery] = useState(false); // State to toggle between hero and gallery
  const [selectedCar, setSelectedCar] = useState(null); // State to store the selected car for the lightbox
  const [page, setPage] = useState(1); // State to track the current page
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [hasMore, setHasMore] = useState(true); // State to track if more cars are available
  const [activeFilter, setActiveFilter] = useState(null); // State to track the active filter
  const [expandedCategory, setExpandedCategory] = useState([]); // State to track expanded categories
  const [latestDeals, setLatestDeals] = useState([]); // State to store latest deals with images
  const [filtered, setFiltered] = useState(false); // State to track if cars are filtered
  const filterCategories = ["Make", "Engine", "Gearbox", "Price", "Mileage", "Year"]; // Filter categories

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
      const response = await fetch("/mock_used.json"); // Load JSON from public folder
      const result = await response.json();
      
      setData(result); // Store all car data
      setTotalCars(result.length); // Set the total number of cars

      const cardsToDisplay = calculateCardsToDisplay(); // Calculate the number of cards to display
      const initialCars = result.slice(0, cardsToDisplay); // Get the required number of cars
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
        `/.netlify/functions/unsplash?q=cars&per_page=10&page=${page}` // Call the Netlify function
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
        `/.netlify/functions/unsplash?q=cars&per_page=10&page=${page}`
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
    // Early exit if already loading, no more cars, or filters are applied
    if (isLoading || !hasMore || filtered) return;
  
    setPage((prevPage) => prevPage + 1); // Increment the page number
  }, [isLoading, hasMore, filtered]);

  // Use Effect to fetch more cars when the page changes
  useEffect(() => {
    if (page > 1 && !filtered) {
      const fetchNextBatch = async () => {
        try {
          const response = await fetch("/mock_used.json"); // Load JSON from public folder
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
  }, [page, filtered]);

  // Use IntersectionObserver to detect when the user scrolls to the bottom
  useEffect(() => {
    if (!showGallery || !hasMore) return; // Only initialize the observer when the gallery is open

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
  }, [showGallery, hasMore, loadMoreCars]);

  useEffect(() => {
    if (activeFilter) {
      setExpandedCategory([activeFilter]); // Automatically expand the matching category
    }
  }, [activeFilter]);

  // Function to fetch Unsplash images for Latest Deals
  const fetchLatestDealsImages = async () => {
    try {
      const response = await fetch(
        `/.netlify/functions/unsplash?q=cars&per_page=4&page=2` // Call the Netlify function
      );
      const data = await response.json();

      // Map the fetched images to car details
      const deals = data.results.map((image, index) => ({
        id: index,
        price: `£${[12560, 37080, 19950, 23295][index]}`, // Random prices
        mileage: `${[15243, 8644, 14256, 31565][index]} miles`, // Random mileage
        makeModel: ["BMW 3 Series", "Audi A4", "Mercedes-Benz C-Class", "Tesla Model 3"][index], // Random car models
        spec: [
          "M Sport, 2.0L Diesel, Automatic",
          "S Line, 1.5L Petrol, Manual",
          "AMG Line, 2.0L Petrol, Automatic",
          "Long Range, Electric, Automatic",
        ][index], // Random specs
        image: image.urls.small, // Unsplash image URL
        year: [2018, 2020, 2019, 2021][index], // Random years
        enginesize: [2.0, 1.5, 2.0, 2.2][index], // Random engine sizes
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

  // Function to fetch Unsplash images and replace car images
  const getImages = async (data, page, replace = false) => {
    try {
      const unsplashResponse = await fetch(
        `/.netlify/functions/unsplash?q=cars&per_page=10&page=${page}` // Call the Netlify function
      );
      const unsplashData = await unsplashResponse.json();

      const newCars = data.map((car, index) => {
        if (unsplashData.results[index]) {
          return {
            ...car,
            image: unsplashData.results[index].urls.small, // Add Unsplash image
          };
        }
        return car;
      });

      if (replace) {
        setCars(newCars); // Replace the cars state with the new cars
      } else {
        setCars((prevCars) => [...prevCars, ...newCars]); // Append new cars
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Function to handle applying filters
  const handleApplyFilters = async (expandedFilters) => {

    // Filter the cars based on the expandedFilters
    const filteredCars = data.filter((car) => {
      return Object.entries(expandedFilters).every(([category, values]) => {
        if ((Array.isArray(values) && values.length === 0)) {
          return true; // No filter applied for this category
        }

        const carValue = car[category.toLowerCase()]; // Assuming car object keys are lowercase

        // Handle range filters (e.g., price, mileage)
        if (typeof values === "object" && values.min !== undefined && values.max !== undefined) {
          return carValue >= values.min && carValue <= values.max;
        }

        // Handle other filters (e.g., make, gearbox)
        if (Array.isArray(values)) {
          return values.includes(carValue);
        }

        // Default case: exact match
        return carValue === values;
      });
    });

    setTotalCars(filteredCars.length); // Update total cars count

    // Add images to the filtered cars and replace the cars state
    try {
      await getImages(filteredCars, 1, true); // Pass replace = true to replace the cars state
      setFiltered(true); // Set the filtered state to true
    } catch (error) {
      console.error("Error adding images to filtered cars:", error);
    }
  };

  return (
    <Layout>
      {/* Main Content */}
      {!showGallery ? (
        <>
          {/* Hero Section */}
          <HeroSection
            title="Used Cars"
            subtitle="Find the best deals on pre-owned cars."
            onSearch={handleSearch}
            bgColor="bg-gray-400"
          />

          {/* Latest Deals Section */}
          <SectionDeal_used
            data={latestDeals}
            title="Explore Our Collection"
            description="Browse through a wide range of high-quality used cars."
          />
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
          <FilterBar categories={filterCategories} activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
          <Gallery
            ComponentCard={CarCard_used}
            cars={cars}
            totalCars={totalCars}
            handleCardClick={handleCardClick}
            isLoading={isLoading}
          />
        </>
      )}

      {/* Lightbox for Selected Car */}
      {selectedCar && (
        <CarCard_lightbox_used car={selectedCar} closeLightbox={closeLightbox} />
      )}

      {/* Filter Popup */}
      <FilterPopup
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        expandedCategory={expandedCategory}
        setExpandedCategory={setExpandedCategory}
        data={data} // Pass the full dataset
        filters={filterCategories} // Pass filter categories
        onApplyFilters={handleApplyFilters} // Pass the callback to handle filtering
      />
    </Layout>
  );
}