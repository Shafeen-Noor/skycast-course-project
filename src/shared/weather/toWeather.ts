const codeMap = {
  0: "Clear",

  1: "Cloudy",
  2: "Cloudy",
  3: "Overcast",

  45: "Fog",
  48: "Fog",

  51: "Light Rain",
  53: "Moderate Rain",
  55: "Heavy Rain",
  56: "Light Rain",
  57: "Heavy Rain",
  61: "Light Rain",
  63: "Moderate Rain",
  65: "Heavy Rain",
  66: "Light Rain",
  67: "Heavy Rain",
  80: "Light Rain",
  81: "Moderate Rain",
  82: "Heavy Rain",

  71: "Light Snow",
  73: "Moderate Snow",
  75: "Heavy Snow",
  77: "Light Snow",
  85: "Light Snow",
  86: "Heavy Snow",

  95: "Thunderstorm",
  96: "Thunderstorm",
  99: "Thunderstorm",
} as const

type WeatherCode = keyof typeof codeMap
export type Weather = (typeof codeMap)[WeatherCode] | "Unknown"

export default function toWeather(input: number): Weather {
  if (input in codeMap) {
    return codeMap[input as WeatherCode]
  }

  return "Unknown"
}
