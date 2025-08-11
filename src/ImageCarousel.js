import React, { useEffect } from "react";
import { useAutoPlay } from "./hooks/useAutoPlay";
import { useImagePreloader } from "./hooks/useImagePreloader";
import { useCarouselNavigation } from "./hooks/useCarouselNavigation";

export const ImageCarousel = ({ imageUrls = [] }) => {
  const carouselLength = imageUrls.length;
  const { currentIndex, goToPrev, goToNext } = useCarouselNavigation(carouselLength);
  const { restart, stop } = useAutoPlay(() => goToNext(), 3000);
  const currentImage = imageUrls[currentIndex] || null;

  useEffect(() => {
    if (carouselLength > 1) {
      restart();
    }
    return () => stop();
  }, []);


  const handlePrev = () => {
    goToPrev();
    restart();
  };

  const handleNext = () => {
    goToNext();
    restart();
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
