import { defineStore } from "pinia";
import pedidos from '../assets/data/pedidos.js'

export const useCounterStore = defineStore({
  id: "conta",
  state: () => ({
    counter: 0,
    pedidos
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
