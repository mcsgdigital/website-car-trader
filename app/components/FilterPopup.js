"use client";

import React, { useEffect, useState } from "react";
import FilterType_range from "./filter/FilterType_range";
import FilterType_list from "./filter/FilterType_list";
import FilterType_boolean from "./filter/FilterType_boolean";

export default function FilterPopup({
  activeFilter,
  setActiveFilter,
  expandedCategory,
  setExpandedCategory,
  data,
  filters,
  onApplyFilters, // Callback function to send expandedFilters to NewCars
}) {
  const [selectedFilters, setSelectedFilters] = useState({}); // State to store selected filter values

  // Disable background scrolling when the popup is open
  useEffect(() => {
    if (activeFilter) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Re-enable scrolling
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = ""; // Ensure scrolling is re-enabled
    };
  }, [activeFilter]);

  if (!activeFilter) return null; // Don't render if no active filter

  // Extract unique makes and engines from the data
  const uniqueMakes = [...new Set(data.map((car) => car.make))].sort();
  const uniqueEngines = [...new Set(data.map((car) => car.engine))].sort();

  // Handle filter group rendering
  function filterGroup({ status }) {
    let content;

    switch (status) {
      case "Make":
        content = (
          <FilterType_list
            list={uniqueMakes}
            listName={status}
            onChange={(value) => {
              setSelectedFilters((prev) => ({
                ...prev,
                Make: value,
              }));
            }}
          />
        );
        break;
      case "Engine":
        content = (
          <FilterType_list
            list={uniqueEngines}
            listName={status}
            unitName={"L"}
            onChange={(value) => {
              const numericValue = parseFloat(value.replace(/[^0-9.]/g, "")); // Extract numeric part and convert to number
              setSelectedFilters((prev) => ({
                ...prev,
                Engine: numericValue,
              }));
            }}
          />
        );
        break;
      case "Gearbox":
        content = (
          <FilterType_boolean
            valueA={"Manual"}
            valueB={"Automatic"}
            boolName={status}
            onChange={(value) => {
              setSelectedFilters((prev) => ({
                ...prev,
                Gearbox: value === "Manual" ? true : false,
              }));
            }}
          />
        );
        break;
      case "Price":
      case "Mileage":
      case "Year":
        content = (
          <FilterType_range
            rangeName={status}
            onChange={(value) => {
              setSelectedFilters((prev) => ({
                ...prev,
                [status]: value,
              }));
            }}
          />
        );
        break;
      default:
        content = null;
    }

    return content;
  }

  const handleSearch = () => {
    // Collect all selected filters for expanded categories
    const expandedFilters = {};
    expandedCategory.forEach((category) => {
      if (selectedFilters.hasOwnProperty(category)) {
        expandedFilters[category] = selectedFilters[category];
      }
    });

    // Send expandedFilters to NewCars or UsedCars via the callback
    onApplyFilters(expandedFilters);

    setActiveFilter(null); // Close the popup
    setExpandedCategory([]); // Reset expanded categories
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-[600px] p-8 relative max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={() => {
            setActiveFilter(null);
            setExpandedCategory([]);
          }}
        >
          ✕
        </button>

        {/* Filter Title */}
        <h2 className="text-2xl font-bold mb-4 text-gray-200 dark:text-black">Filter / Sort</h2>

        {/* Collapsible Categories */}
        <div className="space-y-6">
          {filters.map((category, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 pb-4 ${
                expandedCategory.includes(category) ? "bg-gray-100" : ""
              }`}
            >
              <div
                className={`flex justify-between items-center cursor-pointer p-2 rounded ${
                  expandedCategory.includes(category)
                    ? "bg-green-500 text-white"
                    : "bg-transparent"
                }`}
                onClick={() =>
                  setExpandedCategory((prev) =>
                    prev.includes(category)
                      ? prev.filter((cat) => cat !== category)
                      : [...prev, category]
                  )
                }
              >
                <label className="block text-lg font-medium text-gray-200 dark:text-black">{category}</label>
                <span className="text-gray-200 dark:text-black">
                  {expandedCategory.includes(category) ? "▲" : "▼"}
                </span>
              </div>

              {expandedCategory.includes(category) && (
                <div className="mt-4">
                  {filterGroup({ status: category })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search Button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}