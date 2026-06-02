import { render } from "@testing-library/react-native"

import { LoadingState } from "./LoadingState"

describe("Design > Elements > LoadingState", () => {
  it("renders the loading label", () => {
    const { getByText } = render(<LoadingState label="Fetching data" />)
    expect(getByText("Fetching data")).toBeTruthy()
  })
})
