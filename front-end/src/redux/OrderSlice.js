import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  orders: [],
};
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    doAddOrder: (state, action) => {
      const productIndex = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );

      if (productIndex >= 0) {
        state.orders[productIndex].amount += action.payload.amount;
      } else {
        state.orders.push(action.payload);
        console.log(JSON.parse(JSON.stringify(state.orders)));

      }
    },
    doRemoveOrder: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload.id
      );
    },
    doUpdateAmount: (state, action) => {
      const productIndex = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      if (productIndex >= 0) {
        state.orders[productIndex].amount = action.payload.amount;
      }
    },
    doRemoveMultipleOrders: (state, action) => {
      // action.payload là mảng chứa các ID cần xóa
      const orderIdsToRemove = action.payload;
      state.orders = state.orders.filter(
        (order) => !orderIdsToRemove.includes(order.id)
      );
    },

  },
});

export const { doAddOrder, doRemoveOrder, doUpdateAmount, doRemoveMultipleOrders } = orderSlice.actions;
