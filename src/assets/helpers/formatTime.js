export const formatTime = (current) => {
  const hour = current.getHours();
  const minutes = String(current.getMinutes()).padStart(2, "0");
  return `${hour}:${minutes}`;
};

export const formatDate = (current) => {
  const day = current.getDate();
  const month = String(current.getMonth() + 1).padStart(2, "0");
  const year = current.getYear() + 1900;
  return `${day}/${month}/${year}`;
};
