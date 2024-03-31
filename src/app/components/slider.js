"use client"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import NextArrow from '../icons/next_arrow.svg?url';
import PrevArrow from '../icons/prev_arrow.svg?url';

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}>
        <Image alt="prev arrow" src={PrevArrow} width={130} height={130}/>
    </div>
  );
}

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <Image alt="next arrow" src={NextArrow} width={130} height={130}/>
    </div>
  );
}

const settings = {
  infinite: false,
  speed: 500,
  centerMode:false,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [{
    breakpoint: 600,
    settings: {
        nextArrow: null, prevArrow: null
    }
}]
};


const CardSlider = ({ hideArrow, carouselSettings , children }) =>
  <Slider {...settings} {...carouselSettings} {...(hideArrow? {nextArrow:null, prevArrow:null}:{})}>
    {children}
  </Slider>


export default CardSlider