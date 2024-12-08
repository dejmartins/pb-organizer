export function getTimeWithAmPm(dateString: any) {
  const date = new Date(dateString);

  let hours = date.getHours();
  const minutes = date.getMinutes();

  const amPm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

  return `${hours}:${formattedMinutes} ${amPm}`;
}

export function createEllipsis(str: string, maxLength: number) {
  try {
    if (str.length <= maxLength) {
      return str;
    }
    return str.slice(0, maxLength) + "...";
  } catch (error) {}
}

export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export function extractUsername(email: string) {
  try {
    return email.split("@")[0];
  } catch (error) {}
}

export const uploadToCloudinary = async (file: any, upload_preset: string) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", upload_preset);

  try {
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    if (res.ok) {
      return data.secure_url;
    } else {
      throw new Error("Failed to upload image to Cloudinary");
    }
  } catch (err) {
    console.error("Error uploading image:", err);
    // throw err;
  }
};

export function getVenueName(str: string) {
  return str.split(",")[0];
}

export function convertIsoToDate(isoString: any) {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function dateToISOFormat(dateStr: any) {
  const [day, month, year] = dateStr.split("-");
  const date = new Date(year, month - 1, day);
  return date.toISOString();
}

// export function convertTimeToISO(timeStr: any) {
//   if (typeof timeStr !== "string") {
//     throw new Error("Invalid input: timeStr must be a string");
//   }

//   const [time, period] = timeStr.split(" ");
//   if (!time || !period || (period !== "AM" && period !== "PM")) {
//     throw new Error("Invalid time format");
//   }

//   const [hours, minutes] = time.split(":").map(Number);
//   if (
//     isNaN(hours) ||
//     isNaN(minutes) ||
//     hours < 1 ||
//     hours > 12 ||
//     minutes < 0 ||
//     minutes > 59
//   ) {
//     throw new Error("Invalid time values");
//   }

//   const date = new Date();
//   let hour24 = hours;

//   if (period === "PM" && hours !== 12) {
//     hour24 = hours + 12;
//   } else if (period === "AM" && hours === 12) {
//     hour24 = 0;
//   }

//   date.setHours(hour24);
//   date.setMinutes(minutes);
//   date.setSeconds(0);
//   date.setMilliseconds(0);

//   return date.toISOString();
// }

export function convertTimeToISO(timeStr: string) {
  if (typeof timeStr !== "string") {
    throw new Error("Invalid input: timeStr must be a string");
  }

  const date = new Date();

  // Check for 24-hour format
  if (timeStr.match(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    
    if (
      isNaN(hours) ||
      isNaN(minutes) ||
      hours < 0 ||
      hours > 23 ||
      minutes < 0 ||
      minutes > 59
    ) {
      throw new Error("Invalid time values");
    }

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date.toISOString();
  }

  // Check for 12-hour format
  const [time, period] = timeStr.split(" ");
  if (period !== "AM" && period !== "PM") {
    throw new Error("Invalid time format");
  }

  const [hours, minutes] = time.split(":").map(Number);
  
  if (
    isNaN(hours) ||
    isNaN(minutes) ||
    hours < 1 ||
    hours > 12 ||
    minutes < 0 ||
    minutes > 59
  ) {
    throw new Error("Invalid time values");
  }

  let hour24 = hours;
  if (period === "PM" && hours !== 12) {
    hour24 += 12;
  } else if (period === "AM" && hours === 12) {
    hour24 = 0;
  }

  date.setHours(hour24);
  date.setMinutes(minutes);
  date.setSeconds(0);
  date.setMilliseconds(0);

  return date.toISOString();
}


export function splitTimeRange(timeRange: string) {
  const [start, end] = timeRange.split(" - ").map((str) => str.trim());
  return [start, end];
}

export function converttimeToISO(timeString: any) {
  const currentDate = new Date().toISOString().split("T")[0];
  const dateWithTime = new Date(`${currentDate} ${timeString}`);
  return dateWithTime.toISOString();
}

export const updateObjectInArray = (
  array: any[],
  property: any,
  value: any,
  updatedObject: any
) => {
  const index = array.findIndex((obj) => obj[property] === value);
  if (index !== -1) {
    array[index] = { ...array[index], ...updatedObject };
  }

  return array;
};
