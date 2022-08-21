<script setup></script>

<template>
  <div class="form-container">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.form-container {
  margin: 100px 40px 0;
}
.container {
  margin: auto;
  padding: 10px;
}

@media only screen and (max-width: 533px) {
  .form-container {
    margin-top: 40px;
  }
}
</style>
