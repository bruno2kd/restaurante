<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import CategoryMenu from "../components/CategoryMenu.vue";
import FormCard from "../components/UI/FormCard.vue";
import menu from "../assets/data/menu.js";

import { useOrdersStore } from "../stores/orders";
const orders = useOrdersStore();

const router = useRouter();
const route = useRoute();

// computed
const isValidForm = computed(() => orders.validItemsArr.length > 0);

// functions
const submitOrder = () => {
  const tableId = route.params.tableId;
  orders.addNewOrder(tableId);
  router.push({ name: "home" });
};
const cancelOrder = () => {
  orders.resetForm();
  router.push({ name: "home" });
};
</script>

<template>
  <form-card>
    <form @submit.prevent="submitOrder">
      <category-menu
        v-for="(category, i) in menu"
        :key="category.name"
        :category="category"
        :index="i"
      />
      <div class="row">
        <div class="col-25"></div>
        <div class="col-50">
          <div class="btn-container">
            <input @click="cancelOrder" type="button" value="Cancelar" />
            <input type="submit" value="Confirmar" :disabled="!isValidForm" />
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
.btn-container input[type="submit"]:disabled {
  background-color: gray;
  cursor: auto;
}
</style>
