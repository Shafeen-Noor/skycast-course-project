import { useCallback, useEffect, useState } from "react"
import { SectionList, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

type Section = {
  id: string
  label: string
  data: Item[]
}

type Item = {
  id: string
  label: string
}

export const SectionListDemo: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [sections, setSections] = useState<Section[]>([])

  const refresh = useCallback(async () => {
    setLoading(true)
    await delay(1000)
    setSections(Array.from({ length: 5 }).map((_, index) => makeSection(index)))
    setLoading(false)
  }, [])

  const more = useCallback(async () => {
    setLoading(true)
    await delay(1000)
    setSections((current) =>
      current.concat(
        Array.from({ length: 5 }).map((_, index) =>
          makeSection(current.length + index),
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
      <SectionList
        stickySectionHeadersEnabled
        style={styles.list}
        sections={sections}
        refreshing={loading}
        onRefresh={refresh}
        onEndReached={more}
        onEndReachedThreshold={0.5}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Typography variant="large">{item.label}</Typography>
          </View>
        )}
        renderSectionHeader={({ section }) => (
          <View style={styles.sectionHeader}>
            <Typography variant="title">{section.label}</Typography>
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
  sectionHeader: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  itemRow: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
})

async function delay(ms: number) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

function makeSection(index: number): Section {
  return {
    id: `id-${index}`,
    label: `Section ${index + 1}: ${Math.random().toString(16).slice(2, 8)}`,
    data: Array.from({ length: 5 }).map((_, itemIndex) => makeItem(itemIndex)),
  }
}

function makeItem(index: number): Item {
  return {
    id: `id-${index}`,
    label: `Item ${index + 1}: ${Math.random().toString(16).slice(2, 8)}`,
  }
}
