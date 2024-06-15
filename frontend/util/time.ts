export function timeAgo(
  dateString: string,
  format?: "relative" | "date" | "both"
): string {
  // Ensure valid ISO 8601 format
  if (
    !/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]\d{2}:\d{2})/.test(
      dateString
    )
  ) {
    return "Invalid date format.";
  }

  // Parse date string with optional timezone handling
  const date = new Date(dateString);

  // Calculate difference in milliseconds
  const difference = Date.now() - date.getTime();

  // Define constants for time units
  const SECOND = 1000;
  const MINUTE = 60 * SECOND;
  const HOUR = 60 * MINUTE;
  const DAY = 24 * HOUR;
  const MONTH = 30 * DAY;
  const YEAR = 365 * DAY;

  // Determine and format relative time based on thresholds
  if (format === "relative" || !format) {
    if (difference < MINUTE) {
      return "just now";
    } else if (difference < HOUR) {
      const t = Math.floor(difference / MINUTE);
      return `${t} minute${t === 1 ? "" : "s"} ago`;
    } else if (difference < DAY) {
      const t = Math.floor(difference / HOUR);
      return `${t} hour${t === 1 ? "" : "s"} ago`;
    } else if (difference < MONTH) {
      const t = Math.floor(difference / DAY);
      return `${t} day${t === 1 ? "" : "s"} ago`;
    } else if (difference < YEAR) {
      const t = Math.floor(difference / MONTH);
      return `${t} month${t === 1 ? "" : "s"} ago`;
    } else {
      const t = Math.floor(difference / YEAR);
      return `${t} year${t === 1 ? "" : "s"} ago`;
    }
  } else if (format === "date") {
    return date.toLocaleDateString(); // Uses user's locale for date formatting
  } else if (format === "both") {
    const relativeTime = timeAgo(dateString, "relative");
    return `${relativeTime} (${date.toLocaleDateString()})`;
  } else {
    return "Invalid format specified.";
  }
}
