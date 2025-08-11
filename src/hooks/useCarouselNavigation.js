import { useState } from "react";

export const useCarouselNavigation = (totalItems) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev + totalItems - 1) % totalItems);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  };

  const goToIndex = (index) => {
    if (index >= 0 && index < totalItems) {
      setCurrentIndex(index);
    }
  };

  return {
    currentIndex,
    goToPrev,
    goToNext,
    goToIndex,
  };
};
