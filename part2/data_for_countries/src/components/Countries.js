import Country from "./Country";

const Countries = ({ countries, warning }) => {
  return (
    <div>
      <p>{warning}</p>
      {countries &&
        countries.map((country) => {
          return (
            <Country
              countries={countries}
              key={country.name.common}
              country={country}
            />
          );
        })}
    </div>
  );
};

export default Countries;
