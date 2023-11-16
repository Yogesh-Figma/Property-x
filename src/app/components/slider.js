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
        <Image src={PrevArrow} width={130} height={130}/>
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
      <Image src={NextArrow} width={130} height={130}/>
    </div>
  );
}

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  initialSlide: 0,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
  ]
};


const CardSlider = ({ carouselSettings , children }) =>
  <Slider {...settings} {...carouselSettings}>
    {children}
  </Slider>


export default CardSlider