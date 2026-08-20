export const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:8181/"
  : "https://med_appt.com/";

console.log("API_URL :", API_URL);
