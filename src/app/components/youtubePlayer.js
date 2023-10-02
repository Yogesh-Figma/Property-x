"use client"
import React from 'react';
import YouTube from 'react-youtube';

const YoutubePlayer = ({ videoId, height, width}) => {
    const _onReady = (event) => {
        // access to player in all event handlers via event.target        
    }

    const opts = {
        height: height,
        width: width,
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    return <YouTube videoId={videoId} opts={opts} onReady={_onReady} />;
}

export default YoutubePlayer;