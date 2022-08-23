import { defineStore } from "pinia";
import tablesData from "../assets/data/tables.js";

import { ref } from "vue";

export const useTablesStore = defineStore("tables", () => {
  const tables = ref(tablesData);

  function createTablePayment(tableId, payment) {
    let billPaid = false;
    tables.value = tables.value.map((x) => {
      if (x.id !== tableId) return x;

      x.payments = [...x.payments, { timestamp: new Date(), value: payment }];

      // verificar se a conta fechou
      const totalPaid = x.payments.reduce((sum, x) => sum + x.value, 0);

      if (totalPaid == x.total) {
        x = {
          id: tableId,
          items: [],
          paid: 0,
          totalToBePaid: 0,
          payments: [],
        };
        billPaid = true;
      }

      return x;
    });
    return billPaid;
    // api.payments.create()
  }

  function upsertTable(tableId, items) {
    const i = tables.value.findIndex((table) => table.id === tableId);
    const concatItems = tables.value[i].items.concat(items);
    const updatedAt = new Date();

    if (tables.value[i].items.length > 0) {
      const updatedItemsAndTotals = concatItems.reduce(
        (objTable, item) => {
          const itemIndex = objTable.items.findIndex((x) => x.id === item.id);
          if (itemIndex > -1) {
            objTable.items[itemIndex].quantity += item.quantity;
          } else {
            objTable.items.push(item);
          }

          const totalItem = item.price * item.quantity;

          objTable.total = objTable.total + totalItem;
          return objTable;
        },
        {
          items: [],
          total: 0,
        }
      );
      tables.value[i] = {
        ...tables.value[i],
        ...updatedItemsAndTotals,
        updatedAt,
      };
    } else {
      // se nao tiver comprado antes, nao precisa de loop para check se items nao estao repetidos
      tables.value[i].items = concatItems;
      tables.value[i].updatedAt = updatedAt;
      tables.value[i].total = concatItems.reduce(
        (sum, x) => sum + x.price * x.quantity,
        0
      );
    }
    // api.tables.update()
  }

  return {
    tables,
    upsertTable,
    createTablePayment,
  };
});
