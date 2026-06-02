import { useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"
import { subscribeDeviceMotion } from "#shared/sensors"

const App: React.FC = () => {
  const [sample, setSample] = useState("Waiting for motion…")

  useEffect(
    () =>
      subscribeDeviceMotion((motion) => {
        setSample(
          `x ${motion.accelerationIncludingGravity.x.toFixed(2)} · y ${motion.accelerationIncludingGravity.y.toFixed(2)}`,
        )
      }),
    [],
  )

  return (
    <View style={styles.container}>
      <Typography variant="title">Device Motion</Typography>
      <Typography variant="muted" style={styles.sample}>
        {sample}
      </Typography>
      <Typography variant="label">
        Course build shows the latest reading on screen (example logs only).
      </Typography>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  sample: {
    marginVertical: 16,
    fontSize: 16,
  },
})
