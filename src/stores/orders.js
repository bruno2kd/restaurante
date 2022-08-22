import { defineStore } from "pinia";
import pedidos from "../assets/data/pedidos.js";

export const useOrdersStore = defineStore({
  id: "orders",
  state: () => ({
    pedidos,
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    addNewOrder(newOrder) {
      console.log("newOrder");
      console.log(newOrder);
    },
    // reset() {
    //   this.counter = 0;
    // },
  },
});
