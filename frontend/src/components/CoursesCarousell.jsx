import React from 'react';
import Slider from 'react-slick';
import CoursesCard from './CoursesCard.jsx';  // Import your CoursesCard component
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { projectManagementCourses } from './mock.jsx'; // Import the mock data

const CoursesCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,   // Number of cards to show at once
    slidesToScroll: 1, // Scroll one card at a time
    nextArrow: <NextArrow />,  // Custom next arrow
    prevArrow: <PrevArrow />,  // Custom previous arrow
  };

  return (
    <div>
      <Slider {...settings}>
            {/* Map through the projectManagementCourses array to render each CoursesCard */}
            {projectManagementCourses.map((course, index) => (
                    <div key={index}>
                        <CoursesCard
                        title={course.title}
                        description={course.description}
                        image={course.image}
                        id={index} // Use the index as the course ID or you could use a unique identifier if available
                        />
                    </div>
                    ))}
      </Slider>
    </div>
  );
};

// Custom next arrow component with inline styles
const NextArrow = ({ onClick }) => (
  <div 
    className="slick-arrow slick-next" 
    onClick={onClick} 
    style={{
      backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Dark background
      color: '#fff',  // White arrow
      borderRadius: '50%',  // Rounded edges
      padding: '10px',
      fontSize: '2rem',  // Larger arrow
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '15px',
      height: '15px',
      position: 'absolute',
      top: '50%',
      right: '-30px',  // Move next arrow to the right
      transform: 'translateY(-50%)',
      zIndex: 1,
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',  // Smooth hover transition
    }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#000'}  // Hover effect
    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}  // Reset on leave
  >
    
  </div>
);

// Custom previous arrow component with inline styles
const PrevArrow = ({ onClick }) => (
  <div 
    className="slick-arrow slick-prev" 
    onClick={onClick} 
    style={{
        backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Dark background
        color: '#fff',  // White arrow
        borderRadius: '50%',  // Rounded edges
        padding: '10px',
        fontSize: '2rem',  // Larger arrow
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '15px',
        height: '15px',
        position: 'absolute',
        top: '50%',
        right: '-30px',  // Move next arrow to the right
        transform: 'translateY(-50%)',
        zIndex: 1,
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',  // Smooth hover transition
      }}
    onMouseEnter={(e) => e.target.style.backgroundColor = '#000'}  // Hover effect
    onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'}  // Reset on leave
  >
    
  </div>
);

export default CoursesCarousel;
