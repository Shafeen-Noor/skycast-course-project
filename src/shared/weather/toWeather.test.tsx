import toWeather from "./toWeather"

describe("Weather > toWeather", () => {
  it("works with 0", () => {
    expect(toWeather(0)).toEqual("Clear")
  })

  it("falls back for unmapped codes", () => {
    expect(toWeather(-1)).toEqual("Unknown")
  })
})
