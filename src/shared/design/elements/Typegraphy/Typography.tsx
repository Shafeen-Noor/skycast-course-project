import { type LinkProps, Link } from "expo-router"
import { type StyleProp, type TextStyle, StyleSheet, Text } from "react-native"

import * as typographyTokens from "../../foundations/typography"

export type TypographyProps = {
  variant?: keyof typeof typographyTokens
  style?: StyleProp<TextStyle>
  children: React.ReactNode
} & (
  | { href?: never }
  | Pick<LinkProps, "href" | "replace" | "push" | "dismissTo">
)

const Typography: React.FC<TypographyProps> = ({
  variant = "normal",
  style,
  children,
  ...props
}) => {
  if ("href" in props && props.href) {
    return (
      <Link {...props} style={[styles[variant], style]}>
        {children}
      </Link>
    )
  }

  return (
    <Text {...props} style={[styles[variant], style]}>
      {children}
    </Text>
  )
}

export default Typography

const styles = StyleSheet.create({
  normal: typographyTokens.normal,
  large: typographyTokens.large,
  muted: typographyTokens.muted,
  label: typographyTokens.label,
  title: typographyTokens.title,
})
