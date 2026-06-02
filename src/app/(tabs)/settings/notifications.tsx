import { Button, StyleSheet, View } from "react-native"

import ToggleField from "#design/elements/fields/Toggle"
import FormGroup from "#design/elements/FormGroup"
import Typography from "#design/elements/Typegraphy"
import { createNotification } from "#shared/notifications"
import { useSettings, useSettingsSetter } from "#shared/settings"

const App: React.FC = () => {
  const settings = useSettings()
  const setSettings = useSettingsSetter()

  return (
    <View style={styles.container}>
      <Typography variant="title">Notifications</Typography>
      <Typography variant="muted" style={styles.subtitle}>
        Alerts when favorite-city weather changes (course build).
      </Typography>

      <FormGroup label="Enable Notifications">
        <ToggleField
          onChange={(value) =>
            setSettings({
              ...settings,
              notifications: {
                ...settings.notifications,
                enabled: value,
              },
            })
          }
          value={settings.notifications.enabled}
        />
      </FormGroup>

      {settings.notifications.enabled ? (
        <>
          <FormGroup label="Favorites Warnings">
            <ToggleField
              onChange={(value) =>
                setSettings({
                  ...settings,
                  notifications: {
                    ...settings.notifications,
                    favorites: value,
                  },
                })
              }
              value={settings.notifications.favorites}
            />
          </FormGroup>

          <Button
            title="Test Notification"
            onPress={() =>
              createNotification({
                title: "SkyCast Course",
                short: "Test",
                body: "Notification channel is working.",
              })
            }
          />
        </>
      ) : null}
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
