export const formatDate = (date, format) => {
  // Remove any unexpected characters and split the date
  const cleanedDate = date.replace(/[-\/]/g, "/").replace("T", " "); // Replace '-' and '/' with '/'
  if (format == "d/m/y") {
    const dateArray = cleanedDate.split(/[\/ ]/);
    console.log("dateArray", dateArray);
    return `${dateArray[2]}/${dateArray[1]}/${dateArray[0]} ${dateArray[3]}`;
  }
  return cleanedDate;
};

export const humanReadableDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  };
  return date.toLocaleString("en-US", options);
};

// Helper function to parse custom date format
export const parseDate = (dateString) => {
  const [day, month, yearAndTime] = dateString.split("/");
  const [year, time] = yearAndTime.split(" ");
  const [hour, minute] = time.split(":");

  return new Date(
    parseInt(year),
    parseInt(month) - 1, // JavaScript months are zero-indexed
    parseInt(day),
    parseInt(hour),
    parseInt(minute)
  );
};

// Helper function to calculate time difference
export const timeDifference = (targetDate) => {
  const now = new Date();
  const difference = targetDate - now;

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((difference / (1000 * 60)) % 60);

  return { days, hours, minutes };
};

// Main statusFinder function
export const statusFinder = (targetDate) => {
  const parsedDate = parseDate(targetDate);
  const difference = timeDifference(parsedDate);

  if (difference.days >= 3) {
    return "more than 3 days"; // green for more than 3 days
  } else if (difference.days >= 1 && difference.hours < 24) {
    return "a day"; // amber/yellow for close to due
  } else if (
    difference.days === 0 &&
    difference.hours < 3 &&
    difference.minutes >= 0
  ) {
    return "urgent"; // red for urgent within 3 hours
  }
  return "expired"; // gray if the deadline has passed
};

export const convertToDateTimeLocal = (dateString) => {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/");
  return `${year}-${month}-${day}T${timePart}`;
};
