export const isTimeBetween = (start_time: string, end_time: string, cur_time: string) => {
  const start = convertTimeToSeconds(start_time);
  const end = convertTimeToSeconds(end_time);
  const target = convertTimeToSeconds(cur_time);

  // If start time is greater than end time, it means the time range spans midnight
  if (start > end) {
      return target >= start || target <= end;
  } else {
      return target >= start && target <= end;
  }
}

const convertTimeToSeconds = (time: string) => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours! * 3600 + minutes! * 60 + seconds!;
}