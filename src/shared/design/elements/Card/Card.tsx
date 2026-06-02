import { type StyleProp, type ViewStyle, StyleSheet, View } from "react-native"

import { surface } from "../../foundations/colors"
import { main as cardShadow } from "../../foundations/shadows"
import { borderRadius } from "../../foundations/shapes"
import { between, inside } from "../../foundations/spacing"

export type CardProps = {
  style?: StyleProp<ViewStyle>
  children: React.ReactNode
}

const Card: React.FC<CardProps> = ({ style, children, ...props }) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
  container: {
    padding: inside,
    margin: between,
    alignItems: "center",
    justifyContent: "center",
    borderRadius,
    backgroundColor: surface,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    ...cardShadow,
  },
})
