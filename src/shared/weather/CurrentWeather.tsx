import { useEffect, useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import { LoadingState } from "#design/elements/LoadingState"
import Typography from "#design/elements/Typegraphy"
import { hapticImpact } from "#shared/haptics"
import { type TemperatureUnit } from "#shared/settings"

import { error } from "../design/foundations/colors"
import { between } from "../design/foundations/spacing"

import { formatTemperature } from "./formatTemperature"
import { type WeatherLocation } from "./types"
import { fetchCurrentWeather, type CurrentWeatherData } from "./weatherApi"

export const CurrentWeather: React.FC<{
  location?: WeatherLocation
  units?: TemperatureUnit
  refreshKey?: number
}> = ({ location, units = "celsius", refreshKey = 0 }) => {
  const [data, setData] = useState<CurrentWeatherData>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()

  useEffect(() => {
    void (async () => {
      if (!location) return

      setLoading(true)
      setErrorMessage(undefined)

      try {
        const result = await fetchCurrentWeather(location)
        setData(result)
      } catch (err) {
        setErrorMessage(
          err instanceof Error ? err.message : "Could not load weather",
        )
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [location, refreshKey])

  if (loading && !data) {
    return (
      <Card>
        <LoadingState />
      </Card>
    )
  }

  if (errorMessage) {
    return (
      <Card>
        <Typography variant="label" style={{ color: error }}>
          {errorMessage}
        </Typography>
      </Card>
    )
  }

  return (
    <Card>
      <Pressable onPress={() => hapticImpact()}>
        <View style={styles.current}>
          <Typography variant="title">
            {data ? formatTemperature(data.temperature, units) : "--"}
          </Typography>
          <Typography variant="muted">{location?.name ?? "--"}</Typography>
          <Typography variant="label">{data?.condition ?? "--"}</Typography>
        </View>
      </Pressable>

      <View style={styles.stats}>
        <View style={styles.stat}>
          <Typography variant="large">
            {data?.wind.toFixed(0) ?? "--"} km/h
          </Typography>
          <Typography variant="label">Wind</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">
            {data?.humidity.toFixed(0) ?? "--"}%
          </Typography>
          <Typography variant="label">Humidity</Typography>
        </View>
        <View style={styles.stat}>
          <Typography variant="large">{data?.uv.toFixed(0) ?? "--"}</Typography>
          <Typography variant="label">UV</Typography>
        </View>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  current: {
    alignItems: "center",
    marginBottom: between,
  },
  stats: {
    flexDirection: "row",
  },
  stat: {
    flex: 1,
    alignItems: "center",
  },
})
