const Display = ({ countries, value }) => {
  const fCountries = countries.filter((country) => {
    if (value !== "") {
      return country.name.common.toLowerCase().includes(value);
    }
    return "";
  });

  if (fCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <div>
      {fCountries.map((country) => {
        if (fCountries.length > 1) {
          return <p key={country.name.common}>{country.name.common}</p>;
        } else {
          return (
            <div key={country.name.common}>
              <h1>{country.name.common}</h1>
              <p>Capital {country.capital}</p>
              <p>area {country.area}</p>

              <h3>Languages</h3>

              {Object.keys(country.languages).map((item) => {
                return (
                  <ul key={country.languages[item]}>
                    <li>{country.languages[item]}</li>
                  </ul>
                );
              })}

              <p>Region {country.region}</p>
              <p className="flag">{country.flag}</p>
            </div>
          );
        }
      })}
    </div>
  );
};

export default Display;
