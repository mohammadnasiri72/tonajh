import React from 'react';
import PersianDate from 'persian-date';

const PersianDateDisplay = ({ dateString, format = "YYYY/MM/DD HH:mm" }) => {
  const convertToPersian = (isoDate) => {
    try {
      const date = new PersianDate(new Date(isoDate));
      return date.format(format);
    } catch (error) {
      console.error('Error converting date:', error);
      return 'تاریخ نامعتبر';
    }
  };

  return (
    <span className="persian-date">
      {convertToPersian(dateString)}
    </span>
  );
};

export default PersianDateDisplay;