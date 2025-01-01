import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const SliderContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  overflow: hidden;

  @media screen and (min-width: 481px) and (max-width: 767px) {
    height: 80vh;
  }

  @media screen and (min-width: 414px) and (max-width: 480px) {
    height: 80vh;
  }

  @media screen and (min-width: 375px) and (max-width: 413px) {
    height: 70vh;
  }

  @media screen and (min-width: 320px) and (max-width: 374px) {
    height: 65vh;
  }
`;

const SliderImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  opacity: ${props => props.active ? 0.9 : 0};
  transition: opacity 2s ease-in-out;

  @media screen and (max-width: 767px) {
    background-position: top center;
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.6));
    }
  }
`;

const SliderContent = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 10px;
  color: white;
  text-align: center;

  @media screen and (min-width: 481px) and (max-width: 767px) {
    padding-top: 8px;
  }

  @media screen and (min-width: 414px) and (max-width: 480px) {
    padding-top: 6px;
  }

  @media screen and (min-width: 320px) and (max-width: 413px) {
    padding-top: 4px;
  }
`;

const images = [
  '/background2.jpg',
  '/background3.jpg',
  '/background4.jpg',
];

const ImageSlider = ({ children }) => {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <SliderContainer>
      {images.map((image, index) => (
        <SliderImage
          key={index}
          style={{ backgroundImage: `url(${image})` }}
          active={index === currentImage}
        />
      ))}
      <SliderContent>
        {children}
      </SliderContent>
    </SliderContainer>
  );
};

export default ImageSlider;