import { StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import ToggleField from "#design/elements/fields/Toggle"
import FormGroup from "#design/elements/FormGroup"
import Typography from "#design/elements/Typegraphy"
import { useSettings, useSettingsSetter } from "#shared/settings"

const App: React.FC = () => {
  const settings = useSettings()
  const setSettings = useSettingsSetter()

  return (
    <View style={styles.container}>
      <Typography variant="title">Settings</Typography>
      <FormGroup label="Home title" hint="Shown on the home tab">
        <TextField
          onChange={(value) =>
            setSettings({
              ...settings,
              home: { ...settings.home, name: value },
            })
          }
          value={settings.home.name}
        />
      </FormGroup>

      <FormGroup label="Fahrenheit">
        <ToggleField
          onChange={(value) =>
            setSettings({
              ...settings,
              units: value ? "fahrenheit" : "celsius",
            })
          }
          value={settings.units === "fahrenheit"}
        />
      </FormGroup>
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
  subtitle: {
    marginBottom: 16,
    textAlign: "center",
  },
})
