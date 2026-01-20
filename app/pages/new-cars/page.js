"use client";
import { useState, useEffect, useCallback } from "react";
import Layout from "../../components/Layout";

import HeroSection from "../../components/HeroSection";
import FilterBar from "../../components/FilterBar";
import Gallery from "../../components/Gallery";
import CarCard_new from "../../components/CarCard_new";
import FilterPopup from "../../components/FilterPopup";
import SectionDeal from "../../components/SectionDeal";
import SectionGrid from "../../components/SectionGrid";
import CarCard_lightbox_new from "../../components/CarCard_lightbox_new";


export default function NewCars() {
  const [data, setData] = useState([]); // State to store all car data
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
      const result = await response.json();

      setData(result); // Store all car data
      setTotalCars(result.length); // Set the total number of cars

      const cardsToDisplay = calculateCardsToDisplay(); // Calculate the number of cards to display
      const initialCars = result.slice(0, cardsToDisplay); // Get the required number of cars
      getImages(initialCars, 1); // Fetch images for the cars
      setShowGallery(true); // Show the gallery
    } catch (error) {
      console.error("Error loading cars:", error);
    }
  };

  // Function to fetch Unsplash images and replace car images
  const getImages = async (data, page) => {

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
      
      if (cars.length === 0) {
        setCars(newCars);
      } else {
        setCars((prevCars) => [...prevCars, ...newCars]); // Append new cars
      }
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
          const cardsToDisplay = calculateCardsToDisplay(); // Calculate the number of cards to display
          const startIndex = (page - 1) * cardsToDisplay;
          const endIndex = page * cardsToDisplay;
          const nextBatch = data.slice(startIndex, endIndex); // Get the next batch of cars

          if (nextBatch.length === 0) {
            setHasMore(false); // No more cars to load
            return;
          }

          getImages(nextBatch, page); // Fetch images for the next batch of cars
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
          <SectionDeal
            data={latestDeals}
            title="Latest Deals"
            description="Discover our handpicked deals on the latest cars with flexible contracts and affordable prices."
          />

          {/* 2x2 Section */}
          <SectionGrid 
            titleA={"Find the best new cars"}
            descriptionA={"Explore a wide range of new cars tailored to your needs and budget."}
            buttonTextA={"Explore Now"}
            imageSrcA={"/images/newcars-driving-down.jpg"}
            titleB={"Buy with confidence"}
            descriptionB={"Enjoy peace of mind with trusted dealers and secure transactions."}
            buttonTextB={"Learn More"}
            imageSrcB={"/images/newcars-keys.jpg"}
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

      {/* Lightbox Section */}
      {selectedCar && (
        <CarCard_lightbox_new car={selectedCar} closeLightbox={closeLightbox} />
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