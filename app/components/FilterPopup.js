import React from "react";
import FilterType_range from "./filter/FilterType_range";
import FilterType_list from "./filter/FilterType_list";
import FilterType_boolean from "./filter/FilterType_boolean";

const FilterPopup = ({
  activeFilter,
  setActiveFilter,
  expandedCategory,
  setExpandedCategory,
  data,
  filters,
}) => {
  if (!activeFilter) return null; // Don't render if no active filter

  // Extract unique makes from the data
  const uniqueMakes = [...new Set(data.map((car) => car.make))];
  uniqueMakes.sort(); // Order the makes alphabetically

  // Extract unique engines from the data
  const uniqueEngines = [...new Set(data.map((car) => car.engine))];
  uniqueEngines.sort(); // Order the engines alphabetically

  function filterGroup({ status }) {
    let content;

    switch (status) {
      case "Make":
        content = <FilterType_list list={uniqueMakes} listName={status} />;
        break;
      case "Engine":
        content = <FilterType_list list={uniqueEngines} listName={status} unitName={"L"} />;
        break;
      case "Gearbox":
        content = <FilterType_boolean valueA={"Automatic"} valueB={"Manual"} boolName={status} />;
        break;
      case "Price":
      case "Mileage":
      case "Year":
        content = <FilterType_range />;
        break;
      default:
        content = <FilterType_range />;
    }

    return content;
  }

  const handleToggleCategory = (category) => {
    if (expandedCategory.includes(category)) {
      // Remove the category from the expanded list
      setExpandedCategory(expandedCategory.filter((cat) => cat !== category));
    } else {
      // Add the category to the expanded list
      setExpandedCategory([...expandedCategory, category]);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Fallback for transparency
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-[600px] p-8 relative max-h-[80vh] overflow-y-auto">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={() => {
            setActiveFilter(null); // Close the lightbox
            setExpandedCategory([]); // Reset expanded categories
          }}
        >
          ✕
        </button>

        {/* Filter Title */}
        <h2 className="text-2xl font-bold mb-4">Filter / Sort</h2>

        {/* Collapsible Categories */}
        <div className="space-y-6">
          {filters.map((category, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 pb-4 ${
                expandedCategory.includes(category) ? "bg-gray-100" : "" // Apply light gray background if expanded
              }`}
            >
              {/* Category Header */}
              <div
                className={`flex justify-between items-center cursor-pointer p-2 rounded ${
                  expandedCategory.includes(category) ? "bg-green-500 text-white" : "bg-transparent"
                }`} // Green background and white text for expanded category
                onClick={() => handleToggleCategory(category)} // Toggle the category
              >
                <label className="block text-lg font-medium">{category}</label>
                <span className="text-gray-200">
                  {expandedCategory.includes(category) ? "▲" : "▼"} {/* Arrow indicator */}
                </span>
              </div>

              {/* Category Content */}
              {expandedCategory.includes(category) && (
                <div className="mt-4">
                  {
                    // Render appropriate filter type based on category
                    filterGroup({ status: category })
                  }
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Search Button */}
        <div className="flex justify-end mt-4">
          <button
            className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            onClick={() => {
              setActiveFilter(null); // Close the lightbox
            }}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPopup;