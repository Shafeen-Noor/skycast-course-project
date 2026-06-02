import { type TemperatureUnit } from "#shared/settings"

export function formatTemperature(
  celsius: number,
  units: TemperatureUnit,
): string {
  if (units === "fahrenheit") {
    return `${((celsius * 9) / 5 + 32).toFixed(1)} F`
  }

  return `${celsius.toFixed(1)} C`
}
