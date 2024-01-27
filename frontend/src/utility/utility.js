export const getCurrentISTTime = () => {
    const options = {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
  
    const ISTTime = new Date().toLocaleString('en-US', options);
    return ISTTime;
  };