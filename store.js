import { configureStore } from '@reduxjs/toolkit'
import { BasketReducer}  from './Features/BasketSlice'
import { RestaurantReducer } from './Features/RestaurantSlice'
export const store = configureStore({
  reducer: {
    basket: BasketReducer,
    restaurant: RestaurantReducer
  },
})