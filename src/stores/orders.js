import { defineStore } from "pinia";
import ordersDataList from "../assets/data/pedidos.js";
import { useTablesStore } from "./tables";

import { ref, computed } from "vue";

export const useOrdersStore = defineStore("orders", () => {
  const ordersData = ref(ordersDataList); // TODO: pode precisar dps
  const orderFormItems = ref([]);

  const validItemsArr = computed(() =>
    orderFormItems.value.filter((item) => item.quantity > 0)
  );

  function addNewOrder(tableId) {
    const tables = useTablesStore();
    tables.upsertTable(tableId, validItemsArr.value);
    resetForm()
    // call api to register order
    // api.orders.create()
  }

  function orderFormItemsUpdate(item) {
    const i = orderFormItems.value.findIndex(
      (orderItem) => orderItem.id === item.id
    );
    if (i > -1) {
      orderFormItems.value[i] = item;
    } else {
      orderFormItems.value.push(item);
    }
  }

  function resetForm() {
    orderFormItems.value = [];
  }

  return {
    validItemsArr,
    addNewOrder,
    orderFormItemsUpdate,
    resetForm
  };
});
