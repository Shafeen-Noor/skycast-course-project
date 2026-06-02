import { useState } from "react"
import { Pressable, StyleSheet, View } from "react-native"

import TextField from "#design/elements/fields/Text"
import FormGroup from "#design/elements/FormGroup"
import Typography from "#design/elements/Typegraphy"
import { useFavoritesManager } from "#shared/favorites"

export const FavoritesScreen: React.FC = () => {
  const { favorites, ready, addFavorite, removeFavorite } =
    useFavoritesManager()
  const [name, setName] = useState("")
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [message, setMessage] = useState("")

  const handleAdd = async () => {
    const lat = Number.parseFloat(latitude)
    const lng = Number.parseFloat(longitude)
    if (!name.trim() || !Number.isFinite(lat) || !Number.isFinite(lng)) {
      setMessage("Enter a name and valid coordinates.")
      return
    }

    const added = await addFavorite({
      name: name.trim(),
      latitude: lat,
      longitude: lng,
    })

    if (added) {
      setName("")
      setLatitude("")
      setLongitude("")
      setMessage(`${name.trim()} saved.`)
    } else {
      setMessage("That city is already in your list.")
    }
  }

  if (!ready) {
    return (
      <View style={styles.container}>
        <Typography variant="muted">Loading favorites…</Typography>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Typography variant="title">Saved cities</Typography>
      <Typography variant="muted" style={styles.subtitle}>
        add and remove cities.
      </Typography>

      <FormGroup label="City" hint="Display name">
        <TextField onChange={setName} value={name} placeholder="Tokyo" />
      </FormGroup>
      <FormGroup label="Latitude">
        <TextField
          onChange={setLatitude}
          value={latitude}
          keyboardType="decimal-pad"
          placeholder="35.6762"
        />
      </FormGroup>
      <FormGroup label="Longitude">
        <TextField
          onChange={setLongitude}
          value={longitude}
          keyboardType="decimal-pad"
          placeholder="139.6503"
        />
      </FormGroup>

      <Pressable style={styles.addButton} onPress={() => void handleAdd()}>
        <Typography variant="label">Add favorite</Typography>
      </Pressable>

      {message ? (
        <Typography variant="muted" style={styles.message}>
          {message}
        </Typography>
      ) : null}

      <View style={styles.list}>
        {favorites.map((favorite) => (
          <View key={favorite.name} style={styles.row}>
            <Typography href={`/favorites/${favorite.name}`}>
              {favorite.name}
            </Typography>
            <Pressable
              onPress={() => {
                void removeFavorite(favorite.name)
              }}
            >
              <Typography variant="muted">Remove</Typography>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff",
    padding: 16,
    alignItems: "stretch",
  },
  subtitle: {
    marginBottom: 16,
    textAlign: "center",
  },
  addButton: {
    alignSelf: "center",
    marginVertical: 12,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: "#cffafe",
  },
  message: {
    textAlign: "center",
    marginBottom: 12,
  },
  list: {
    marginTop: 16,
    gap: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
})
