<script setup>
defineProps({
  width: {
    type: Number,
    default: 12,
  },
  height: {
    type: Number,
    default: 12,
  },
});
</script>
<template>
  <svg
    :width="width"
    :height="height"
    viewBox="0 0 512 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>ionicons-v5-a</title>
    <polyline
      points="112 184 256 328 400 184"
      style="
        fill: none;
        stroke: #000;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 48px;
      "
    />
  </svg>
</template>
