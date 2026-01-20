import React from "react";

const FilterPopup = ({
  activeFilter,
  setActiveFilter,
  expandedCategory,
  setExpandedCategory,
  toggleCategory,
}) => {
  if (!activeFilter) return null; // Don't render if no active filter

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }} // Fallback for transparency
    >
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-[600px] p-8 relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 cursor-pointer"
          onClick={() => {
            setActiveFilter(null); // Close the lightbox
            setExpandedCategory(null); // Reset expanded category
          }}
        >
          ✕
        </button>

        {/* Filter Title */}
        <h2 className="text-2xl font-bold mb-4">Filter / Sort</h2>

        {/* Collapsible Categories */}
        <div className="space-y-6">
          {["Price", "Mileage", "Make", "Gearbox", "Body Type"].map((category, index) => (
            <div
              key={index}
              className={`border-b border-gray-200 pb-4 ${
                expandedCategory === category ? "bg-gray-100" : "" // Apply light gray background if expanded
              }`}
            >
              {/* Category Header */}
              <div
                className={`flex justify-between items-center cursor-pointer p-2 rounded ${
                  expandedCategory === category ? "bg-green-500 text-white" : "bg-transparent"
                }`} // Green background and white text for expanded category
                onClick={() => toggleCategory(category)} // Toggle the category
              >
                <label className="block text-lg font-medium">{category}</label>
                <span className="text-gray-200">
                  {expandedCategory === category ? "▲" : "▼"} {/* Arrow indicator */}
                </span>
              </div>

              {/* Category Content */}
              {expandedCategory === category && (
                <div className="mt-4">
                  {["Price", "Mileage"].includes(category) ? (
                    <div className="flex items-center gap-4">
                      <input
                        type="number"
                        placeholder="Min"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                      />
                      <input
                        type="number"
                        placeholder="Max"
                        className="w-1/2 p-2 border border-gray-300 rounded"
                      />
                    </div>
                  ) : (
                    <select className="w-full p-2 border border-gray-300 rounded">
                      <option value="">Select {category}</option>
                      <option value="Option 1">{category} Option 1</option>
                      <option value="Option 2">{category} Option 2</option>
                      <option value="Option 3">{category} Option 3</option>
                    </select>
                  )}
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
              console.log("Search triggered"); // Debugging log
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