<script setup>
import { storeToRefs } from "pinia";
import { ref, computed, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatTime } from "../assets/helpers/formatTime";
import FormCard from "../components/UI/FormCard.vue";
import { useTablesStore } from "../stores/tables";
const main = useTablesStore();
const { tables } = storeToRefs(main);

const router = useRouter();
const route = useRoute();

// data
const table = ref();
const payment = ref(0);

//computed
const isFormValid = computed(() => payment.value > 0);

// function
const submitOrder = () => {
  console.log("submit");
  console.log(route.params.tableId);
};
const cancelOrder = () => {
  console.log("cancel");
  router.push({ name: "home" });
};

// lifecycle hooks
onBeforeMount(() => {
  table.value = tables.value.find((x) => x.id === route.params.tableId);
});
</script>

<template>
  <form-card>
    <form @submit.prevent="submitOrder">
      <div class="row">
        <div class="col-20">
          <h3>PEDIDO</h3>
        </div>
        <div class="col-20 center">
          <h3>QTD.</h3>
        </div>
        <div class="col-20 center">
          <h3>HORÁRIO</h3>
        </div>
        <div class="col-20 right">
          <h3>UND</h3>
        </div>
        <div class="col-20 right">
          <h3>VALOR</h3>
        </div>
      </div>
      <div class="items-payment dashed">
        <div v-for="item in table.items" :key="item.id" class="row">
          <div class="col-20">
            <p>{{ item.name }}</p>
          </div>
          <div class="col-20 center">
            <p>{{ item.quantity }}</p>
          </div>
          <div class="col-20 center">
            <p>{{ formatTime(item.updatedAt) }}</p>
          </div>
          <div class="col-20 right">
            <p>R${{ (item.price / 100).toFixed(2) }}</p>
          </div>
          <div class="col-20 right">
            <p>R${{ ((item.price * item.quantity) / 100).toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="items-payment dashed">
        <div class="row">
          <div class="col-100 right">
            <h3>TOTAL PARCIAL</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-100 right">
            <p>R${{ (table.total / 100).toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="items-payment dashed">
        <div class="row">
          <div class="col-50">
            <h3>DATA</h3>
          </div>
          <div class="col-50 right">
            <h3>PAGAMENTOS</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-50">
            <p>02/08/1989 16:35</p>
          </div>
          <div class="col-50 right">
            <p>R$20.00</p>
          </div>
        </div>
      </div>
      <div class="items-payment dashed">
        <div class="row">
          <div class="col-100 right">
            <h3>TOTAL RESTANTE</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-100 right">
            <p>R$20.00</p>
          </div>
        </div>
      </div>
      <div class="items-payment">
        <div class="row">
          <div class="col-100 right">
            <h3>TOTAL RESTANTE</h3>
          </div>
        </div>
        <div class="row">
          <div class="col-100 right">
            <p>R$20.00</p>
          </div>
        </div>
      </div>
      <div class="items-payment">
        <div class="row">
          <div class="col-50">
            <h3>Mesa {{ route.params.tableId }}</h3>
          </div>
          <div class="col-50 right">
            <span>R$</span><input v-model="payment" type="text" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-25"></div>
        <div class="col-50">
          <div class="btn-container">
            <input @click="cancelOrder" type="button" value="Cancelar" />
            <input type="submit" value="Confirmar" :disabled="!isFormValid" />
          </div>
        </div>
      </div>
    </form>
  </form-card>
</template>

<style scoped>
.items-payment {
  padding: 6px 0 8px;
}
.dashed {
  border-bottom: 1px dashed;
}
.btn-container {
  text-align: center;
}
.items-payment input[type="text"] {
  background-color: #e3c5ff;
  border-width: 1px;
  border-color: rgb(160, 160, 255);
  text-align: right;
  width: 75%;
}
.items-payment input[type="text"]:focus {
  background-color: #cd9dfa;
  outline: none !important;
  /* border: 1px solid #b15eff; */
  box-shadow: 0 0 10px #ac71ce;
}

input[type="submit"]:disabled {
  background-color: gray;
  cursor: auto;
}

@media only screen and (max-width: 533px) {
  h3,
  p {
    font-size: 0.8em !important;
  }
}
</style>
