import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import cartItems from "../cartItems";
const url = "https://course-api.com/react-useReducer-cart-project";
const initialState = {
  cartItems: [],
  amount: 4,
  total: 0,
  isLoading: true,
};
export const getCartItems = createAsyncThunk("cart/getCartItems", () => {
  return fetch(url)
    .then((resp) => resp.json())
    .catch((err) => console.log(err));
});
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    removeItemFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((item) => {
        return item.id !== itemId;
      });
    },
    increase: (state, action) => {
      const cartItem = state.cartItems.find(
        (item) => item.id === action.payload
      );

      cartItem.amount += 1;
    },
    decrease: (state, action) => {
      const cartItem = state.cartItems.find((item) => {
        return item.id === action.payload;
      });
      cartItem.amount -= 1;
    },
    calculateTotals: (state) => {
      let total = 0;
      let amount = 0;
      state.cartItems.map((cartItem) => {
        amount += cartItem.amount;
        total = cartItem.price * amount;
      });
      state.total = total;
      state.amount = amount;
    },
  },
  extraReducers: {
    [getCartItems.pending]: (state) => {
      state.isLoading = true;
    },
    [getCartItems.fulfilled]: (state, action) => {
      console.log(action);
      state.isLoading = false;

      state.cartItems = action.payload;
    },
    [getCartItems.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
});
export const {
  clearCart,
  removeItemFromCart,
  increase,
  decrease,
  calculateTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
