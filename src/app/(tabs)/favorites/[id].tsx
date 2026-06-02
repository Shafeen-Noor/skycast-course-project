import { Stack, useLocalSearchParams } from "expo-router"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { useFavoritesManager } from "#shared/favorites"
import { useSettings } from "#shared/settings"
import { CurrentWeather, Forecast } from "#shared/weather"

const App: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>()
  const { favorites } = useFavoritesManager()
  const settings = useSettings()
  const location = favorites.find((favorite) => favorite.name === id)

  return (
    <>
      <Stack.Screen options={{ title: location?.name ?? "Favorite" }} />

      <View style={styles.container}>
        {!location ? (
          <Typography variant="muted">
            City not found. Add it from the Favorites tab.
          </Typography>
        ) : (
          <>
            <CurrentWeather location={location} units={settings.units} />
            <Forecast location={location} units={settings.units} />
          </>
        )}
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
  },
})
