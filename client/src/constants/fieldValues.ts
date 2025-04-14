export const STATUSES = ["Backlog", "InProgress", "Done"] as const;
export const PRIORITIES = ["Low", "Medium", "High"] as const;

export const STATUS_DISPLAY_NAME = {
  Backlog: "To do",
  InProgress: "In progress",
  Done: "Done",
};
