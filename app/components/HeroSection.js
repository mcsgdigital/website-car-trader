import React from "react";

const HeroSection = ({ title, subtitle, onSearch, bgColor }) => {
  return (
    <section className={`${bgColor} text-white text-center py-16 relative rounded-lg`}>
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg">{subtitle}</p>

      {/* Search Button */}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-[-15%]">
        <button
          className="bg-green-600 text-white px-8 py-3 rounded-full hover:bg-green-700 transition-all shadow-lg border-4 border-white"
          onClick={onSearch}
        >
          Search
        </button>
      </div>
    </section>
  );
};

export default HeroSection;