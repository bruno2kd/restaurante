<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { formatTime, formatDate } from "../assets/helpers/formatTime";
import FormCard from "../components/UI/FormCard.vue";
import LoadingComponent from "../components/UI/LoadingComponent.vue";
import { useTablesStore } from "../stores/tables";
import { storeToRefs } from "pinia";
const tableStore = useTablesStore();
const { tables } = storeToRefs(tableStore);

const router = useRouter();
const route = useRoute();

// data
const paymentInputRef = ref();
const isFormValid = ref(false);
const loadingPayment = ref(false);

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
// acesso a table do array tables na store
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

// function
const submitOrder = () => {
  loadingPayment.value = true;
  setTimeout(() => {
    // timeout para simular pagamento sendo processado
    const tableId = route.params.tableId;
    const paidValue = Math.round(paymentInputRef.value.value * 100);

    // se retornar positivo, a conta foi paga na totalidade
    const billPaid = tableStore.createTablePayment(tableId, paidValue);
    paymentInputRef.value.value = "";
    isFormValid.value = false;
    if (billPaid) {
      router.push({ name: "home" }); // quando a conta tiver sido paga, deve ser redirecionado para home
    }
    loadingPayment.value = false;
  }, 2000);
};
const cancelOrder = () => {
  router.push({ name: "home" });
};

// lifecycle hooks
onMounted(() => {
  paymentInputRef.value.focus(); // focus on input at start for better UX
  if (table.value.items.length === 0) {
    router.push({ name: "home" }); // se nao teve order vinculado a mesa, voltar para home
  }
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
      <div v-if="table.payments.length > 0" class="items-payment dashed">
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
            <p>
              {{ formatDate(payment.timestamp) }}
              {{ formatTime(payment.timestamp) }}
            </p>
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
        <div class="row">
          <div class="col-100 right">
            <p v-if="loadingPayment">Processando pagamento...</p>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-25"></div>
        <div class="col-50">
          <div class="btn-container" v-if="!loadingPayment">
            <input @click="cancelOrder" type="button" value="Cancelar" />
            <input type="submit" value="Confirmar" :disabled="!isFormValid" />
          </div>
          <div class="btn-container loading-component" v-else>
            <loading-component />
          </div>
        </div>
      </div>
    </form>
  </form-card>
</template>

<style lang="scss" scoped>
.items-payment {
  padding: 6px 0 8px;
}
.dashed {
  border-bottom: 1px dashed;
}
.btn-container {
  text-align: center;
}
.loading-component {
  padding-bottom: 10px;
}
.items-payment input[type="text"] {
  background-color: $conveniaPrimary;
  border-width: 1px;
  border-color: rgb(160, 160, 255);
  text-align: right;
  width: 75%;
}
.items-payment input[type="text"]:focus {
  background-color: #cd9dfa;
  outline: none !important;
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
