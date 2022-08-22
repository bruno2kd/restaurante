<script setup>
import { storeToRefs } from "pinia";
import TableComponent from "../components/TableComponent.vue";
import { useTablesStore } from "../stores/tables";
const main = useTablesStore();
const { tables } = storeToRefs(main);
</script>

<template>
  <div class="grid-content">
    <table-component
      v-for="table in tables"
      :key="table.id"
      :table="table"
    ></table-component>
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
  margin: 100px auto 0 auto;
  text-align: center;
  /* center */
}
.grid-content div {
  background-color: rgb(69, 51, 51);
  color: #fff;
  padding: 30px;
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
    margin-left: 20px;
    margin-right: 20px;
  }
  .grid-content div {
    width: 150px;
  }
}

@media only screen and (max-width: 533px) {
  .grid-content {
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, minmax(120px, auto));
    grid-column-gap: 4px;

    max-width: 100%;
    /* center */
    margin-left: 2px;
    margin-right: 2px;
      margin-top: 10px

  }
  .grid-content div {
    width: 120px;
  }
}
</style>
