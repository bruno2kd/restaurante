<script setup>
import QuantityInput from "../components/QuantityInput.vue";
import { useOrdersStore } from "../stores/orders";
const orders = useOrdersStore();

const props = defineProps({
  item: Object,
});

// data
const quantityHandler = (qnt) => {
  orders.orderFormItemsUpdate({
    ...props.item,
    quantity: qnt,
  });
};
</script>

<template>
  <div class="row items">
    <div class="col-25 produto">
      <p>{{ item.name }}</p>
    </div>
    <div class="col-50 center">
      <p>R$ {{ (item.price / 100).toFixed(2) }}</p>
    </div>
    <div class="col-25 right">
      <quantity-input @quantity="quantityHandler" />
    </div>
  </div>
</template>

<style scoped>
.items {
  border-bottom: 1px solid rgb(131, 131, 131);
  padding: 5px 0;
}

@media screen and (max-width: 600px) {
  .produto,
  .center,
  .right {
    text-align: center;
    width: 100%;
  }
}
</style>
