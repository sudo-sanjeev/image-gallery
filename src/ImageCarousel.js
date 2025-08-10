import React, { useEffect, useRef, useState } from "react";

export const ImageCarousel = ({ imageUrls = [] }) => {
  const [currentImageIndex, setImageIndex] = useState(0);
  const intervalRef = useRef(null);
  const carouselLength = imageUrls.length;

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % carouselLength);
    }, 3000);
  };

  const preloadImages = () => {
    if (carouselLength <= 1) return;

    const next1 = imageUrls[(currentImageIndex + 1) % carouselLength];
    const next2 = imageUrls[(currentImageIndex + 2) % carouselLength];

    [next1, next2].forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  };

  useEffect(() => {
    preloadImages();
  }, [currentImageIndex]);

  useEffect(() => {
    if (carouselLength > 0) {
      resetInterval();
    }

    return () => clearInterval(intervalRef.current);
  }, [carouselLength]);

  const handlePrev = () => {
    setImageIndex(
      (prevIndex) => (prevIndex + carouselLength - 1) % carouselLength
    );
    resetInterval();
  };

  const handleNext = () => {
    setImageIndex((prevIndex) => (prevIndex + 1) % carouselLength);
    resetInterval();
  };

  if (carouselLength === 0) {
    return <p>No images available</p>;
  }

  return (
    <div style={{ textAlign: "center", maxWidth: "500px", margin: "auto" }}>
      <img
        src={imageUrls[currentImageIndex]}
        alt={`carousel-img-${currentImageIndex}`}
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
        {currentImageIndex + 1} / {carouselLength}
      </div>
    </div>
  );
};
