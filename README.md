# SkyCast Course Project

SkyCast is a mobile weather app that helps you plan your day with live conditions at your current location, a multi-day forecast, and a personal list of favorite cities you can check anytime. You can switch between Celsius and Fahrenheit, save places you care about, pull to refresh on the home screen, and get haptic feedback when you interact with forecasts — useful when you travel, commute, or just want a quick read on the weather without opening a browser.

The app is organized as feature-based modlets under `src/`, with Expo Router handling navigation in `src/app/` and business logic kept in `src/features/` and `src/shared/`. A custom design system (`#design`) separates primitive tokens from reusable elements. Data is cached on-device with AsyncStorage (settings, favorites, last-known location). Weather data comes from the public Open-Meteo API; location, motion sensors, haptics, and notifications use Expo native modules. CI runs linting and tests on every push; EAS Build produces Android binaries on demand.

## Tech stack

- **React Native** 0.85 + **Expo SDK 56** (Expo Router, typed routes)
- **TypeScript**, ESLint, Prettier, Knip
- **Jest** + React Native Testing Library
- **AsyncStorage** — settings, favorites, cached coordinates
- **Open-Meteo** — current weather and forecast (no API key required)
- **expo-location**, **expo-sensors**, **expo-haptics**, **expo-notifications**
- **GitHub Actions** — verify on push; optional EAS Android build
- **EAS Build** — production/preview Android builds (`eas.json`)

---

## Onboarding

### Prerequisites

- **Node.js 24** — run `nvm use` (see `.nvmrc`)
- **Watchman** (recommended on macOS)
- **Expo Go** on a device, or a simulator/emulator

### Install

```bash
git clone <repo-url>
cd skycast-course-project
npm install
```

Install uses `.npmrc` with `legacy-peer-deps=true` to resolve Expo 56 peer dependencies. CI uses `npm ci --force` for the same reason.

### Environment variables

No `.env` file is required. Open-Meteo is called over HTTPS without authentication. Optional EAS builds need `EXPO_TOKEN` in GitHub Actions secrets (see CI/CD below).

### Commands

| Command           | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `npm run start`   | Start Expo dev server (clears Metro cache)         |
| `npm run lint`    | Typecheck, ESLint, Prettier, Knip                  |
| `npm run test`    | Jest in watch mode                                 |
| `npm run test:ci` | Jest with coverage (used in CI)                    |
| `npm run build`   | EAS Android build (`eas build --platform android`) |
| `npx expo-doctor` | Check dependency alignment                         |

### Run the app

```bash
npm run start
```

Press `w` for web, `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

### Project layout

```
src/
  app/           # Expo Router — thin route files only
  features/      # home, favorites, settings (screens + UI)
  shared/        # weather, favorites, settings, design system, device APIs
```

Import maps (`#features/*`, `#shared/*`, `#design/*`) expose module public APIs; avoid deep `../` imports across features.

---

## CI/CD

Workflow: [`.github/workflows/verify-and-build.yaml`](.github/workflows/verify-and-build.yaml)

| Trigger               | What runs                                                                |
| --------------------- | ------------------------------------------------------------------------ |
| **push**              | `lint-typecheck`, `lint-eslint`, `lint-prettier`, `lint-knip`, `test:ci` |
| **workflow_dispatch** | Above + `npm run build` (EAS Android)                                    |

To enable EAS builds from GitHub:

1. Run `npx eas init` locally and link the project.
2. Add `EXPO_TOKEN` to repository secrets.
3. Trigger **Verify and Build** manually from the Actions tab.

---

## Course concepts in this repo

| Concept         | Where                                                      |
| --------------- | ---------------------------------------------------------- |
| Design system   | `src/shared/design/foundations/`, `elements/`              |
| Persistence     | `src/shared/settings/`, `src/shared/favorites/`            |
| Device features | location, haptics, sensors, notifications in `src/shared/` |
| User input      | settings screens (`TextField`, `ToggleField`)              |
| **FlatList**    | favorites list + settings demo                             |
| **SectionList** | settings demo (`SectionListDemo`)                          |
| Testing         | `*.test.tsx` on shared components and weather              |
| Modlets         | `#features/*`, `#shared/*` barrel exports                  |
