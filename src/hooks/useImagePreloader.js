import { useEffect, useRef } from "react";

export const useImagePreloader = (imageUrls, currentIndex) => {
  const preloadedImages = useRef(new Set());
  const carouselLength = imageUrls.length;

  useEffect(() => {
    if (carouselLength <= 1) return;

    const imagesToPreload = [
      imageUrls[(currentIndex + 1) % carouselLength],
      imageUrls[(currentIndex + 2) % carouselLength],
    ];

    imagesToPreload.forEach((url) => {
      if (url && !preloadedImages.current.has(url)) {
        const img = new Image();
        img.onload = () => preloadedImages.current.add(url);
        img.src = url;
      }
    });
  }, [imageUrls, currentIndex, carouselLength]);
};
