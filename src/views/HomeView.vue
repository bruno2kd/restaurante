<script setup>
import { storeToRefs, mapActions } from "pinia";
import Table from "../components/Table.vue";
import { useCounterStore } from "@/stores/counter";
const main = useCounterStore();
const { counter, pedidos, doubleCount } = storeToRefs(main);
console.log(pedidos);
</script>

<template>
  <div class="grid-content">
    <Table v-for="mesa in pedidos" :key="i" :mesa="mesa"></Table>
  </div>
</template>

<style scoped>
body {
  color: #fff;
  font-family: sans-serif;
  text-align: center;
  display: flex;
  place-items: center;
  max-height: 100vh;
}
.grid-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(3, minmax(200px, auto));
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  max-width: 960px;
  margin: 0 auto;
  text-align: center;
  /* center */
}
.grid-content div {
  background-color: rgb(69, 51, 51);
  color: #fff;
  padding: 30px;
  border-color: green;
  width: 200px;
}
.grid-content div:nth-child(even) {
  background-color: rgb(103, 103, 154);
}

@media only screen and (max-width: 880px) {
  .grid-content {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, minmax(200px, auto));
    max-width: 850px;
    /* center */
  }
  .grid-content div {
    width: 200px;
  }
}

@media only screen and (max-width: 679px) {
  .grid-content {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, minmax(150px, auto));
    max-width: 850px;
    /* center */
  }
  .grid-content div {
    width: 150px;
  }
}

@media only screen and (max-width: 533px) {
  .grid-content {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(6, minmax(120px, auto));
    max-width: 500px;
    /* center */
  }
  .grid-content div {
    width: 120px;
  }
}
</style>
