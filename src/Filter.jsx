import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Filter() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null)

  const [selectedRegion, setSelectedRegion] = useState("")
  const [regions, setRegions] = useState([])

  const [languages, setLanguages] = useState([])
  const [selectedLanguage, setSelectedLanguage] = useState("")

  const [selectedIndependent, setSelectedIndependent] = useState("")

  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    const ambilData = async() => {
      try{
        setLoading(true)

        const response = await axios.get("https://restcountries.com/v3.1/all?fields=name,flags,region,languages,independent")
        setCountries(response.data)

        const allRegions = response.data.map(country => country.region)
        const uniqueRegions = [...new Set(allRegions)].sort()
        setRegions(uniqueRegions)

        const allLanguages = response.data.flatMap(country => Object.values(country.languages || {}))
        const uniqueLanguages = [...new Set(allLanguages)].sort()
        setLanguages(uniqueLanguages)

      } catch(error){
        console.error("Terjadi kesalahan saat mengambil data.", error)
      } finally{
        setLoading(false)
      }
    }
    ambilData()
  }, [])

  useEffect(() => {
    let result = countries
    
    if(selectedRegion){
        result = result.filter(country => country.region === selectedRegion)
    }
    
    if(selectedLanguage){
        result = result.filter(country => {
            return Object.values(country.languages || {}).includes(selectedLanguage)
        })
    }

    if(selectedIndependent !== ""){
      const isIndependent = selectedIndependent === "true"
      result = result.filter(country => country.independent === isIndependent)
    }

    if(inputRef.current){
      inputRef.current.focus()
    }

    setFilteredCountries(result)
  }, [countries, selectedRegion, selectedLanguage, selectedIndependent]);

  return (
    <div>
      <h1 className="font-bold text-3xl mb-3 text-center">🌍 Country Search</h1>

      {/* Region */}
      <div className="flex flex-col gap-4 justify-center mb-4">
        <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="rounded-lg p-2 bg-yellow-100 border border-gray-300"
        >
            <option value="">Semua Region</option>
            {regions.map((regions) =>(
                <option key={regions} value={regions}>{regions}</option>
            ))}
        </select>

        {/* Languange */}
        <select 
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className="rounded-lg p-2 bg-yellow-200 border border-gray-300"
        >
            <option value="">Semua Bahasa</option>
            {languages.map((language) => (
                <option key={language} value={language}>
                    {language}
                </option>
            ))}
        </select>

        {/* Independent */}
        <select
          value={selectedIndependent}
          onChange={(e) => setSelectedIndependent(e.target.value)}
          className="rounded-lg p-2 bg-yellow-400 border border-gray-300"
        >
          <option value="">Semua Status</option>
          <option value="true">Independen</option>
          <option value="false">Not Independen</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-2">
        {loading ? (
          <p className="col-span-full text-center">Loading data...</p>
        ) : filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <Link 
                key={country.cca3}
                to={`/countrySearch/${country.name.common}`}
                className="p-4 bg-blue-100 rounded-lg hover:bg-blue-300 transition text-center"
            >
              <img src={country.flags.png} alt={country.name.common} className="mx-auto mb-2 w-24 h-16 rounded-md" />
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
