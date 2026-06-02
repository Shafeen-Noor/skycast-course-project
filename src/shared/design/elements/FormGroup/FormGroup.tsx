import { StyleSheet, View } from "react-native"

import Typography from "#design/elements/Typegraphy"

export type FormGroupProps = {
  label: string
  hint?: string
  children: React.ReactNode
}

const FormGroup: React.FC<FormGroupProps> = ({ label, hint, children }) => {
  return (
    <View style={styles.group}>
      <View style={styles.labelColumn}>
        <Typography style={styles.label}>{label}</Typography>
        {hint ? (
          <Typography variant="muted" style={styles.hint}>
            {hint}
          </Typography>
        ) : null}
      </View>
      <View style={styles.value}>{children}</View>
    </View>
  )
}

export default FormGroup

const styles = StyleSheet.create({
  group: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 10,
    paddingHorizontal: 12,
    width: "100%",
    maxWidth: 480,
  },
  labelColumn: {
    flex: 1,
  },
  label: {
    fontWeight: "600",
  },
  hint: {
    marginTop: 4,
    fontSize: 12,
  },
  value: {
    flex: 1,
  },
})
