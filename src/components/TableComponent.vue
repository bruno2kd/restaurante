<script setup>
import { useRouter } from "vue-router";
import PlusIcon from "../components/UI/PlusIcon.vue";
import DollarIcon from "../components/UI/DollarIcon.vue";
import { formatTime } from "../assets/helpers/formatTime";

const props = defineProps({
  table: Object,
});

const router = useRouter();

const goToNamedRoute = (name) => {
  router.push({ name, params: { tableId: props.table.id } });
};
</script>

<template>
  <div class="table" v-if="table.total > 0">
    <div class="table-content">
      <h6>{{ formatTime(table.updatedAt) }}</h6>
      <p v-if="table.total">R$ {{ (table.total / 100).toFixed(2) }}</p>
      <h5>Mesa {{ table.id }}</h5>
    </div>
    <div class="icon-table plus-component" @click="goToNamedRoute('new-order')">
      <PlusIcon />
    </div>
    <div class="icon-table dollar-component" @click="goToNamedRoute('payment')">
      <DollarIcon />
    </div>
  </div>
  <div class="table empty" v-else @click="goToNamedRoute('new-order')">
    <h3 class="head">Mesa {{ table.id }}</h3>
  </div>
</template>

<style scoped>
.table {
  position: relative;
  width: 50%;
  padding-bottom: 50%;
  background: gold;
  border-radius: 50%;
}
.table.empty {
  cursor: pointer;
}
.plus-component {
  bottom: -10px;
  left: 30%;
}
.dollar-component {
  bottom: 28px;
  left: 60%;
}
.head {
  left: 0%;
  top: 38%;
}
.icon-table {
  position: absolute;
  padding: 15px;
}
.icon-table svg {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
@media only screen and (min-width: 679px) {
  .table p {
    padding-top: 15px;
    font-size: 18px;
  }
}
@media only screen and (max-width: 679px) {
  .plus-component {
    bottom: -14px;
    left: 28%;
  }
  .dollar-component {
    bottom: 20px;
    left: 58%;
  }
  .icon-table svg {
    width: 40px;
    height: 40px;
  }
  .head {
    top: 25%;
  }
}
@media only screen and (max-width: 533px) {
  .plus-component {
    bottom: -14px;
    left: 28%;
  }
  .dollar-component {
    bottom: 7px;
    left: 60%;
  }
  .icon-table svg {
    width: 25px;
    height: 25px;
  }
  .table-content {
    position: absolute;
    top: 22px;
  }
}
</style>
