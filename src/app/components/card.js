import React from 'react';

const Card = ({children, className = "", width, height}) => {
    return (
        <div className={`card-item overflow-hidden ${className}`}>
            {children}
        </div>
    )
}

export default Card;