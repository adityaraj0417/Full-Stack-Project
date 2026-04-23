import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishlistItems: localStorage.getItem('wishlist') 
    ? JSON.parse(localStorage.getItem('wishlist')) 
    : [],
  totalWishlistQuantity: localStorage.getItem('wishlist') 
    ? JSON.parse(localStorage.getItem('wishlist')).length 
    : 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const itemIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex < 0) {
        state.wishlistItems.push(action.payload);
        state.totalWishlistQuantity++;
        localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
      }
    },
    removeFromWishlist: (state, action) => {
      const remainingItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.wishlistItems = remainingItems;
      state.totalWishlistQuantity = remainingItems.length;
      localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
