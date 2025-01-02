import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getCountrySpecific = (country) => {
  const req = axios.get(
    `https://studies.cs.helsinki.fi/restcountries/api/name/${country}`
  );
  return req.then((resp) => resp.data);
};

const getWeatherData = (city) => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const req = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
  );
  return req.then((resp) => resp.data);
};

export default { getAll, getCountrySpecific, getWeatherData };
