import React from 'react';
import img from './img/partlycloudy.png';
import getFormattedWeatherData from '../services/weatherService';
import { iconUrlFromCode } from '../services/weatherService';
import { Link } from 'react-router-dom';

const Home = () => {

  const [units, setUnits]    = React.useState("metric");
  const [selectedCity, setSelectedCity] = React.useState("")
  const [cardsDisplay, setCardsDisplay] = React.useState("")
  const [searchResult, setSearchResult] = React.useState("")

  const [cityData, setCityData] = React.useState([
 {  id:1,  city:"Johannesburg", country: "South Africa", weather: null},
 {  id:1,  city:"Sydney", country: "Australia", weather: null},
 {  id:1,  city:"London", country: "Great Britain", weather: null},
 {  id:1,  city:"Tokyo", country: "Japan", weather: null},
 {  id:1,  city:"Paris", country: "France",query: {q: 'Paris'},weather: null},
 {  id:1,  city:"Berlin", country: "Germany", weather: null}])


  const cities= React.useMemo(()=>{

   return  [{q: 'Johannesburg'}, {q: 'Sydney'}, {q: 'London'},{q: 'Tokyo'},{q: 'Paris'},  {q: 'Berlin'}]
},[])

//   React.useEffect(()=>{
        
//     const fetchWeather = async ()=>{
    
//       cities.forEach( async(city, index)=>{
        
//         await getFormattedWeatherData({...city, units}).then((data)=>{ 
//                    setCityData(prevData=>{const newData = [...prevData];
//                                                                newData[index].weather =data;
//                                                                return newData

//         })})
//        })}

//    fetchWeather();
// }, [cities, units])


console.log(cityData)
const handleSearch = async () =>{
  console.log(selectedCity)
  let city ={q:selectedCity}
  await getFormattedWeatherData({...city, units}).then((data)=>{
  
    setCardsDisplay("none")
    console.log(data)
    let result =(
      <>
      <h1>Your result</h1>
      <div className='weather-summary-card home-card'>
      <h1>{data.name}</h1>
      <h2> {data.country}</h2>
      <img src={iconUrlFromCode(data.icon)} alt='' />
      <div className='summary-info'>
         <h1>{Number(data.temp).toFixed()} °</h1>
         <h2>{data.details}</h2>
      </div>
      <Link to='/searchresult' state={{data}}><button className='search-btn' >View more</button></Link>
    </div>
    </>
    )
    setSearchResult(result)
  })
  
}

let arr =[1,2,3,4,5,6]
if(!cityData){
  return <div>Loading...</div>
}
let condition = cityData[0].weather && cityData[1].weather && cityData[2].weather && cityData[3].weather&&cityData[4].weather &&cityData[5].weather;
  return (
    <div className='home'>
           <h1> <img src={""} alt='' />World Wide Weather  </h1>
           <div className='search-container'>
               <input placeholder='Search for a city' value={selectedCity} onChange={(e)=>setSelectedCity(e.currentTarget.value)} />
               <button className='search-btn' onClick={handleSearch}>Search</button>
               <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="off" onClick={()=>{setUnits("metric")}} checked/>
                  <label class="btn btn-outline-success" for="btnradio1">° C</label>

                  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="off" onClick={()=>{setUnits("imperial")}}/>
                  <label class="btn btn-outline-success" for="btnradio2">° F</label>
               </div>
           </div>
            {searchResult}
           <div className='home-weather-cards' style={{display:cardsDisplay}}>   
          
           {arr.map((city, index)=>(
                        <div className='weather-summary-card home-card'>
                        <h1>City</h1>
                        <h2> Country</h2>
                        <img src={""} alt='' />
                        <div className='summary-info home-card-summary'>
                           <h1>14 °</h1>
                           <h2>Partly Cloudy</h2>
                        </div>
                        <button className='view-btn' >View more</button>
                      </div>
           ))}     
                
               
           </div>
    </div>
  )
}

export default Home