import { useState } from "react"
import { Pressable, ScrollView, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { colors } from "#design/foundations"
import { hapticImpact } from "#shared/haptics"
import { useSettings } from "#shared/settings"
import { CurrentWeather, Forecast, useCurrentLocation } from "#shared/weather"

export const HomeScreen: React.FC = () => {
  const location = useCurrentLocation()
  const settings = useSettings()
  const [refreshKey, setRefreshKey] = useState(0)

  const handleRefresh = () => {
    hapticImpact()
    setRefreshKey((value) => value + 1)
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Typography variant="title">{settings.home.name}</Typography>
        <Typography variant="muted">Live weather · {settings.units}</Typography>
        <Pressable style={styles.refresh} onPress={handleRefresh}>
          <Typography variant="label">Refresh</Typography>
        </Pressable>
      </View>

      <CurrentWeather
        location={location}
        units={settings.units}
        refreshKey={refreshKey}
      />
      <Forecast
        location={location}
        units={settings.units}
        refreshKey={refreshKey}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    paddingVertical: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  refresh: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#e0f2fe",
  },
})
