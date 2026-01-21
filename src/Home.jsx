import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function Home(){
  const [topPopulation, setTopPopulation] = useState([])
  const [topArea, setTopArea] = useState([])
  const [loading, setLoading] = useState(true)

  function fetchTopPopulation(){
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,population")
      .then((response) => {
        // Urutkan data berdasarkan populasi dari yang terbesar ke terkecil
        const sortedCountries = response.data.sort((a, b) => b.population - a.population);
        
        // Ambil 5 negara teratas
        const top5Countries = sortedCountries.slice(0, 5);
        
        setTopPopulation(top5Countries);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setTopPopulation([]);
      })
      .finally(() => {
        setLoading(false);
    });
  }

  function fetchTopAreaCountries() {
    axios
      .get("https://restcountries.com/v3.1/all?fields=name,flags,area")
      .then((response) => {
        const sortedCountries = response.data.sort((a, b) => b.area - a.area);
        const top5 = sortedCountries.slice(0, 5);
        setTopArea(top5);
      })
      .catch((error) => {
        console.error("Error fetching top area countries:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() =>{
    fetchTopPopulation()
    fetchTopAreaCountries()
  }, [])

  return(
    <>
      <div className=" px-8">
        <section className="text-center my-12 p-8 bg-blue-100 rounded-lg shadow-lg">
          <h1 className="flex-col text-2xl md:text-5xl font-bold text-blue-800 mb-4">Welcome to WorldUniversity</h1>
          <p className="text-xl max-w-3xl mx-auto mb-6">
            WorldUniversity adalah platform interaktif untuk menjelajahi informasi terperinci tentang negara-negara di seluruh dunia.
            Cari, bandingkan, dan pelajari data penting seperti populasi, mata uang, bahasa, dan lainnya.
          </p>

          <Link 
            to="/countrySearch"
            className="inline-block bg-blue-600 text-white font-semibold py-3 px-8 rounded-full hover:bg-blue-700 transition duration-300"
          >
            Mulai Jelajahi Sekarang!
          </Link>
        </section>

        <div>
          <h1 className="font-bold text-3xl mb-4">5 Negara dengan Populasi Terbanyak</h1>

          {loading ? (
            <p>Loading...</p>
          ): (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {topPopulation.map((country) => (
                <Link
                  key={country.name.common}
                  to={`/countrySearch/${country.name.common}`}
                  className="p-4 bg-yellow-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105"
                >
                  <img src={country.flags.png} alt="country.name.common" className="mx-auto mb-2 w-48 h-32 rounded-md"/>
                  <p className="font-semibold text-center">{country.name.common}</p>
                </Link>
              ))}
            </div>
            )
          }
        </div>

        <div className="p-4">
          <h1 className="font-bold text-3xl mb-4">5 Negara dengan Area Terluas</h1>

          {loading ? (
            <p>Loading...</p>
          ): (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {topArea.map((country) => (
                <Link
                  key={country.name.common}
                  to={`/countrySearch/${country.name.common}`}
                  className="p-4 bg-yellow-100 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:scale-105"
                >
                  <img src={country.flags.png} alt="country.name.common" className="mx-auto mb-2 w-48 h-28 rounded-md"/>
                  <p className="font-semibold text-center">{country.name.common}</p>
                </Link>
              ))}
            </div>
            )
          }
        </div>
      </div>
    </>
  )
}