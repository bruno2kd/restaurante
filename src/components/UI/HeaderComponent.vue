<script setup>
import { useCurrentTime } from "../../composables/useCurrentTime";

const { currentTime } = useCurrentTime();
</script>

<template>
  <header>
    <div class="row">
      <div class="col-25">
        <h3>Olá, John Doe</h3>
      </div>
      <div class="col-50 timestamp">
        <h6>Quinta Feira</h6>
        <h6>
          {{ currentTime }}
        </h6>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  overflow: hidden;
  background-color: #e3c5ff;
  padding: 20px 10px;
}
.timestamp {
  text-align: center;
}
@media screen and (max-width: 600px) {
  .timestamp {
    text-align: right;
    width: 75%;
  }
}
</style>
