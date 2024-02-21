import { useComplaintFilterStore } from "./store";
import type { ComplaintFilter, ComplaintIndexes } from "./types";

export const updateComplaintFilter = (
  complaintFilter: ComplaintFilter,
  complaint: ComplaintIndexes,
  value: string
): ComplaintFilter => {
  if (complaint === "time") {
    const timeComplaint = {
      ...complaintFilter,
      time: toggleTimeFilter(complaintFilter.time, value),
    };
    useComplaintFilterStore.getState().complaintFilter = timeComplaint;
    return timeComplaint;
  }

  const arrayComplaints = {
    ...complaintFilter,
    [complaint]: toggleArrayFilter(complaintFilter[complaint], value),
  };
  useComplaintFilterStore.getState().complaintFilter = arrayComplaints;
  return arrayComplaints;
};

const toggleTimeFilter = (
  currentTime: string,
  selectedTime: string
): string => {
  return currentTime === selectedTime ? "" : selectedTime;
};

const toggleArrayFilter = (
  currentValues: string[],
  value: string
): string[] => {
  const hasDuplicate = currentValues.includes(value);

  if (hasDuplicate) {
    return currentValues.filter((item) => item !== value);
  } else {
    return [...currentValues, value];
  }
};
