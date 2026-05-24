import { useEffect, useState } from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"

import Card from "../design/Card"

import {
  fetchForecast,
  type ForecastDayData,
  type Location,
} from "./weatherApi"

export const Forecast: React.FC<{
  location: Location
}> = ({ location }) => {
  const [data, setData] = useState<ForecastDayData[]>()

  useEffect(() => {
    void (async () => {
      try {
        const result = await fetchForecast(location)
        setData(result)
      } catch (error) {
        console.error(error)
      }
    })()
  }, [location])

  return (
    <Card>
      <ScrollView horizontal style={styles.days}>
        {data?.map(({ day, temperatureMax, temperatureMin, condition }) => (
          <View key={day} style={styles.day}>
            <Text style={styles.temperatureMax}>{temperatureMax} C</Text>
            <Text style={styles.temperatureMin}>{temperatureMin} C</Text>
            <Text style={styles.condition}>{condition}</Text>
          </View>
        ))}
      </ScrollView>
    </Card>
  )
}

const styles = StyleSheet.create({
  temperatureMax: { fontSize: 18 },
  temperatureMin: { fontSize: 14, color: "#888" },
  condition: { fontWeight: "bold" },
  days: { flexGrow: 0, flexDirection: "row" },
  day: { flex: 1, alignItems: "center", marginHorizontal: 16 },
})
