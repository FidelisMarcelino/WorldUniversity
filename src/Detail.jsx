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
    ambilData()
  }, [])

  if(!data){
    return <div>Loading...</div>
  }

  const languages = data.languages ? Object.values(data.languages).join(', ') : 'Tidak ada data bahasa'
  const currencies =data.currencies ? Object.values(data.currencies).map(c => c.name) .join(',') : "Tidak ada data mata uang"

  return(
    <div>
        <div>
            <Link to="/countrySearch" className="bg-red-500 p-1 rounded-md">
                <button>Back</button>
            </Link>
        </div>

        <div>
            <h1 className="font-bold text-4xl mt-3">{data.name.common}</h1>
            <img src={data.flags.png} alt={data.name.common} />
            <p>Region: {data.region}</p>
            <p>Capital: {data.capital}</p>
            <p>Languages: {languages}</p>
            <p>Population: {data.population.toLocaleString()}</p>
            <p>Luas Wilayah: {data.area.toLocaleString()}</p>
            <p>Mata Uang: {currencies}</p>
            <p>Status: {data.independent ? "Merdeka" : "Tidak Merdeka"}</p>
            <a href={data.maps.googleMaps} target="_blank" rel="noopener noreferrer">Lihat Peta</a>
        </div>
    </div>
  )
}