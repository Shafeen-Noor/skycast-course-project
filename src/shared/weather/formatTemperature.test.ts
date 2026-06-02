import { formatTemperature } from "./formatTemperature"

describe("Weather > formatTemperature", () => {
  it("formats celsius", () => {
    expect(formatTemperature(20, "celsius")).toBe("20.0 C")
  })

  it("formats fahrenheit", () => {
    expect(formatTemperature(0, "fahrenheit")).toBe("32.0 F")
  })
})
