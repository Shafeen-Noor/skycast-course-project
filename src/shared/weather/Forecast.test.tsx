import { render } from "@testing-library/react-native"

import { Forecast } from "./Forecast"
import { fetchForecast } from "./weatherApi"

jest.mock("./weatherApi", () => ({
  fetchForecast: jest.fn(),
}))

const mockFetchForecast = fetchForecast as jest.MockedFunction<
  typeof fetchForecast
>

describe("Weather > Forecast", () => {
  it("works", async () => {
    mockFetchForecast.mockResolvedValue([
      {
        day: "2026-06-02",
        temperatureMax: 22.5,
        temperatureMin: 14.1,
        condition: "Clear",
      },
    ])

    const { findAllByText } = render(
      <Forecast
        location={{
          name: "Barcelona",
          latitude: 41.385063,
          longitude: 2.173404,
        }}
      />,
    )

    const temperatures = await findAllByText(/[0-9]\.[0-9] C$/)
    expect(temperatures.length).toBeGreaterThan(0)
  })
})
