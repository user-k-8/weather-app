import React from 'react';
import img from './img/partlycloudy.png'
import tempgraph from './img/tempgraph.png'
import uv from './img/uv.png'
import { useLocation } from 'react-router-dom';
import { iconUrlFromCode } from '../services/weatherService';
import { formatToLocalTime } from '../services/weatherService';
import  {tempMin, tempMax, humidity, pressure, feels_like, sunset, sunrise, wind} from './Icons '

const LocationDetails = () => {
   
   
  let arr =[1,2,3,4,5]
  return (
    <div className='location-details-container'>
      <div className='location-details-left'>
         <div className='weather-summary-card'>
               <h1>Your Weather</h1>
               <h2>hhkhkh</h2>
               <img src={img} alt='' />
               <div className='summary-info'>
                    <h1>67 °</h1>
                    <h2>jgjgjgjg</h2>
               </div>
         </div>
         <hr className='h-line'/>
         <div className='temperature-card'>
              <h2>Hourly Forecast</h2>
              <div className='hourly-container'>
                        <div className='hour-temp'>
                           <img src={img} alt=''/>
                          <span>giugig</span> 
                          <span>89 </span>
                     </div>    
                     <div className='hour-temp'>
                           <img src={img} alt=''/>
                          <span>giugig</span> 
                          <span>89 </span>
                     </div>    
                     <div className='hour-temp'>
                           <img src={img} alt=''/>
                          <span>giugig</span> 
                          <span>89 </span>
                     </div>    
                     <div className='hour-temp'>
                           <img src={img} alt=''/>
                          <span>giugig</span> 
                          <span>89 </span>
                     </div>             
              </div>
         </div>
         <div className='map-card'>
                  <p>Explore a global map of wind,<br/> weather and ocean conditions.</p>
                  <button className='map-button'>Get Started</button>
         </div>
      </div>
      <div className='location-details-right'>
          <div className='date-time-heading'>
             <h1>hkjhkhkjhk</h1>
             <h2>gjbjbjbh</h2>
          </div>
          <div className='day-cards-container'>
            {arr.map((day)=>(

                 <div className='day-card'>
                      <span>Mon</span>
                     <img src={img} alt=' '/>
                     <span>23 °</span>
                </div>

            ))}
            
          </div>
          <div className='today-overview-container'>
            <h1>Today's overview</h1>
            <div className='overview-row-1'>
               <div className='overview-row-1-card'>
                      <h2>Min and max temp</h2>
                      
                      <div className='sun-rise-set-stats'>
                         <div className='icon'>{tempMin}</div>
                         <span>Min_temp</span>
                         <span>90 °</span>
                      </div>
                      <div className='sun-rise-set-stats'>
                         <div className='icon'>{tempMax}</div>
                         <span>Max_temp</span>
                         <span>78 °</span>
                      </div>
                </div>
                <div className='overview-row-1-card wind-card'>
                      <h2>Wind Status</h2>
                      <div className='wind-icon'>{wind}</div>
                      <div className='wind-stats'>
                        <span><span className='wind-speed'>5</span> km/h</span>
                        <span>6:20 AM</span>
                      </div>
                </div>
                <div className='overview-row-1-card'>
                      <h2>Sunrise and Sunset</h2>
                      
                      <div className='sun-rise-set-stats'>
                         <div className='icon'>{sunrise}</div>
                         <span>Sunrise</span>
                         <span>8:20 AM</span>
                      </div>
                      <div className='sun-rise-set-stats'>
                      <div className='icon'>{sunset}</div> 
                         <span>Sunset</span>
                         <span>8:20 AM</span>
                      </div>
                </div>

               </div>
               <div className='overview-row-2'>
                   <div className='overview-row-2-card'>
                      <h2>Humidity</h2>             
                      <div className='overview-row-2-text'>
                         <span>hk%</span>
                         <div><div className='icon'>{humidity}</div><span>6:20 AM</span></div>
                      </div>
                   </div>
                   <div className='overview-row-2-card'>
                      <h2>Pressure</h2>             
                      <div className='overview-row-2-text'>
                         <span>9680 Pa</span>
                         <div><div className='icon'>{pressure}</div><span>6:20 AM</span></div>
                      </div>
                   </div>
                   <div className='overview-row-2-card'>
                      <h2>Feels like</h2>             
                      <div className='overview-row-2-text'>
                         <span>89 °</span>
                         <div><div className='icon'>{feels_like}</div><span>6:20 AM</span></div>
                      </div>
                   </div>
               </div>
          </div>
      </div>
    </div>
  )
}

export default LocationDetails