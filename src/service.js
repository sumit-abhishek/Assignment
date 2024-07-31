//Validation Function for PAN Number
export function panCardValidation(panCardNo) {
  let panRegex = new RegExp(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/);
  return panRegex.test(panCardNo);
}

//Validation Function for Email Address
export function emailAddressValidation(email) {
  let emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
  return emailRegex.test(email);
}

//Validation Function for Email Address
export function postalCodeValidation(postCode) {
  let postRegex = new RegExp(/^\d{6}$/);
  return postRegex.test(postCode);
}

//SavingData in Local Storage
export function saveToLocalStorage(key, value) {
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  localStorage.setItem(key, value);
}

//Fetching Data from Local Storage
export function fetchFromLocalStorage(key) {
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (error) {
    console.log("Error message", error);
    return value;
  }
}

