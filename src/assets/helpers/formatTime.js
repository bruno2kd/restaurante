export const formatTime = (current) => {
  const hour = current.getHours();
  const minutes = String(current.getMinutes()).padStart(2, "0");
  return `${hour}:${minutes}`;
};