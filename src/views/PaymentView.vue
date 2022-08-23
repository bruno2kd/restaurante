<script setup>
import { storeToRefs } from "pinia";
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatTime } from "../assets/helpers/formatTime";
import FormCard from "../components/UI/FormCard.vue";
import { useTablesStore } from "../stores/tables";
const tableStore = useTablesStore();
const { tables } = storeToRefs(tableStore);

const router = useRouter();
const route = useRoute();

// data
// const table = ref();
// const totalToBePaid = ref();
const paymentInputRef = ref(0);
const isFormValid = ref(false);

// valor da conta nao pode ser maior que o valor restante
// e mascara o valor
const paymentInputHandler = () => {
  const newValue = paymentInputRef.value.value;
  let newPayment = Number(newValue.replace(/\D/g, ""));
  if (newPayment > totalToBePaid.value) {
    newPayment = totalToBePaid.value;
  }
  const formatedValue = (newPayment / 100).toFixed(2);
  paymentInputRef.value.value = formatedValue;
  // check if valid
  isFormValid.value = newPayment > 0;
};

const table = computed(() => {
  const tableId = route.params.tableId;
  return tables.value.find((x) => x.id === tableId);
});

const totalToBePaid = computed(() => {
  const totalPayments = table.value.payments.reduce(
    (sum, _payment) => sum + _payment.value,
    0
  );
  return table.value.total - totalPayments;
});

// TODO: AQUI COMECA A DELETAR AS COISAS
// function
const submitOrder = () => {
  const tableId = route.params.tableId;
  const paidValue = Math.round(paymentInputRef.value.value * 100);

  // se retornar positivo, a conta foi paga na totalidade
  const billPaid = tableStore.createTablePayment(tableId, paidValue);
  paymentInputRef.value.value = 0;
  if (billPaid) {
    router.push({ name: "home" });
  }
};
const cancelOrder = () => {
  router.push({ name: "home" });
};

// lifecycle hooks
onMounted(() => paymentInputRef.value.focus());
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
        <div v-for="(payment, i) in table.payments" :key="i" class="row">
          <div class="col-50">
            <!-- TODO: pegar o formato certo -->
            <p>{{ formatTime(payment.timestamp) }}</p>
          </div>
          <div class="col-50 right">
            <p>- R${{ (payment.value / 100).toFixed(2) }}</p>
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
            <p>R${{ (totalToBePaid / 100).toFixed(2) }}</p>
          </div>
        </div>
      </div>
      <div class="items-payment">
        <div class="row">
          <div class="col-50">
            <h3>Mesa {{ route.params.tableId }}</h3>
          </div>
          <div class="col-50 right">
            <span>R$</span
            ><input
              ref="paymentInputRef"
              type="text"
              @input="paymentInputHandler"
            />
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
