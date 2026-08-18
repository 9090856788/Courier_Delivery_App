export const generateTrackingId = () => {
  const timestamp = Date.now().toString().slice(-8);

  const randomNumber = Math.floor(1000 + Math.random() * 9000);

  return `IND-${timestamp}-${randomNumber}`;
};
