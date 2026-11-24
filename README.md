# AniTracker

AniTracker is a mobile app for tracking anime series and anime movies. Users can browse a fixed catalogue of titles, add titles to their lists (Watching, Plan to Watch, Completed, On Hold, Dropped), update their episode progress, and see a summary of their activity.

The app is built with React Native, Expo and Expo Router. It uses mock data and local storage; there is no backend.

> Course: Project 1 (individual). Due November 24, 2026.

## Development progress

| Milestone | Status |
|---|---|
| Project setup, template removed, Zod and AsyncStorage installed | Done |
| Navigation skeleton (welcome, login, 4 tabs, details, entry form) | Done |
| Catalogue mock data and reusable components | Done |
| Mock login with Zod validation | Done |
| Add / edit / remove list entries | Done |
| My Lists screen | Done |
| Discover search and filters | Done |
| Home dashboard | Not started |
| AsyncStorage persistence | Done |
| Profile settings and logout | Done |

## Features

### Completed
- Navigation between all screens: Welcome → Login → bottom tabs (Home, Discover, My Lists, Profile, with icons and a highlighted active tab) → Anime details. Login and logout use `replace`, so Back does not return to the previous session.

- Dark theme constants (colors, spacing, font sizes) used across screens.
- Reusable `AnimeCard` component that receives an anime and an `onPress` callback through props.
- Discover lists the catalogue with `AnimeCard`; tapping a card opens the Anime details screen, which shows the title's cover, type, genres, episodes, year, rating and synopsis, or "Anime not found" for an unknown id.
- Welcome screen and mock login. A Zod schema checks the email format and a password of at least 6 characters. Errors appear under each field, and wrong credentials show "Incorrect email or password". A successful login replaces the login screen with the tabs.
- Reusable `TextField` and `PrimaryButton` components.
- List entries kept in shared state (`EntriesContext`) with `addEntry`, `updateEntry` and `removeEntry`, starting from 4 mock entries.
- From Anime details, the user can add the title to their list or edit their entry (status, episodes watched, optional score and notes) with the entry form, which is validated with Zod. Episodes cannot exceed the title's total. Saving shows a confirmation and returns to details.
- Remove from List asks for confirmation (Cancel / Remove) before deleting the entry.
- Reusable `StatusChip` and `EntryList` components.
- List entries are saved with AsyncStorage (key `anitracker:entries`) and restored when the app starts. On the very first launch the 4 mock entries are used. After that the saved list is always used, including when it is empty. A loading indicator shows while entries load, and an error message shows if loading or saving fails. If loading fails, the app does not save, so stored data is never overwritten.
- Discover: a search bar that matches titles regardless of capitals, and a Filters button (showing how many filters are active) that opens chips for type (All / Series / Movies) and genre. Tapping the selected genre again clears it. Search and filters combine. Horizontal Trending and Popular rows appear when no search or filter is active. A no-results message names the search text.
- Profile: avatar with the user's initial, name and email; statistics for completed titles, movies watched and total episodes; settings rows (Theme, Language, Notifications, About) built with a reusable `SettingsRow` component, each giving a dialog or confirmation when pressed; and Log out with a confirmation, which returns to Login.
- My Lists: filter chips for All and each status, each showing its count; a summary of titles and episodes watched; a different empty message for each status; and a "+1 ep" button on Watching entries that stops at the total episode count.

### Partially implemented
- The catalogue has 10 titles (5 series, 5 movies), some marked as trending or popular. Covers are placeholders, not images.
- Home shows only a Continue Watching list.

### Planned
- Home dashboard: greeting, statistics, watchlist preview.
- Profile with statistics and settings; every option gives visible feedback.
- List entries saved with AsyncStorage so they remain after restarting the app.

## Screens and navigation

| Screen | Route | Purpose |
|---|---|---|
| Welcome | `/` | Entry screen with a button to log in |
| Login | `/login` | Mock login with validation |
| Home | `/(tabs)/home` | Dashboard |
| Discover | `/(tabs)/discover` | Search and browse the catalogue |
| My Lists | `/(tabs)/lists` | The user's tracked titles by status |
| Profile | `/(tabs)/profile` | User info, settings, logout |
| Anime details | `/anime/[id]` | Information about one title |
| Entry form | `/entry/[id]` | Add or edit a list entry |

Home, Discover, My Lists and Profile are reached from the bottom tab bar. Logging in replaces the login screen, so the back button does not return to it. Logging out returns to Login.

```text
   ┌──────────┐      ┌──────────┐
   │ Welcome  │ ───▶ │  Login   │
   └──────────┘      └────┬─────┘
                          │ (replace)
                          ▼
   ┌────────────── Bottom tabs ───────────────┐
   │  Home    Discover    My Lists    Profile │
   └────┬────────┬───────────┬───────────┬────┘
        │        │           │           │ Logout
        └────────┴─────┬─────┘           ▼
                       ▼               Login
                ┌──────────────┐
                │ Anime details│
                └──────┬───────┘
                       ▼
                ┌──────────────┐
                │  Entry form  │  (add / edit)
                └──────────────┘
```

## Technology stack

- TypeScript
- React 19.3 and React Native 0.88
- Expo SDK 58
- Expo Router (file-based navigation)
- Zod 4 (form validation)
- @react-native-async-storage/async-storage 2.2 (local persistence)

## Installation and setup

1. Clone the repository:
   ```bash
   git clone https://github.com/razmigmazakian/anitracker.git
   cd anitracker
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the app:
   ```bash
   npx expo start
   ```
4. Scan the QR code with Expo Go on your phone.

No environment variables are needed.

Tested with: Expo Go on _[fill in: Android / iOS and device]_.

## Mock login credentials

| Email | Password |
|---|---|
| `demo@anitracker.app` | `anime123` |

Authentication is mock only. The credentials are compared against values stored in the app; nothing connects to a real authentication service.

## Known limitations

- No backend: the catalogue is fixed mock data and cannot be changed by the user.
- Login is mock only and does not create accounts.
- Profile settings are placeholders: Theme only offers dark mode (light shows "coming soon"), the chosen language is shown but does not translate the app and is not saved after a restart, and Notifications shows a "not available" message.
- The login session is not remembered: the user logs in again each time the app opens. List entries are still saved.
- Cover images are placeholders showing the title.
- The app is still in development; see the progress table above.

## AI usage statement

I used Claude (Anthropic) to plan milestones, explain concepts and error messages, guide my Git workflow, and draft and update this README. All application code was written by me.

## Submission

- Final commit: _[fill in on submission]_
- Screenshots: `screenshots/` _(to be added)_
- Screen-flow diagram: see above
