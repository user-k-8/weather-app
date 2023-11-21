import { DateTime } from "luxon";

const API_KEY = "be76d5f5a5052291db0600da407f4831";
const BASE_URL = "https://api.openweathermap.org/data/2.5"

const getWeatherData = (infoType, searchParams)=>{
    const url = new URL(BASE_URL +"/" + infoType);
    url.search = new URLSearchParams({...searchParams, appid:API_KEY})
    console.log(url)
    return fetch(url)
    .then((res)=> res.json())
  
};


const formatCurrentWeather =(data)=>{

    const {
         coord: {lat, lon},
         main: {temp, feels_like, temp_min, temp_max, pressure, humidity},
         name,
         sys: {country, sunrise, sunset},
         weather,
         wind:{speed},
         dt, 
         timezone

    } = data
     
    const {main: details, icon} = weather[0]
    return {
        lat, lon, temp, feels_like, temp_min, temp_max, pressure, humidity, name,
        country, sunrise, sunset, details, icon, speed,dt, timezone
    }
}

const formatToLocalTime = (secs, zone, format= "cccc, dd LLL yyyy' | Local time: 'hh:mm a")=> {
    
    const utcDateTime = DateTime.fromSeconds(secs, {zone: 'utc'});
    const localDateTime = utcDateTime.plus({seconds: zone} );
    const formattedTime = localDateTime.toFormat(format);
    return formattedTime
}

const formatForecastWeather=(data) =>{

    
    let {timezone,list} =data
    let dailyArray = [list[0],list[8], list[16], list[24], list[32]]
    let daily = dailyArray.map(day=>{
        return{
            title: formatToLocalTime(day.dt, timezone, 'ccc' ),
            temp: day.main.temp,
            icon: day.weather[0].icon
        }
    })
   console.log(daily)

   let threeHourly = list.slice(0,4).map(time=>{

    return{
        title: formatToLocalTime(time.dt , timezone, 'hh:mm a'),
           temp: time.main.temp,
           icon: time.weather[0].icon
    }
   })
    console.log(threeHourly)

    return {daily, threeHourly}
}

const getFormattedWeatherData =  async(searchParams)=>{
    const formattedCurrentWeather = await getWeatherData(
        'weather', searchParams).then(formatCurrentWeather)

   const {lat, lon} = formattedCurrentWeather
   console.log(lat)
   const units =searchParams.units
   const formattedForecastWeather = await getWeatherData('forecast',{
    lat, lon, units
   }).then(formatForecastWeather)


   console.log(formattedCurrentWeather)
   console.log(formattedForecastWeather)
    return  { ...formattedCurrentWeather, ...formattedForecastWeather}
    
}

const iconUrlFromCode =( code)=>
    `http://openweathermap.org/img/wn/${code}@2x.png`


export default getFormattedWeatherData

export {formatToLocalTime, iconUrlFromCode}