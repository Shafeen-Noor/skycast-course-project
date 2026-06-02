import * as Haptics from "expo-haptics"
import { Platform } from "react-native"

/** Course project: light tap feedback on weather refresh and card press. */
export function hapticImpact(): void {
  if (Platform.OS === "ios") {
    void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    return
  }

  void Haptics.performAndroidHapticsAsync(Haptics.AndroidHaptics.Keyboard_Tap)
}
