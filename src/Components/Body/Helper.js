
export const getNumericRating = (rating) => {
    const numericRating = parseFloat(rating);
    return isNaN(numericRating) ? -Infinity : numericRating;
  };

  export const setOptions = (payload = "10") =>{

    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Origin': 'https://www.zomato.com',
        'X-Zomato-Csrft': 'ae3be7409a2069a093bce555d764c44c',
      },
      body: JSON.stringify({
        lat: 12.960059122809971,
        lng: 77.57337538383284,
        nextOffset: "COVCELQ4KIDQyZjd2LapWjCnEw==",
        widgetOffset: {
          NewListingView_category_bar_chicletranking_TwoRows: "",
          NewListingView_category_bar_chicletranking_TwoRows_Rendition: "",
          Restaurant_Group_WebView_SEO_PB_Theme: "",
          collectionV5RestaurantListWidget_SimRestoRelevance_food_seo: payload,
          inlineFacetFilter: "",
          restaurantCountWidget: ""
        },
        filters: {},
        seoParams: {
          seoUrl: "https://www.swiggy.com/",
          pageType: "FOOD_HOMEPAGE",
          apiName: "FoodHomePage"
        },
        page_type: "DESKTOP_WEB_LISTING",
        _csrf: "pRR0201hH2Eu-NI9ecI5rNDqzeevejQz1UTT9-xg"
      }),
    };

    return requestOptions;
    
  }