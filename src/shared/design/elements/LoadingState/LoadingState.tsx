import { ActivityIndicator, StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

import { brand } from "../../foundations/colors"

export const LoadingState: React.FC<{ label?: string }> = ({
  label = "Loading weather…",
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={brand} size="large" />
      <Typography variant="muted" style={styles.label}>
        {label}
      </Typography>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  label: {
    marginTop: 12,
  },
})
