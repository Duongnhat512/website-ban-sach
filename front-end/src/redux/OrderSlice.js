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
        state.orders.push({ ...action.payload, selected: true });
        console.log(JSON.parse(JSON.stringify(state.orders)));

      }
    },
    doAddToOrder: (state, action) => {
      const existingItem = state.orders.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.amount += action.payload.amount;
      } else {
        state.orders.push(action.payload);
      }
    }
    ,
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
    doSelectOrder: (state, action) => {
      const orderIndex = state.orders.findIndex(
        (order) => order.id === action.payload.id
      );
      state.orders[orderIndex].selected = action.payload.selected;
    },


  },
});

export const { doAddOrder, doRemoveOrder, doUpdateAmount, doRemoveMultipleOrders, doAddToOrder, doSelectOrder } = orderSlice.actions;
