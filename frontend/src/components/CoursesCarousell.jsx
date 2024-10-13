import React from 'react';
import Slider from 'react-slick';
import CoursesCard from './CoursesCard';  // Import your CoursesCard component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CoursesCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,   // Number of cards to show at once
    slidesToScroll: 1, // Scroll one card at a time
    nextArrow: <NextArrow />,  // Custom next arrow
    prevArrow: <PrevArrow />,  // Custom previous arrow
  };

  return (
    <div>
      <Slider {...settings}>
        {/* Map through courses to render each CoursesCard */}
        {[1, 2, 3, 4, 5, 6].map((course, index) => (
          <div key={index}>
            <CoursesCard course={course} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

// Custom next arrow component
const NextArrow = ({ onClick }) => (
  <div className="slick-arrow slick-next" onClick={onClick}>
    ➡️
  </div>
);

// Custom previous arrow component
const PrevArrow = ({ onClick }) => (
  <div className="slick-arrow slick-prev" onClick={onClick}>
    ⬅️
  </div>
);

export default CoursesCarousel;
