const IS_VALID = "isValid";
const HASH = "hash";

export async function fetchIsValid(password, encryptedPassword) {
  const res = await fetch(process.env.API_URL + "/api/api_utils/bcrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: IS_VALID,
      payload: {
        password: password,
        encryptedPassword: encryptedPassword
      }
    })
  })

  const { result } = await res.json();
  return result;
}

export async function fetchHashPassword(password) {
  const res = await fetch(process.env.API_URL + "/api/api_utils/bcrypt", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      action: HASH,
      payload: {
        password: password,
      }
    })
  })

  const { result } = await res.json();
  return result;
}

export function toDate(stringDate, stringTime) {
  const yearMonthDate = stringDate.split("-");
  const hourMinuets = stringTime.split(":");

  const date = new Date();
  date.setYear(yearMonthDate[0]);
  date.setMonth(yearMonthDate[1] - 1);
  date.setDate(yearMonthDate[2]);
  date.setHours(hourMinuets[0]);
  date.setMinutes(hourMinuets[1]);
  date.setSeconds(0);
  return date;
}

export function sortAvailabilitiesByDayOfWeek(availabilities) {
  const dayOfWeek = {
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5,
    "sunday": 6,
    "other": null
  }

  const sortedAvailabilities = new Array(7);
  const others = []
  availabilities.forEach((availability) => {
    const { tagAvailability: tag } = availability;
    const dayNumber = dayOfWeek[tag.name]
    if (dayNumber !== null) {
      sortedAvailabilities[dayNumber] = availability;
    } else {
      others.push(availability);
    }
  })
  return [...sortedAvailabilities, ...others];
}

export function sortDayOfWeekTags(tags) {
  const dayOfWeek = {
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5,
    "sunday": 6,
    "other": 7
  }

  const sortedTags = new Array(7);
  tags.forEach((tag) => {
    sortedTags[dayOfWeek[tag.name]] = tag;
  })
  return sortedTags;
}

export function formatTimeToHHMMAString(timeString) {
  const hourMinutes = timeString.split(":");
  let date = new Date();
  date.setHours(hourMinutes[0]);
  date.setMinutes(hourMinutes[1]);

  return new Intl.DateTimeFormat('default',
    {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
}



export function hasOwnerPermission(departments) {
  for (const department of departments) {
    if (department.role.name === "owner") {
      return true;
    }
  }
  return false;
}

export function hasAdminPermission(departments) {
  for (const department of departments) {
    if (department.role.name === "owner" || department.role.name === "admin") {
      return true;
    }
  }
  return false;
}

export function hasOnlyUserPermission(departments) {
  for (const department of departments) {
    if (department.role.name === "owner" || department.role.name === "admin") {
      return false;
    }
  }
  return true;
}

export function getAdminPermissionDepartments(departments) {
  const adminPermissionDepartments = [];
  for (const department of departments) {
    if (department.role.name === "owner") {
      return departments;
    }
    if (department.role.name === "admin") {
      adminPermissionDepartments.push(department);
    }
  }
  return adminPermissionDepartments;
}