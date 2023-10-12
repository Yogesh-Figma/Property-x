"use client"
import React from 'react';
import ImageGallery from "react-image-gallery";
import "./styles.scss";
import FormTabs from "../formTabs";
import PrevArrow from '@/app/icons/prev_arrow.svg';
import NextArrow from '@/app/icons/next_arrow.svg';

const GALLERY_TABS = [{value:"virtualTour", label:"Virtual Tour"},{value:"photos", label:"Photos"},{value:"videos", label:"Videos"},{value:"floorPlan", label:"Floor Plan"} ]
const images = [
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
  {
    original: "https://picsum.photos/id/1018/1000/600/",
    thumbnail: "https://picsum.photos/id/1018/250/150/",
  },
  {
    original: "https://picsum.photos/id/1015/1000/600/",
    thumbnail: "https://picsum.photos/id/1015/250/150/",
  },
  {
    original: "https://picsum.photos/id/1019/1000/600/",
    thumbnail: "https://picsum.photos/id/1019/250/150/",
  },
];

export default ({ galleryTabs =  GALLERY_TABS }) => {
  const [selectedTab, selectTab] = React.useState(galleryTabs ? galleryTabs[0].value :"");
    const handleChange = (event) => {
        const { name, value } = event.target;
        debugger;
        selectTab(value);
    }

    const renderLeftNav = (onClick, disabled) => (
      <button className='image-gallery-icon image-gallery-left-nav position-absolute'  onClick={onClick} disabled={disabled}>
      <PrevArrow />
      </button>
    );

    const renderRightNav = (onClick, disabled) => (
      <button className='image-gallery-icon image-gallery-right-nav position-absolute'  onClick={onClick} disabled={disabled}>
      <NextArrow />
      </button>
    );

  return (
    <div className="gallery-container">
      <div className='tabs-container d-flex'>
        <div className='image-gallery-thumbnails-wrapper  image-gallery-thumbnails-left thumbnails-swipe-vertical'></div>
      <FormTabs variant={"outlined"} items={GALLERY_TABS} name="galleryTabs" className="gallery-tabs" selectedTab={selectedTab} onClick={handleChange}/>
      </div>
      <ImageGallery infinite={false} renderLeftNav={renderLeftNav} renderRightNav={renderRightNav}  showPlayButton={false} showFullscreenButton={false}  useTranslate3D={false} items={images} thumbnailPosition={"left"} />
    </div>
  )
}