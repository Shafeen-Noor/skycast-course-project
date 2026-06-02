import AsyncStorage from "@react-native-async-storage/async-storage"
import { useCallback, useEffect, useState } from "react"

import { type WeatherLocation } from "#shared/weather"

const STORAGE_KEY = "skycast-course-favorites"

const starterFavorites: WeatherLocation[] = [
  { name: "Barcelona", latitude: 41.385063, longitude: 2.173404 },
  { name: "Reno", latitude: 39.5299, longitude: 119.8143 },
]

export function useFavoritesManager(): {
  favorites: WeatherLocation[]
  ready: boolean
  addFavorite: (location: WeatherLocation) => Promise<boolean>
  removeFavorite: (name: string) => Promise<void>
} {
  const [favorites, setFavorites] = useState<WeatherLocation[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    void (async () => {
      const cached = await AsyncStorage.getItem(STORAGE_KEY)
      if (cached) {
        setFavorites(JSON.parse(cached) as WeatherLocation[])
      } else {
        setFavorites(starterFavorites)
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(starterFavorites),
        )
      }
      setReady(true)
    })()
  }, [])

  const persist = useCallback(async (next: WeatherLocation[]) => {
    setFavorites(next)
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  }, [])

  const addFavorite = useCallback(
    async (location: WeatherLocation) => {
      const exists = favorites.some(
        (item) => item.name.toLowerCase() === location.name.toLowerCase(),
      )
      if (exists) return false

      await persist([...favorites, location])
      return true
    },
    [favorites, persist],
  )

  const removeFavorite = useCallback(
    async (name: string) => {
      await persist(favorites.filter((item) => item.name !== name))
    },
    [favorites, persist],
  )

  return { favorites, ready, addFavorite, removeFavorite }
}
