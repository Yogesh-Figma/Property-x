import React from 'react';

const DateFormatter = ({ timestamp, time, date }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);

    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);

    let hours = date.getHours() % 12 || 12; // Convert to 12-hour format
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const period = date.getHours() >= 12 ? 'PM' : 'AM';

    return `${hours}:${minutes} ${period}`;
  };

  const formatDateTime = (timestamp) => {
    const dayPart = formatDate(timestamp);
    const timePart = formatTime(timestamp);

    return `${dayPart} ${timePart}`;
  };

  if (!timestamp) {
    return <span style={{ color: 'grey' }}>-</span>;
  }

  return (
    <span>
      {date ? formatDate(timestamp) : time ? formatTime(timestamp) : formatDateTime(timestamp)}
    </span>
  );
};

export default DateFormatter;
