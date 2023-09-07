import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],

  //   cart: [
  //     {
  //       pizzaId: 12,
  //       name: "chees",
  //       quantity: 2,
  //       unitPrice: 16,
  //       totalPrice: 32,
  //     },
  //   ],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      //payload = new item
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      //payload = pizzaid
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQunatity(state, action) {
      //payload = pizzaid

      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity(state, action) {
      const item = state.cart.find((item) => item.pizzaId === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity === 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  decreaseItemQuantity,
  increaseItemQunatity,
  deleteItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQunatity = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce((sum, item) => sum + item.totalPrice, 0);

export const getCurrentQuantityById = (id) => (state) =>
  state.cart.cart.find((item) => item.pizzaId === id)?.quantity ?? 0;

//selector function like these can cause performnc issue so go see =>
//reselect library
