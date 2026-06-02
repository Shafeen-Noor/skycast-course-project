import { Stack } from "expo-router"

import { FavoritesScreen } from "#features/favorites"

const App: React.FC = () => {
  return (
    <>
      <Stack.Screen options={{ title: "Favorites" }} />
      <FavoritesScreen />
    </>
  )
}

export default App
