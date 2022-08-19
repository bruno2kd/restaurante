<script setup>
import Plus from "../components/UI/Plus.vue";
import DollarSign from "../components/UI/DollarSign.vue";

defineProps({
  mesa: Object,
});
</script>

<template>
  <div class="table">
    <h6>Mesa {{ mesa.id }}</h6>
    <p v-if="mesa.total">R$ {{ (mesa.total / 100).toFixed(2) }}</p>
    <div class="icon-table plus-component">
      <Plus />
    </div>
    <div class="icon-table dollar-component">
      <DollarSign />
    </div>
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
.plus-component {
  bottom: -10px;
  left: 30%;
}
.dollar-component {
  bottom: 28px;
  left: 60%;
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
}
</style>
