import { defineStore } from "pinia";
import mesas from "../assets/data/mesas.js";

export const useMesasStore = defineStore({
  id: "mesas",
  state: () => ({
    mesas,
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
