import {
  unixToLocalTime,
  kmToMiles,
  mpsToMph,
  timeTo12HourFormat,
} from "./converters";

export const getWindSpeed = (unitSystem, windInMps) =>
    unitSystem === "metric" ? windInMps : mpsToMph(windInMps);

export const getVisibility = (unitSystem, visibilityInMeters) =>
    unitSystem === "metric"
        ? (visibilityInMeters / 1000).toFixed(1) // Convertir en kilomètres
        : kmToMiles(visibilityInMeters / 1000); // Convertir en miles

export const getTime = (unitSystem, currentTime, timezone) =>
    unitSystem === "metric"
        ? unixToLocalTime(currentTime, timezone) // Format 24 heures
        : timeTo12HourFormat(unixToLocalTime(currentTime, timezone)); // Format 12 heures

export const getAMPM = (unitSystem, currentTime, timezone) => {
  const localTime = unixToLocalTime(currentTime, timezone);
  if (unitSystem === "imperial") {
    const hour = parseInt(localTime.split(":")[0], 10);
    return hour >= 12 ? "PM" : "AM";
  }
  return ""; // Pas de AM/PM pour le système métrique
};

export const getWeekDay = (weatherData) => {
  if (!weatherData || !weatherData.dt || !weatherData.timezone) {
    return "Loading..."; // Valeur par défaut si les données ne sont pas disponibles
  }

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const date = new Date((weatherData.dt + weatherData.timezone) * 1000);

  return weekday[date.getUTCDay()];
};
