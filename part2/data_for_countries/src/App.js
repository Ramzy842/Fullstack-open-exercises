import { useEffect, useState } from "react";
import Countries from "./components/Countries";
import SearchBox from "./components/SearchBox";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [backup, setBackup] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [warning, setWarning] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
      setBackup(response.data);
    });
  }, []);

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    const filteredCountries = backup.filter((country) =>
      country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (!searchValue) {
      setWarning("");
      setCountries(backup);

      return;
    }

    if (filteredCountries.length > 10 && e.target.value) {
      setCountries([]);
      setWarning("Too many matches, specify another filter");
      return;
    }

    if (filteredCountries.length === 1) {
      setWarning("");
      setCountries(filteredCountries);
      return;
    }
    if (filteredCountries.length > 1) {
      setWarning("");
      setCountries(filteredCountries);
      return;
    }

    if (filteredCountries.length === 0) {
      setWarning("No country matches your search");
      setCountries([]);
    }
  };

  return (
    <>
      <SearchBox value={searchValue} handleChange={handleChange} />
      <Countries countries={countries} warning={warning} />
    </>
  );
}

export default App;
