import React, { useEffect } from "react";
import { useAutoPlay } from "../hooks/useAutoPlay";
import { useImagePreloader } from "../hooks/useImagePreloader";
import { useCarouselNavigation } from "../hooks/useCarouselNavigation";

const DEFAULT_AUTOPLAY_INTERVAL = 3000;

export const ImageCarousel = ({ imageUrls = [], autoPlayInterval = DEFAULT_AUTOPLAY_INTERVAL }) => {
  const carouselLength = imageUrls.length;
  const { currentIndex, goToPrev, goToNext } = useCarouselNavigation(carouselLength);
  const { start, stop } = useAutoPlay(() => goToNext(), autoPlayInterval);
  const currentImage = imageUrls[currentIndex] || null;

  useEffect(() => {
    if (carouselLength > 1) {
      start();
    }
    return () => stop();
  }, []);


  const handlePrev = () => {
    goToPrev();
    start();
  };

  const handleNext = () => {
    goToNext();
    start();
  };

  useImagePreloader(imageUrls, currentIndex);

  if (carouselLength === 0) {
    return <p>No images available</p>;
  }

  return (
    <div style={{ textAlign: "center", maxWidth: "500px", margin: "auto" }}>
      <img
        src={currentImage}
        alt={`carousel-img-${currentIndex}`}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev} style={{ marginRight: "10px" }}>
          ⬅️ Previous
        </button>
        <button onClick={handleNext}>Next ➡️</button>
      </div>
      <div style={{ marginTop: "5px", fontSize: "14px", color: "#555" }}>
        {currentIndex + 1} / {carouselLength}
      </div>
    </div>
  );
};
