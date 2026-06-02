import { render } from "@testing-library/react-native"

import Typography from "#design/elements/Typegraphy"

import Card from "./Card"

describe("Design > Elements > Card integration", () => {
  it("renders typography inside the card", () => {
    const { getByText } = render(
      <Card>
        <Typography variant="title">SkyCast</Typography>
      </Card>,
    )

    expect(getByText("SkyCast")).toBeTruthy()
  })
})
