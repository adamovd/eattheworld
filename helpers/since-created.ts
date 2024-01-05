const timeSinceCreated = (time: string) => {
  const now = new Date().getTime();
  const fed = new Date(time).getTime();
  const diffTime = Math.abs(now - fed);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  const diffMinutes = Math.ceil(diffTime / (1000 * 60));

  return { days: diffDays, hours: diffHours, minutes: diffMinutes };
};

export default timeSinceCreated;
