<script setup>
import { useRouter } from "vue-router";
import CategoryMenu from "../components/CategoryMenu.vue";
import FormCard from "../components/UI/FormCard.vue";
import data from "../assets/data/cardapio.js";

const router = useRouter();
const submitOrder = () => {
  console.log("submit");
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
        v-for="category in data"
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
