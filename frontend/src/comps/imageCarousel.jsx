import React, { useState, useCallback, useRef, useEffect } from 'react';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transition, setTransition] = useState('');
  const [imagesPerView, setImagesPerView] = useState(4);
  const transitionTimeoutRef = useRef(null);

  useEffect(() => {
    const updateImagesPerView = () => {
      if (window.innerWidth <= 480) {
        setImagesPerView(1);
      } else if (window.innerWidth <= 767) {
        setImagesPerView(2);
      } else if (window.innerWidth <= 1024) {
        setImagesPerView(3);
      } else {
        setImagesPerView(4);
      }
    };

    // Initial call
    updateImagesPerView();

    // Add resize listener
    window.addEventListener('resize', updateImagesPerView);

    return () => {
      window.removeEventListener('resize', updateImagesPerView);
    };
  }, []);

  const moveSlide = useCallback((direction) => {
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    setTransition(`slide-${direction}`);

    transitionTimeoutRef.current = setTimeout(() => {
      setCurrentIndex((prevIndex) => {
        if (direction === 'left') {
          return prevIndex > 0 ? prevIndex - 1 : images.length - imagesPerView;
        } else {
          return prevIndex + imagesPerView < images.length ? prevIndex + 1 : 0;
        }
      });

      setTransition('');
    }, 300);
  }, [images.length, imagesPerView]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') moveSlide('left');
      if (e.key === 'ArrowRight') moveSlide('right');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (transitionTimeoutRef.current) {
        clearTimeout(transitionTimeoutRef.current);
      }
    };
  }, [moveSlide]);

  const visibleImages = images.slice(currentIndex, currentIndex + imagesPerView);
  const displayImages = visibleImages.length < imagesPerView
    ? [...visibleImages, ...images.slice(0, imagesPerView - visibleImages.length)]
    : visibleImages;

  return (
    <div className="image-carousel">
      <div className={`carousel-container ${transition}`}>
        {displayImages.map((img, index) => (
          <div key={index} className="carousel-item">
            <img
              src={img}
              alt={`Carousel item ${index}`}
              className="carousel-image"
            />
          </div>
        ))}
      </div>
      <button
        onClick={() => moveSlide('left')}
        className="carousel-button prev-button"
        disabled={currentIndex === 0}
      >
        ←
      </button>
      <button
        onClick={() => moveSlide('right')}
        className="carousel-button next-button"
        disabled={currentIndex + imagesPerView >= images.length}
      >
        →
      </button>
    </div>
  );
};

export default ImageCarousel;