import React from 'react';
import { useLocation } from 'react-router-dom';
import { iconUrlFromCode } from '../services/weatherService';
import { formatToLocalTime } from '../services/weatherService';
import  {tempMin, tempMax, humidity, pressure, feels_like, sunset, sunrise, wind} from './Icons '

const LocationDetails = () => {
   
  const location = useLocation()
  const { city } = location.state
  console.log(city)
  return (
    <div className='location-details-container'>
      <div className='location-details-left'>
         <div className='weather-summary-card'>
               <h1>Your Weather</h1>
               <h2>{city.city},  {city.country}</h2>
               <img src={iconUrlFromCode(city.weather.icon)} alt='' />
               <div className='summary-info'>
                <h1>{Number(city.weather.temp).toFixed() } °</h1>
                <h2>{city.weather.details}</h2>
               </div>
         </div>
         <hr className='h-line'/>
         <div className='temperature-card'>
              <h2>Hourly Forecast</h2>
              <div className='hourly-container'>
                 {city.weather.threeHourly.map((hour)=>(
                        <div className='hour-temp'>
                           <img src={iconUrlFromCode(hour.icon)} alt=''/>
                          <span>{hour.title}</span> 
                          <span>{`${Number(hour.temp).toFixed()} °`} </span>
                     </div>
                 ))}
              </div>
         </div>
         <div className='map-card'>
                  <p>Explore a global map of wind,<br/> weather and ocean conditions.</p>
                  <button className='map-button'>Get Started</button>
         </div>
      </div>
      <div className='location-details-right'>
          <div className='date-time-heading'>
             <h1> {formatToLocalTime(Number(city.weather.dt), city.weather.timezone, 'LLL yyyy') }</h1>
             <h2> {formatToLocalTime(Number(city.weather.dt), city.weather.timezone) }</h2>
          </div>
          <div className='day-cards-container'>
            {city.weather.daily.map((day)=>(

                 <div className='day-card'>
                      <span>{day.title}</span>
                     <img src={iconUrlFromCode(day.icon)} alt=' '/>
                     <span>{`${Number(day.temp).toFixed()} °`}</span>
                </div>

            ))}
            
          </div>
          <div className='today-overview-container'>
            <h1>Today's overview</h1>
            <div className='overview-row-1'>
               <div className='overview-row-1-card'>
                      <h2>Min and max temperature</h2>
                      
                      <div className='sun-rise-set-stats'>
                         <div className='icon'>{tempMin}</div>
                         <span>Min_temp</span>
                         <span>{Number(city.weather.temp_min).toFixed()} °</span>
                      </div>
                      <div className='sun-rise-set-stats'>
                         <div className='icon'>{tempMax}</div>
                         <span>Max_temp</span>
                         <span>{Number(city.weather.temp_max).toFixed()} °</span>
                      </div>
                </div>
                <div className='overview-row-1-card wind-card'>
                      <h2>Wind Status</h2>
                      <div>{wind}</div>
                      <div className='wind-stats'>
                        <span><span className='wind-speed'>{city.weather.speed}</span> km/h</span>
                        <span>{ formatToLocalTime(city.weather.dt , city.weather.timezone, 'hh:mm a')}</span>
                      </div>
                </div>
                <div className='overview-row-1-card'>
                      <h2>Sunrise and Sunset</h2>
                      
                      <div className='sun-rise-set-stats'>
                         <div className='icon'>{sunrise}</div>
                         <span>Sunrise</span>
                         <span>{formatToLocalTime(city.weather.sunrise, city.weather.timezone, 'hh:mm a')}</span>
                      </div>
                      <div className='sun-rise-set-stats'>
                      <div className='icon'>{sunset}</div> 
                         <span>Sunset</span>
                         <span>{formatToLocalTime(city.weather.sunset, city.weather.timezone, 'hh:mm a')}</span>
                      </div>
                </div>

               </div>
               <div className='overview-row-2'>
                   <div className='overview-row-2-card'>
                      <h2>Humidity</h2>             
                      <div className='overview-row-2-text'>
                         <span>{city.weather.humidity}%</span>
                         <div><div className='icon'>{humidity}</div><span>{ formatToLocalTime(city.weather.dt , city.weather.timezone, 'hh:mm a')} </span></div>
                      </div>
                   </div>
                   <div className='overview-row-2-card'>
                      <h2>Pressure</h2>             
                      <div className='overview-row-2-text'>
                         <span>{Number(city.weather.pressure).toFixed()} Pa</span>
                         <div><div className='icon'>{pressure}</div><span>{ formatToLocalTime(city.weather.dt , city.weather.timezone, 'hh:mm a')}</span></div>
                      </div>
                   </div>
                   <div className='overview-row-2-card'>
                      <h2>Feels like</h2>             
                      <div className='overview-row-2-text'>
                         <span>{Number(city.weather.feels_like).toFixed()}°</span>
                         <div><div className='icon'>{feels_like}</div><span>{ formatToLocalTime(city.weather.dt , city.weather.timezone, 'hh:mm a')}</span></div>
                      </div>
                   </div>
               </div>
          </div>
      </div>
    </div>
  )
}

export default LocationDetails