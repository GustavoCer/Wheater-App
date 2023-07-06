
import axios from 'axios'
import { useState, useEffect } from 'react'
import './App.css'
import Degrees from './components/Degrees'
import Loading from './components/Loading'
import Loading2 from './components/Loading2'
import WeatherCard from './components/WeatherCard'

function App() {

  const [coords, setcoords] = useState()

  const [weather, setWeather] = useState()

  const [temperature, setTemperature] = useState()

  const success = (pos) => {
    setcoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude
    
    })
    
  }
  useEffect(() => {

    navigator.geolocation.getCurrentPosition(success)
  }, [])

  useEffect(() => {
    if (coords){
      const apiKey = `07c948f7785464521dda3de623090b71`
    
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}`
      axios.get(URL)

      .then(res => {
        const celsius =  (res.data.main.temp - 273.15).toFixed(1)
        const farenheit =   (celsius * 9/5 + 3).toFixed(1)
        setTemperature({celsius, farenheit})
      
        setWeather(res.data)}) 
      .catch(err => console.log(err))
    }
  }, [coords]) 

  

  return (
    <main className='main main__loader'>
    <div className="App">
      <section>
      {
        weather ? 
        <WeatherCard weather={weather}  /> 
        
        : <Loading />
      }
      {
        weather ? 
        <Degrees temperature={temperature} />
        
        : <Loading2 />
      }

      </section>
    </div>
    </main>
  )
}

export default App
