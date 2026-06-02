# SkyCast Course Project

Your submission build — related to the class **example-react-native-skycast** repo but **not a copy**.

## How this repo differs from the example

| Area          | Class example             | This course project                              |
| ------------- | ------------------------- | ------------------------------------------------ |
| Weather data  | Fetch inside components   | **`weatherApi.ts`** service layer                |
| Favorites     | Read-only list            | **Add / remove** cities with coordinates         |
| Settings      | Home name + notifications | Also **°C / °F** unit preference                 |
| Home          | Static layout             | **Refresh**, loading & error states              |
| Design        | Default blue palette      | **Sky/teal** tokens + `LoadingState`             |
| Structure     | Screens in `app/` only    | **`features/home`** and **`features/favorites`** |
| Tests         | Live API in weather tests | **Mocked** `weatherApi` in component tests       |
| Motion screen | `console.log` only        | **On-screen** motion sample                      |

## Stack

Expo Router, TypeScript, design system (`#design`), shared modules (`#shared`), feature modules (`#features`).

```bash
npm start
npm run lint
npm run test:ci
```

## Possible features

- City search, compare view, historic data, widgets
