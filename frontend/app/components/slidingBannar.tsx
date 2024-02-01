"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const FlipkartBanner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="relative">
      <Slider {...settings}>
        <div>
          <img src="banner1.webp" alt="Banner 1" className="w-full h-auto" />
        </div>
        <div>
          <img src="banner1.webp" alt="Banner 2" className="w-full h-auto" />
        </div>
        <div>
          <img src="banner1.webp" alt="Banner 2" className="w-full h-auto" />
        </div>
        <div>
          <img src="banner1.webp" alt="Banner 2" className="w-full h-auto" />
        </div>
        <div>
          <img src="banner1.webp" alt="Banner 2" className="w-full h-auto" />
        </div>
        <div>
          <img src="banner1.webp" alt="Banner 2" className="w-full h-auto" />
        </div>
      </Slider>
    </div>
  );
};

export default FlipkartBanner;
