export const generateTrackingId = () => {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random(100 + Math.random() * 900);
  return `IND-${timestamp}${random}`;
};
