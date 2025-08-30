import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { data, Link } from "react-router-dom";

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchterm] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null)

  function ambilData() {
    axios
    // HHarus passing data dlu 
      .get("https://restcountries.com/v3.1/all?fields=name,flags")
      .then(function (response) {
        console.log(response)
        setCountries(response.data);
      })
      .catch(function (error) {
        console.log(error);
        return null;
      })
      .finally(function () {
        setLoading(false);
        console.log("Done");
      });
  }

  function filterName() {
    console.log(countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    ).length)
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  useEffect(() => {
    ambilData();

    if(inputRef.current){
      inputRef.current.focus()
    }
  }, []);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-3">Country Search</h1>

      <input
        type="text"
        placeholder="Input nama negara"
        value={searchTerm}
        onChange={(e) => setSearchterm(e.target.value)}
        className="rounded-lg p-1 bg-yellow-100"
        ref={inputRef}
      />

      <div className="grid grid-cols-6 gap-6 mt-2">
        {loading ? (
          <p>Loading data...</p>
        ) : filterName().length > 0 ? (
          filterName().map((country) => (
            <Link 
                key={country.cca3}
                to={`/countrySearch/${country.name.common}`}
                className="p-4 bg-blue-100 rounded-lg hover:bg-blue-300 transition text-center"
            >
              <img src={country.flags.png} alt={country.name.common?.common} className="mx-auto mb-2 w-24 h-16 rounded-md" />
              <p className="font-semibold text-gray-800">{country.name.common}</p>
            </Link>
          ))
        ) : (
          <p>Negara tidak ditemukan</p>
        )}
      </div>

    </div>
  );
}
