<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import FormCard from "../components/UI/FormCard.vue";

const router = useRouter();
const route = useRoute();

const payment = ref(0);
const submitOrder = () => {
  console.log("submit");
  console.log(route.params.mesaId);
};
const cancelOrder = () => {
  console.log("cancel");
  router.push({ name: "home" });
};
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
        <div class="row">
          <div class="col-20">
            <p>Cerveja Preta</p>
          </div>
          <div class="col-20 center">
            <p>2</p>
          </div>
          <div class="col-20 center">
            <p>15:32</p>
          </div>
          <div class="col-20 right">
            <p>R$10.00</p>
          </div>
          <div class="col-20 right">
            <p>R$20.00</p>
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
            <p>R$20.00</p>
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
            <h3>Mesa {{ route.params.mesaId }}</h3>
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
            <input type="submit" value="Confirmar" />
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
}
.items-payment input[type="text"]:focus {
  background-color: #cd9dfa;
  outline: none !important;
  /* border: 1px solid #b15eff; */
  box-shadow: 0 0 10px #ac71ce;
}
</style>
