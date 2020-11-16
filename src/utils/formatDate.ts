export function formatDate(timestamp: Date) {
  return timestamp.toLocaleDateString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });
}
