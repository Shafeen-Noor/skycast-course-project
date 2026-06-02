import AsyncStorage from "@react-native-async-storage/async-storage"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type TemperatureUnit = "celsius" | "fahrenheit"

export type Settings = {
  home: {
    name: string
  }
  units: TemperatureUnit
  notifications: {
    enabled: boolean
    favorites: boolean
  }
}

const defaultSettings: Settings = {
  home: {
    name: "My Weather",
  },
  units: "celsius",
  notifications: {
    enabled: false,
    favorites: true,
  },
}

const STORAGE_KEY = "skycast-course-settings"

const Context = createContext<
  | {
      set: (settings: Settings) => void
      settings: Settings
    }
  | undefined
>(undefined)

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<Settings>(defaultSettings)

  useEffect(() => {
    void AsyncStorage.getItem(STORAGE_KEY).then((cached) => {
      if (!cached) return

      const parsed = JSON.parse(cached) as Settings
      setSettings(parsed)
    })
  }, [])

  const value = useMemo(
    () => ({
      set: (next: Settings) => {
        setSettings(next)
        void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      },
      settings,
    }),
    [settings],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useSettings(): Settings {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SettingsProvider.")

  return context.settings
}

export function useSettingsSetter(): (settings: Settings) => void {
  const context = useContext(Context)
  if (!context) throw new Error("Missing SettingsProvider.")

  return context.set
}
