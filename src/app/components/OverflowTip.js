'use client'

import React, { useRef, useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
const OverflowTip = ({ tooltip, text, lines }) => {
    // Create Ref
    const textElementRef = useRef();
     // Define state and function to update the value
  const [hoverStatus, setHover] = useState(true);

    const compareSize = () => {
        const compare = textElementRef?.current?.scrollWidth > textElementRef?.current.clientWidth;    
       // setHover(compare);    
    };

    // compare once and add resize listener on "componentDidMount"
    useEffect(() => {
        compareSize();
        window.addEventListener('resize', compareSize);
    }, []);

    // remove resize listener again on "componentWillUnmount"
    useEffect(() => () => {
        window.removeEventListener('resize', compareSize);
    }, []);

    return (
        <Tooltip
            title={null}
            interactive="true"
            style={{ fontSize: '2em' }}
            enterTouchDelay={0}
            disableHoverListener={!hoverStatus}
        >
            <span
                ref={textElementRef}
                style={{
                    maxWidth: '100%',
                    display: '-webkit-box',
                    WebkitBoxOrient: 'vertical',
                    WebkitLineClamp: lines,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {text}
            </span>
        </Tooltip>
    );
};

export default OverflowTip;