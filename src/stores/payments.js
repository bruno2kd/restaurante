import { defineStore } from "pinia";
import payments from "../assets/data/pedidos.js";

export const useCounterStore = defineStore({
  id: "contas",
  state: () => ({
    counter: 0,
    payments,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter++;
    },
    reset() {
      this.counter = 0;
    },
  },
});
