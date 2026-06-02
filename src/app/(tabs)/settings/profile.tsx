import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Typography variant="title">SkyCast Course</Typography>
      <Typography variant="muted" style={styles.body}>
        This repo extends the class example with weatherApi.ts, feature modules,
        editable favorites, temperature units, loading states, and mocked
        weather tests.
      </Typography>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    padding: 16,
    justifyContent: "center",
  },
  body: {
    marginTop: 12,
    lineHeight: 22,
  },
})
