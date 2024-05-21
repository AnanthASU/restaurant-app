
export const getNumericRating = (rating) => {
    const numericRating = parseFloat(rating);
    return isNaN(numericRating) ? -Infinity : numericRating;
  };
