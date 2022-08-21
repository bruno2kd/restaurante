<script setup>
import { ref } from "vue";

// data
const quantity = ref(0);

// functions
const sumQuantity = (val) => {
  if (quantity.value === 0 && val === -1) return;
  quantity.value += val;
};
</script>

<template>
  <div div="quantity-container">
    <button @click.prevent="sumQuantity(-1)" class="qnt-btn">-</button>
    <span class="qnt"> {{ quantity }} </span>
    <button @click.prevent="sumQuantity(1)" class="qnt-btn">+</button>
  </div>
</template>

<style scoped>
.qnt {
  padding: 10px;
}
.qnt-btn {
  border-radius: 50%;
  border-color: #a440ff;
  background-color: #a440ff;
  cursor: pointer;
}
</style>
