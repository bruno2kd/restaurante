<script setup>
import { ref } from "vue";
import ItemRow from "./ItemRow.vue";
import ArrowDown from "./UI/ArrowDown.vue";
import ArrowUp from "./UI/ArrowUp.vue";

defineProps({
  category: Object,
});
// data
const open = ref(true);
const orderItems = ref([]); // esse order items vai no pinia

// function
const itemHandler = (item) => {
  const i = orderItems.value.findIndex((orderItem) => orderItem.id === item.id);
  if (i > -1) {
    orderItems.value[i] = item;
  } else {
    orderItems.value.push(item);
  }
};
</script>

<template>
  <div class="row categories">
    <h3>{{ category.name }}</h3>
    <span @click="open = !open">
      <arrow-down v-if="!open" />
      <arrow-up v-else />
    </span>
  </div>
  <Transition name="drop-down">
    <div v-show="open">
      <item-row
        v-for="bebida in category.items"
        :key="bebida.id"
        :item="bebida"
        @item="itemHandler"
      />
    </div>
  </Transition>
</template>

<style scoped>
.categories {
  border-bottom: 2px solid;
  margin-top: 8px;
}
h3 {
  display: inline;
  text-align: left;
  float: left;
}
span {
  display: inline;
  text-align: right;
  float: right;
  cursor: pointer;
}
/* transition */
.drop-down-enter-active {
  animation: drop-down 0.3s;
}

.drop-down-leave-active {
  animation: drop-down 0.3s reverse;
}

@keyframes drop-down {
  from {
    transform: scaley(0) translate3d(0, -100%, 0);
    height: 0;
  }
  to {
    transform: scaley(1) translate3d(0, 0, 0);
  }
}
</style>
