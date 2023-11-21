import React from 'react';
import getFormattedWeatherData from '../services/weatherService';
import { iconUrlFromCode } from '../services/weatherService';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClipLoader } from 'react-spinners';
import logo from './img/partlycloudy.png'

const Home = () => {

  const [units, setUnits]    = React.useState("metric");
  const [selectedCity, setSelectedCity] = React.useState("")
  const [cardsDisplay, setCardsDisplay] = React.useState("")
  const [searchResult, setSearchResult] = React.useState("")

  const [cityData, setCityData] = React.useState([
 {  id:1,  city:"Johannesburg", country: "South Africa", weather: null},
 {  id:2,  city:"Sydney", country: "Australia", weather: null},
 {  id:3,  city:"London", country: "Great Britain", weather: null},
 {  id:4,  city:"Tokyo", country: "Japan", weather: null},
 {  id:5,  city:"Paris", country: "France",query: {q: 'Paris'},weather: null},
 {  id:6,  city:"Berlin", country: "Germany", weather: null}])


  const cities= React.useMemo(()=>{

   return  [{q: 'Johannesburg'}, {q: 'Sydney'}, {q: 'London'},{q: 'Tokyo'},{q: 'Paris'},  {q: 'Berlin'}]
},[])

  React.useEffect(()=>{
        
    const fetchWeather = async ()=>{
    
     
      cities.forEach( async(city, index)=>{
        
        await getFormattedWeatherData({...city, units}).then((data)=>{ 
                    
                   setCityData(prevData=>{const newData = [...prevData];
                                                               newData[index].weather =data;
                                                               return newData
                 
        })}).catch((error)=>{
          console.log(error)
          setCardsDisplay("none")
          let result =(
        <div className='error-card'>
            <br/><br/>
            <div className='weather-summary-card home-card'>
                <h1 style={{color:"white", fontSize:50}}>Service down. Please try again later.</h1>
          </div>
          </div>
           )
           setSearchResult(result)
        })
       })}

   fetchWeather();
}, [cities, units])

const Refresh =()=>{
  window.location.reload()
}

const handleSearch = async () =>{

  console.log(selectedCity)
  let city ={q:selectedCity}
  toast.info('Fetching weather for '+ selectedCity)
  await getFormattedWeatherData({...city, units}).then((data)=>{
  
    toast.success('Successfully fetched data for ' + selectedCity)
    setCardsDisplay("none")
    console.log(data)
    let result =(
    <div>
        <h1>Your result</h1>
        <br/>
        <button className='home-btn' onClick={Refresh}>Home</button>
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
      </div>
     )
    setSearchResult(result)
    
   
  }).catch((error)=>{
    console.log('City not found', error)
    setCardsDisplay("none")
    let result =(
  <div className='error-card'>
      <h1>Your result</h1>
      <br/>
      <button className='home-btn' onClick={Refresh}>Home</button>
      <br/>
      <div className='weather-summary-card home-card'>
          <h1 style={{color:"white", fontSize:50}}>City not found.</h1>
      </div>
    </div>
     )
     setSearchResult(result)
  })
  
}

if(!cityData){
  return <div>Loading...</div>
}

let condition = cityData[0].weather && cityData[1].weather && cityData[2].weather && cityData[3].weather&&cityData[4].weather &&cityData[5].weather;
  return (
    <div className='home'>
           <h1> World Wide Weather  </h1>
           <div className='search-container'>
               <input placeholder='Search for a city' value={selectedCity} onChange={(e)=>setSelectedCity(e.currentTarget.value)} />
               <button className='search-btn' onClick={handleSearch}>Search</button>
               <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                  <input type="radio" class="btn-check" name="btnradio" id="btnradio1" autocomplete="on" checked onClick={()=>{setUnits("metric")}}/>
                  <label class="btn btn-outline-success" for="btnradio1">° C</label>
                  <input type="radio" class="btn-check" name="btnradio" id="btnradio2" autocomplete="on" onClick={()=>{setUnits("imperial")}}/>
                  <label class="btn btn-outline-success" for="btnradio2">° F</label>
               </div>
           </div>
            {searchResult}
           <div className='home-weather-cards' style={{display:cardsDisplay}}>     
            {condition? cityData.map((city, index)=>(
                    <div className='weather-summary-card home-card' key={index}>
                        <h1>{city.city}</h1>
                        <h2> {city.country}</h2>
                        <img src={iconUrlFromCode(city.weather.icon)} alt='' />
                        <div className='summary-info home-card-summary'>
                           <h1>{Number(city.weather.temp).toFixed()} °</h1>
                           <h2>{city.weather.details}</h2>
                        </div>
                        {city.weather && (<Link to='/details' state={{city}}><button className='view-btn' >View more</button></Link>)}
                    </div>
           )): <div style={{fontSize: "40px"}}>Loading...<ClipLoader color={'white'} size={40}/></div>}     
                        
           </div>
           <ToastContainer autoClose={5000} theme="colored" newestOnTop={true}/>
    </div>
  )
}

export default Home