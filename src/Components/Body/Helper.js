export const getNumericRating = (rating) => {
  const numericRating = parseFloat(rating);
  return isNaN(numericRating) ? -Infinity : numericRating;
};

export const setOptions = (payload = "10") => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      widgetOffset: {
        NewListingView_category_bar_chicletranking_TwoRows: "",
        NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
        Restaurant_Group_WebView_PB_Theme: "",
        Restaurant_Group_WebView_SEO_PB_Theme: "",
        collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: payload,
        inlineFacetFilter: "",
        restaurantCountWidget: "",
      },
      nextOffset: "CJY7ELQ4KIC4y97szKj3LTDYEDgB",
    }),
  };

  return requestOptions;
};
