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

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      handlePrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      handleNext();
    }
  };

  useImagePreloader(imageUrls, currentIndex);

  if (carouselLength === 0) {
    return <p>No images available</p>;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Image carousel"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      style={{ textAlign: "center", maxWidth: "500px", margin: "auto" }}
    >
      <img
        src={currentImage}
        alt={`Slide ${currentIndex + 1} of ${carouselLength}`}
        style={{
          width: "100%",
          height: "300px",
          objectFit: "cover",
          borderRadius: "8px",
        }}
      />
      <div style={{ marginTop: "10px" }}>
        <button onClick={handlePrev} aria-label="Previous slide" style={{ marginRight: "10px" }}>
          ⬅️ Previous
        </button>
        <button onClick={handleNext} aria-label="Next slide">Next ➡️</button>
      </div>
      <div style={{ marginTop: "5px", fontSize: "14px", color: "#555" }} aria-live="polite" aria-atomic="true">
        {currentIndex + 1} / {carouselLength}
      </div>
    </div>
  );
};
