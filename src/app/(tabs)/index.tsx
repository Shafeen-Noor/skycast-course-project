import { StyleSheet, Text, View } from "react-native"

import { CurrentWeather, Forecast } from "#shared/weather"

const location = { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 }

const App: React.FC = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Weather App</Text>

        <CurrentWeather location={location} />
        <Forecast location={location} />
      </View>
    </>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
})
