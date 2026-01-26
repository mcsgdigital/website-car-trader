import React from "react";

const Gallery = ({ ComponentCard, cars, totalCars, handleCardClick, isLoading }) => {
  
  return (
    <div className="p-8 h-[80vh] overflow-y-auto -mt-8" id="scrollable-gallery">
      <h1 className="text-3xl font-bold mb-8 mt-6">Available Cars</h1>
      <p className="text-gray-600 mb-8 dark:text-white">
        See {cars.length} of {totalCars} {totalCars === 1 ? "result" : "results"} found
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {cars.map((car, index) => (
          <ComponentCard
            key={index}
            car={car}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
      <div id="scroll-sentinel" className="h-4"></div>
      {isLoading && <p>Loading more images...</p>}
    </div>
  );
};

export default Gallery;