import toWeather, { type Weather } from "./toWeather"

export type Location = {
  name: string
  latitude: number
  longitude: number
}

export type CurrentWeatherData = {
  condition: Weather
  temperature: number
  wind: number
  humidity: number
  uv: number
}

export type ForecastDayData = {
  day: string
  temperatureMax: number
  temperatureMin: number
  condition: Weather
}

type OpenMeteoCurrentResponse = {
  current: {
    weather_code: number
    temperature_2m: number
    wind_speed_10m: number
    relative_humidity_2m: number
    uv_index: number
  }
}

type OpenMeteoDailyResponse = {
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weather_code: number[]
  }
}

/**
 * Fetches the current weather data for a given location.
 */
export async function fetchCurrentWeather(
  location: Location,
): Promise<CurrentWeatherData> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,is_day,weather_code,wind_speed_10m,relative_humidity_2m,uv_index`,
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch current weather: ${response.statusText}`)
  }

  const data = (await response.json()) as OpenMeteoCurrentResponse

  return {
    condition: toWeather(data.current.weather_code),
    temperature: data.current.temperature_2m,
    wind: data.current.wind_speed_10m,
    humidity: data.current.relative_humidity_2m,
    uv: data.current.uv_index,
  }
}

/**
 * Fetches the multi-day forecast data for a given location.
 */
export async function fetchForecast(
  location: Location,
): Promise<ForecastDayData[]> {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&daily=temperature_2m_max,temperature_2m_min,weather_code`,
  )
  if (!response.ok) {
    throw new Error(`Failed to fetch weather forecast: ${response.statusText}`)
  }

  const data = (await response.json()) as OpenMeteoDailyResponse

  const forecast: ForecastDayData[] = []
  for (let i = 0; i < data.daily.time.length; i++) {
    forecast.push({
      day: data.daily.time[i],
      temperatureMax: data.daily.temperature_2m_max[i],
      temperatureMin: data.daily.temperature_2m_min[i],
      condition: toWeather(data.daily.weather_code[i]),
    })
  }

  return forecast
}
