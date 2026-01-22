"use client";

import React, { useState } from "react";

export default function FilterType_range({ rangeName, onChange }) {
  const [range, setRange] = useState({ min: "", max: "" }); // Local state to track min and max values

  const handleChange = (e, type) => {
    const value = e.target.value;
    const updatedRange = { ...range, [type]: value }; // Update the specific range value (min or max)
    setRange(updatedRange); // Update local state
    onChange(updatedRange); // Pass the updated range to the parent component
  };

  return (
    <div className="flex items-center gap-4">
      <input
        type="number"
        placeholder="Min"
        className="w-1/2 p-2 border border-gray-300 rounded"
        value={range.min} // Controlled input for min
        onChange={(e) => handleChange(e, "min")} // Update min value
      />
      <input
        type="number"
        placeholder="Max"
        className="w-1/2 p-2 border border-gray-300 rounded"
        value={range.max} // Controlled input for max
        onChange={(e) => handleChange(e, "max")} // Update max value
      />
    </div>
  );
}