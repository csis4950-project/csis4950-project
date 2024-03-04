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

