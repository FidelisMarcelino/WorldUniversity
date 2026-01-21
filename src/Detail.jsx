import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

export default function Detail(){
  const [data, setData] = useState()
  const {name} = useParams()

  function ambilData(){
    axios.get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(function (response) {
          setData(response.data[0])
          // console.log(response)
      })
      .catch(function (error) {
          console.log(error);
          return null
      })
      .finally(function () {
          console.log("Done")
      });    
  }
  
  useEffect(()=>{
    ambilData();
  }, [])

  if(!data){
    return <div>Loading...</div>
  }

  const languages = data.languages ? Object.values(data.languages).join(', ') : 'Tidak ada data bahasa'
  const currencies = data.currencies 
  ? Object.entries(data.currencies)
    .map(([code, value]) => `${value.name} (${code})`)
    .join(', ') 
  : "Tidak ada data mata uang"

  return(
    <div className="flex flex-col">
        <div className="mt-2">
            <Link to="/countrySearch" className="bg-red-500 p-1 rounded-md">
                <button>Back</button>
            </Link>
        </div>

        <div>
            <div className="flex flex-col md:flex-row items-center">
              <div className="flex flex-row items-center">
                <img className="mt-3 rounded-md border-2 border-gray-400" src={data.flags.png} alt={data.name.common} />
              </div>

              <div className="md:ml-5 mt-3">
                <h1 className="font-bold text-4xl">{data.name.common}</h1>
                <p className="text-gray-500 text-xl">Region: {data.region} | Capital: {data.capital}</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="mr-4">
                <p className="text-xl font-semibold mt-2">💬 Languages</p>
                <p className="ml-8 w-72">{languages}</p>

                <p className="text-xl font-semibold mt-2">🧑‍🤝‍🧑 Population</p>
                <p className="ml-8">{data.population.toLocaleString()}</p>

                <p className="text-xl font-semibold mt-2">🌍 Area</p>
                <p className="ml-8">{data.area.toLocaleString()} km²</p>
              </div>

              <div>
                <p className="text-xl font-semibold mt-2">💲 Currency</p>
                <p className="ml-8">{currencies}</p>

                <p className="text-xl font-semibold mt-2">🚩 Status</p>
                <p className="ml-8">{data.independent ? "Independent" : "Not Independent"}</p>

                <p className="text-xl font-semibold mt-2">🔗 Open in Maps</p>
                <a href={data.maps.googleMaps} target="_blank" rel="noopener noreferrer">
                  <button className="bg-purple-950 text-white font-medium p-1 rounded-lg ml-8 mt-1">Open Now!</button>
                </a>
              </div>
            </div>
        </div>
    </div>
  )
}