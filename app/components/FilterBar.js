import React from "react";

const FilterBar = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="sticky top-0 z-10 px-6 py-3 mx-auto w-fit flex gap-4 items-center md:bg-green-500 md:text-white md:shadow-md md:rounded-full">
      {/* Single Filter Button for Mobile View */}
      <button
        className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all shadow-lg border-4 border-white md:hidden"
        onClick={() => setActiveFilter("Filter")}
      >
        Filter
      </button>

      {/* Full Filter Bar for Larger Screens */}
      <div className="hidden md:flex gap-4">
        <button
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all shadow-lg border-4 border-white"
          onClick={() => setActiveFilter("All")}
        >
          All
        </button>
        {["Make", "Price", "Mileage", "Gearbox", "Body Type"].map((filter) => (
          <button
            key={filter}
            className="bg-green-700 hover:bg-green-600 text-white px-4 py-2 rounded-full transition-all cursor-pointer"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterBar;