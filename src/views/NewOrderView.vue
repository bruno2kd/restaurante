<script setup>
import { useRouter } from "vue-router";
import CategoryMenu from "../components/CategoryMenu.vue";
import FormCard from "../components/UI/FormCard.vue";
import cardapio from "../assets/data/cardapio.js";

import { useOrdersStore } from "../stores/orders";
const orders = useOrdersStore();

const router = useRouter();

const submitOrder = () => {
  console.log("submit");
  orders.addNewOrder("teste");
};
const cancelOrder = () => {
  console.log("cancel");
  router.push({ name: "home" });
};
</script>

<template>
  <form-card>
    <form @submit.prevent="submitOrder">
      <category-menu
        v-for="category in cardapio"
        :key="category.name"
        :category="category"
      />
      <div class="row">
        <div class="col-25"></div>
        <div class="col-50">
          <div class="btn-container">
            <input @click="cancelOrder" type="button" value="Cancelar" />
            <input type="submit" value="Confirmar" />
          </div>
        </div>
      </div>
    </form>
  </form-card>
</template>

<style scoped>
.btn-container {
  text-align: center;
}
</style>
