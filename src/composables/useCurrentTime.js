import { ref, onBeforeUnmount, onMounted } from "vue";
import { formatTime } from "../assets/helpers/formatTime";

// nao precisava ser composable, mas fiz para explorar mais as features do vue3
export const useCurrentTime = () => {
  // data
  const currentTime = ref();
  const intervalID = ref();
  // function
  const updateCurrentTime = () => {
    const current = new Date();
    currentTime.value = formatTime(current);
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
