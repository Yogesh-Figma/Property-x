import React from 'react';

const Card = ({children, className = "", width, height}) => {
    return (
        <div className={`card ${className}`}>
            {children}
        </div>
    )
}

export default Card;