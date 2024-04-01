import { ChangeEvent, useEffect, useState } from "react"
import { forecastType, optionType } from "../types"

const useForecast = () => {
    const [term, setTerm] = useState<string>('')
    const [options, setOptions] = useState<[]>([])
    const [city, setCity] = useState<optionType | null>(null)
    const getSearchOptions = (value: string) => {
      const apiKey = import.meta.env.VITE_APP_API_KEY
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${apiKey}`;
      fetch(url)
      .then((res) => res.json())
      .then((data)=> setOptions(data))
    }
  
    const onInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.trim()
      setTerm(value)
      if (value === '') return
      getSearchOptions(value);

     }
  
     const [forecast, setForecast] = useState<forecastType | null>(null)
     const getForecast = (city: optionType) => {
       const apiKey = import.meta.env.VITE_APP_API_KEY
       const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&eunits=metric&appid=${apiKey}`;
       fetch(url)
       .then((res) => res.json())
       .then((data) => {
         const forecastData = {
         ...data.city,
         list: data.list.slice(0,16)
         }
         
         setForecast(forecastData)})
   
   
     }
     
    const onSubmit = () => {
      if (!city) return
      getForecast(city)
    }
    
    const onOptionSelect = (option: optionType) => {
      setCity(option)     
  
    }
   useEffect(()=> {
    if (city) {
      setTerm(city.name)
      setOptions([])
    }
   }, [city])
   return {
    term, options, forecast, onInputChange, onOptionSelect, onSubmit
   }
}

export default useForecast