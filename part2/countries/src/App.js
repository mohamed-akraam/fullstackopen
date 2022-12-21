import axios from "axios";
import { useState, useEffect } from "react";
import Search from "./components/Search";
import Display from "./components/Display";

function App() {
  const [countries, setCountries] = useState("");
  const [loaded, setLoaded] = useState(false);
  // const [filteredCountries, setFilteredCountries] = useState('');
  const [value, setValue] = useState("");
  // const [searchParam] = useState(["capital", "name"])

  const addCountry = (e) => {
    e.preventDefault();
  };

  const handleCountryChange = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setLoaded(true);
      setCountries(response.data);
    });
  }, []);

  if (!loaded) {
    return <div>loading...</div>;
  } else {
    return (
      <div>
        <h1>Countries</h1>

        <Search
          onSubmit={addCountry}
          value={value}
          onChange={handleCountryChange}
        />

        <Display value={value} countries={countries} />
      </div>
    );
  }
}

export default App;
