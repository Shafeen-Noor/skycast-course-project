import { render } from "@testing-library/react-native"

import { CurrentWeather } from "./CurrentWeather"
import { fetchCurrentWeather } from "./weatherApi"

jest.mock("./weatherApi", () => ({
  fetchCurrentWeather: jest.fn(),
}))

const mockFetchCurrentWeather = fetchCurrentWeather as jest.MockedFunction<
  typeof fetchCurrentWeather
>

describe("Weather > CurrentWeather", () => {
  it("works", async () => {
    mockFetchCurrentWeather.mockResolvedValue({
      condition: "Clear",
      temperature: 20.9,
      wind: 4,
      humidity: 72,
      uv: 0,
    })

    const { findByText } = render(
      <CurrentWeather
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    expect(await findByText("Barcelona")).toBeTruthy()
    expect(await findByText("20.9 C")).toBeTruthy()
  })
})
