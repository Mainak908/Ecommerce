"use client";
import React, { useState, useEffect } from "react";

const AutoSliderCarousel = ({ items }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 2000); // Change slide every 2 seconds (adjust as needed)

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, [items.length]);

  const updateCarousel = () => {
    return {
      transform: `translateX(${-currentIndex * 100}%)`,
      transition: "transform 0.5s ease-in-out",
    };
  };

  return (
    <div className="carousel-container">
      <div className="carousel" style={updateCarousel()}>
        {items.map((item: any, index: any) => (
          <div className="carousel-item" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AutoSliderCarousel;
