import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, View } from "react-native"

import Card from "#design/elements/Card"
import { LoadingState } from "#design/elements/LoadingState"
import Typography from "#design/elements/Typegraphy"
import { type TemperatureUnit } from "#shared/settings"

import { between } from "../design/foundations/spacing"

import { formatTemperature } from "./formatTemperature"
import { type WeatherLocation } from "./types"
import { fetchForecast, type ForecastDayData } from "./weatherApi"

export const Forecast: React.FC<{
  location?: WeatherLocation
  units?: TemperatureUnit
  refreshKey?: number
}> = ({ location, units = "celsius", refreshKey = 0 }) => {
  const [data, setData] = useState<ForecastDayData[]>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    void (async () => {
      if (!location) return

      setLoading(true)
      try {
        const result = await fetchForecast(location)
        setData(result)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    })()
  }, [location, refreshKey])

  if (loading && !data) {
    return (
      <Card>
        <LoadingState label="Loading forecast…" />
      </Card>
    )
  }

  return (
    <Card>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Typography variant="muted" style={styles.dayLabel}>
              {day.slice(5)}
            </Typography>
            <Typography variant="large">
              {formatTemperature(temperatureMax, units)}
            </Typography>
            <Typography variant="muted">
              {formatTemperature(temperatureMin, units)}
            </Typography>
            <Typography variant="label">{condition}</Typography>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  days: { flexGrow: 0, flexDirection: "row" },
  day: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: between,
    minWidth: 72,
  },
  dayLabel: {
    marginBottom: 4,
    fontSize: 11,
  },
})
