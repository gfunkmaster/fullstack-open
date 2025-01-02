import React, { useState, useEffect } from "react";
import countryService from "../../services/countries";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch all countries when the component mounts
  useEffect(() => {
    countryService.getAll().then((data) => {
      setCountries(data);
    });
  }, []);

  // Filter countries based on user input
  const filteredCountries = countries.filter((c) =>
    c.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle showing country details
  const handleShowCountry = (countryName) => {
    const updatedCountries = countries.map((country) => {
      if (country.name.common === countryName) {
        return {
          ...country,
          showDetails: !country.showDetails, // Toggle the showDetails state for the clicked country
        };
      }
      return country;
    });
    setCountries(updatedCountries); // Update the countries state
  };

  return (
    <div>
      <h1>Countries</h1>
      <div>
        Find countries:{" "}
        <input
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
          }}
        />
      </div>

      {/* Conditional rendering based on the filtered countries */}
      {filteredCountries.length > 10 ? (
        <p>Too many matches, specify another filter.</p>
      ) : filteredCountries.length > 1 ? (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>
              {country.name.common}{" "}
              <button onClick={() => handleShowCountry(country.name.common)}>
                {country.showDetails ? "Hide" : "Show"}
              </button>
              {country.showDetails && <CountryDetails country={country} />}
            </li>
          ))}
        </ul>
      ) : filteredCountries.length === 1 ? (
        <CountryDetails country={filteredCountries[0]} />
      ) : (
        <p>No matches found.</p>
      )}
    </div>
  );
};

// Component to display detailed information about a country
const CountryDetails = ({ country }) => {
  return (
    <>
      <div>
        <h2>{country.name.common}</h2>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="150"
        />
        <p>
          <strong>Capital:</strong> {country.capital?.[0]}
        </p>
        <p>
          <strong>Area:</strong> {country.area} km²
        </p>
        <p>
          <strong>Languages:</strong>
        </p>
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      </div>
      <div></div>
      <CountryWeatherDetails country={country} />
    </>
  );
};

const CountryWeatherDetails = ({ country }) => {
  const [weatherData, setWeatherData] = useState(null); // Initialize with null for no data state
console.log(weatherData)
  useEffect(() => {
    if (country.capital?.[0]) {
      countryService
        .getWeatherData(country.capital[0]) // Assume country.capital is a string
        .then((data) => setWeatherData(data))
        .catch((error) => console.error("Error fetching weather data:", error));
    }
  }, [country]);

  if (!weatherData) {
    return <div>Loading weather data...</div>;
  }

  // You can now access the weather data directly, like weatherData.main, weatherData.weather, etc.
  return (
    <div>
      <h1>Weather in {country.capital?.[0]}</h1>
      <p>
        <strong>Temperature:</strong> {weatherData.main.temp}°C
      </p>
      <p>
        <strong>Feels like:</strong> {weatherData.main.feels_like}°C
      </p>
      <p>
        <strong>Weather:</strong> {weatherData.weather[0]?.description}
      </p>
      <p>
        <strong>Wind Speed:</strong> {weatherData.wind.speed} m/s
      </p>
      <p>
        <strong>Humidity:</strong> {weatherData.main.humidity}%
      </p>

      {/* Additional data if needed */}
      <div>
        <h3>Cloud Coverage</h3>
        <p>{weatherData.clouds.all}%</p>
      </div>
    </div>
  );
};

export default Countries;
