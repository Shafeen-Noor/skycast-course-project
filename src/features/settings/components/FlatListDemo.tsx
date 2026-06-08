import { useCallback, useEffect, useState } from "react"
import { FlatList, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

type Item = {
  id: string
  label: string
}

export const FlatListDemo: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [items, setItems] = useState<Item[]>([])

  const refresh = useCallback(async () => {
    setLoading(true)
    await delay(1000)
    setItems(Array.from({ length: 20 }).map((_, index) => makeItem(index)))
    setLoading(false)
  }, [])

  const more = useCallback(async () => {
    setLoading(true)
    await delay(1000)
    setItems((current) =>
      current.concat(
        Array.from({ length: 20 }).map((_, index) =>
          makeItem(current.length + index),
        ),
      ),
    )
    setLoading(false)
  }, [])

  useEffect(() => {
    void refresh()
  }, [refresh])

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={items}
        refreshing={loading}
        onRefresh={refresh}
        onEndReached={more}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Typography variant="title">{item.label}</Typography>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    width: "100%",
  },
  row: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
})

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

function makeItem(index: number): Item {
  return {
    id: `id-${index}`,
    label: `Item ${index + 1}: ${Math.random().toString(16).slice(2, 8)}`,
  }
}
