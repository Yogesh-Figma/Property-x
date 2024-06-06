"use client"
import React from 'react';
import ImageGallery from "react-image-gallery";
import "./styles.scss";
import FormTabs from "../formTabs";
import PrevArrow from '@/app/icons/prev_arrow.svg';
import NextArrow from '@/app/icons/next_arrow.svg';
import ReactPlayer from 'react-player'


export default ({ data = {} }) => {
  const galleryTabs = (Object.keys(data) || []).map(item => { return { value: item, label: item } });
  let [shouldPlay, updatePlayState] = React.useState({0:false});
  let _imageGallery;
  const [selectedTab, selectTab] = React.useState(galleryTabs ? galleryTabs[0].value : "");
  const [players, setPlayers] = React.useState([]);
  const handleChange = (event) => {
    const { name, value } = event.target;
    selectTab(value);
  }

  const renderLeftNav = (onClick, disabled) => (
    <button className='image-gallery-icon image-gallery-left-nav position-absolute' onClick={onClick} disabled={disabled}>
      <PrevArrow />
    </button>
  );

  const onPlay= (event) => {
    players.push(event.target);
    setPlayers([...players]);   
  }


  const _renderVideo = (video) => {
    return (
      <div className='video-container position-relative'>
          <ReactPlayer className='video-frame' url={video.original||video.videoUrl} playing={shouldPlay[video.index]||false} onPlay={()=> updatePlayState({[video.index]:true})}/>
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

  const onSlide = () => {
    updatePlayState(false);
  }

  return (
    <div className="gallery-container">
      <div className='tabs-container d-flex'>
        <div className='image-gallery-thumbnails-wrapper  image-gallery-thumbnails-left thumbnails-swipe-vertical'></div>
        <FormTabs variant={"outlined"} items={galleryTabs} name="galleryTabs" className="gallery-tabs justify-content-start justify-content-md-center" selectedTab={selectedTab} onClick={handleChange} />
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
        onSlide={onSlide}
      />
    </div>
  )
}