
const DatetoEpoch = (dateString ) => {
  // if (!dateString) {
  //   throw new Error('Date string is required');
  // }
  
  const date = new Date(dateString);

  // if (isNaN(date.getTime())) {
  //   throw new Error('Invalid date format');
  // }
  
  return Math.floor(date.getTime());
};

export default DatetoEpoch;