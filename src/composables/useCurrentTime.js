import { ref, onBeforeUnmount, onMounted } from "vue";

export const useCurrentTime = () => {
  // data
  const currentTime = ref();
  const intervalID = ref();
  // function
  const updateCurrentTime = () => {
    const current = new Date();
    const hour = current.getHours();
    const minutes = String(current.getMinutes()).padStart(2, "0");
    currentTime.value = `${hour}:${minutes}`;
  };

  onMounted(() => {
    updateCurrentTime();
    intervalID.value = setInterval(updateCurrentTime, 10000);
  });
  onBeforeUnmount(() => {
    clearInterval(intervalID.value);
  });
  return {
    currentTime,
  };
};
