import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country, countries }) => {
  const [show, setShow] = useState(false);
  const [temp, setTemp] = useState("");
  const [image, setImage] = useState('')
  const [windSpeed, setWindSpeed] = useState(0)
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    if (show || countries.length === 1) {
      try {
        axios
          .get(
            `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${country.name.common}&aqi=no`
          )
          .then((response) => {
            console.log(response);
            setTemp(response.data.current.temp_c);
            setImage(response.data.current.condition)
            setWindSpeed(response.data.current.wind_mph)
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    }
  }, [show, apiKey, country, countries.length]);

  return (
    <div>
      <h1>{country.name.common}</h1>
      {countries.length > 1 && (
        <button onClick={() => setShow(!show)}>{show ? "Hide" : "Show"}</button>
      )}

      {(show || countries.length === 1) && (
        <div>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area} </p>
          <h3>Languages</h3>
          <ul>
            {countries.length === 1 &&
              Object.values(country.languages).map((lang) => {
                return <li key={lang}>{lang} </li>;
              })}
          </ul>

          <img src={country.flags.svg} height="200" alt={country.flag} />
          <h2>Weather in {country.capital}</h2>
          <p>Temperature {temp} Celcius</p>
          <img src={image.icon} alt={image.text} />
          <p>wind {windSpeed} m/h </p>
        </div>
      )}
    </div>
  );
};

export default Country;
