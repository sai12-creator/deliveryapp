import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    restaurant: {id : "",
    imgUrl : "",
    title : "",
    rating : "",
    adress : "",
    genre : "",
    short_description : "",
    dishes : "",
    long : "",
    lat : ""
}
};

export const restaurantSlice = createSlice({
  name: 'restaurant',
  initialState,
  reducers: {
    setToRestaurant: (state, action) => {
      state.restaurant =  action.payload;
    },
   
  },
});

export const { setToRestaurant } = restaurantSlice.actions;
export const selectRestaurantItems = (state) => state.restaurant.restaurant;

// Now import BasketReducer after defining basketSlice
export const RestaurantReducer = restaurantSlice.reducer;
