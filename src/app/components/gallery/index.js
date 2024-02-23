"use client"
import React from 'react';
import ImageGallery from "react-image-gallery";
import "./styles.scss";
import FormTabs from "../formTabs";
import PrevArrow from '@/app/icons/prev_arrow.svg';
import NextArrow from '@/app/icons/next_arrow.svg';


export default ({ data = {} }) => {
  const galleryTabs = (Object.keys(data) || []).map(item => { return { value: item, label: item } });
  const [selectedTab, selectTab] = React.useState(galleryTabs ? galleryTabs[0].value : "");
  const handleChange = (event) => {
    const { name, value } = event.target;
    selectTab(value);
  }

  const renderLeftNav = (onClick, disabled) => (
    <button className='image-gallery-icon image-gallery-left-nav position-absolute' onClick={onClick} disabled={disabled}>
      <PrevArrow />
    </button>
  );

  const _renderVideo = (video) => {
    return (
      <div className='video-container position-relative'>
        <iframe className='video-frame' src={video.original||video.videoUrl} frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
      </div>
      // <video controls muted>
      //   <source src={video.original} />
      // </video>
    )
  }

  const renderRightNav = (onClick, disabled) => (
    <button className='image-gallery-icon image-gallery-right-nav position-absolute' onClick={onClick} disabled={disabled}>
      <NextArrow />
    </button>
  );



  return (
    <div className="gallery-container">
      <div className='tabs-container d-flex'>
        <div className='image-gallery-thumbnails-wrapper  image-gallery-thumbnails-left thumbnails-swipe-vertical'></div>
        <FormTabs variant={"outlined"} items={galleryTabs} name="galleryTabs" className="gallery-tabs" selectedTab={selectedTab} onClick={handleChange} />
      </div>
      <ImageGallery
        infinite={false}
        renderLeftNav={renderLeftNav}
        renderRightNav={renderRightNav}
        showPlayButton={false}
        showFullscreenButton={false}
        useTranslate3D={false}
        items={data[selectedTab] || []}
        thumbnailPosition={"left"}
        renderItem={selectedTab == "videos" ? _renderVideo : null}
      />
    </div>
  )
}