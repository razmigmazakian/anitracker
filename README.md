# AniTracker

AniTracker is a mobile app for tracking anime series and anime movies. Users browse a fixed catalogue of titles, add titles to their lists (Watching, Planned, Completed, On Hold, Dropped), update their episode progress and score, and see a summary of their activity.

The app is built with React Native, Expo and Expo Router. It uses mock data and local storage (AsyncStorage); there is no backend.

> Course: Project 1 (individual). Due November 24, 2026.

## Development progress

| Milestone | Status |
|---|---|
| Project setup, template removed, Zod and AsyncStorage installed | Done |
| Navigation (welcome, login, 4 tabs, details, entry form) | Done |
| Catalogue mock data and reusable components | Done |
| Mock login with Zod validation | Done |
| Add / edit / remove list entries | Done |
| AsyncStorage persistence | Done |
| My Lists screen | Done |
| Discover search and filters | Done |
| Profile settings and logout | Done |
| Home dashboard | Done |

## Features

### Welcome and Login
- Welcome screen with the app name, tagline, three feature highlights and a Get Started button.
- Mock login validated with Zod: the email must be a valid address and the password at least 6 characters. Errors appear under each field, and wrong credentials show "Incorrect email or password".
- Show / hide password button, and a hint showing the demo account.
- A successful login replaces the login screen with the tabs, so Back does not return to it.

### Home
- Personal greeting and a Continue Watching list of titles marked Watching, each with a cover, status badge, progress bar and a "+ Ep" button.
- When nothing is being watched, an empty state with a "Find something to watch" button that opens Discover.

### Discover
- Search bar that matches titles regardless of capitals, with a clear button.
- Filters button (with a badge showing how many filters are active) that opens chips for type (All / Series / Movies) and genre. Tapping the selected genre again clears it. Search and filters combine, and a Reset filters button clears them.
- Horizontal Trending and Popular rows when no search or filter is active, then all titles in a two-column grid. While searching or filtering, a result count is shown.
- A no-results message that names the search text, with a button to clear the search and filters.

### Anime details
- Cover, title, type, rating, year, episode count, genre tags and synopsis.
- When the title is in the user's list: its status badge, a progress bar, episodes watched, the user's score and notes.
- "Add to My List" when the title is not tracked. Otherwise "Edit Entry" and "Remove from List", which asks for confirmation (Cancel / Remove).
- For an unknown id, a "couldn't find that anime" message with a button back to Discover.

### Entry form (add / edit)
- Status chips, episodes watched (typed or with − / + buttons), optional score (1–10) and optional notes (max 200 characters, with a character counter), validated with Zod.
- Episodes cannot exceed the title's total. Choosing Completed fills in the full episode count.
- Saving shows a confirmation and returns to the previous screen.

### My Lists
- Summary of titles and episodes watched.
- Scrollable filter chips for All and each status, each showing its count.
- Each entry shows its cover, status badge and progress bar. Watching entries have a "+ Ep" button that stops at the total episode count.
- A different empty message for each status, with a Browse Discover button when the whole list is empty.

### Profile
- Avatar with the user's initial, name and email.
- Statistics: completed titles, movies watched, total episodes.
- Settings rows with icons (Theme, Notifications, About), each giving a dialog or confirmation when pressed.
- Log out with a confirmation, which returns to Login.

### State and storage
- List entries are kept in shared state (`EntriesContext`) and changed through `addEntry`, `updateEntry` and `removeEntry`, so every screen shows the same data.
- Entries are saved with AsyncStorage (key `anitracker:entries`) whenever they change and restored when the app starts. On the very first launch, 4 mock entries are used. After that the saved list is always used, including when it is empty.
- A loading indicator shows while entries load, and an error message shows if loading or saving fails. If loading fails, the app does not save, so stored data is never overwritten.

### Reusable components
`AnimeCard`, `CoverArt`, `EmptyState`, `EntryList`, `PrimaryButton` (primary / secondary / danger variants), `ProgressBar`, `SettingsRow`, `StatusBadge`, `StatusChip`, `TextField`. Each receives its data and callbacks through props. Colors, spacing, corner radius and font sizes come from shared theme constants, and each list status has its own color.

## Screens and navigation

| Screen | Route | Purpose |
|---|---|---|
| Welcome | `/` | Entry screen with a button to log in |
| Login | `/login` | Mock login with validation |
| Home | `/(tabs)/home` | Greeting and Continue Watching |
| Discover | `/(tabs)/discover` | Search, filter and browse the catalogue |
| My Lists | `/(tabs)/lists` | The user's tracked titles by status |
| Profile | `/(tabs)/profile` | User info, statistics, settings, logout |
| Anime details | `/anime/[id]` | Information about one title, add / edit / remove |
| Entry form | `/entry/[id]` | Add or edit a list entry |

Home, Discover, My Lists and Profile are reached from the bottom tab bar, which highlights the selected tab. Logging in and logging out use `router.replace`, so Back does not cross between the logged-in and logged-out parts of the app.

![AniTracker screen flow](screenshots/flow-diagram.png)

```text
   ┌──────────┐      ┌──────────┐
   │ Welcome  │ ───▶ │  Login   │
   └──────────┘      └────┬─────┘
                          │ (replace)
                          ▼
   ┌────────────── Bottom tabs ───────────────┐
   │  Home    Discover    My Lists    Profile │
   └────┬────────┬───────────┬───────────┬────┘
        │        │           │           │ Logout (replace)
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

## Project structure

```text
src/
  app/          Expo Router routes only (screens and layouts)
  components/   Reusable UI components
  constants/    Theme, list status labels, mock user
  context/      EntriesContext: shared list state and AsyncStorage
  data/         Catalogue and starter entries (mock data)
  schemas/      Zod schemas for login and entry forms
  types/        TypeScript types
```

## Technology stack

- TypeScript
- React 19.3 and React Native 0.88
- Expo SDK 58
- Expo Router (file-based navigation)
- Zod 4 (form validation)
- @react-native-async-storage/async-storage 2.2 (local persistence)
- @expo/vector-icons (tab icons)
- ESLint with eslint-config-expo

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

Tested with: Expo Go on iOS (iPhone 17).

## Mock login credentials

| Email | Password |
|---|---|
| `demo@anitracker.app` | `anime123` |

Authentication is mock only. The credentials are compared against values stored in the app; nothing connects to a real authentication service.

## Known limitations

- No backend: the catalogue is fixed mock data with 10 titles (5 series, 5 movies) and cannot be changed by the user.
- Login is mock only and does not create accounts. The login session is not remembered, so the user logs in again each time the app opens. List entries are still saved.
- Profile settings are placeholders: Theme only offers dark mode (light shows "coming soon"), and Notifications shows a "not available" message.
- Cover images are placeholders: a colored tile with the title's initials.
- Tested on iOS only. Dialogs use the native `Alert`, so on the web version the Profile settings do not respond.

## Screenshots

| Welcome | Login | Home |
|---|---|---|
| ![Welcome](screenshots/welcome.png) | ![Login](screenshots/login.png) | ![Home](screenshots/home.png) |

| Discover | Anime details | Entry form |
|---|---|---|
| ![Discover](screenshots/discover.png) | ![Details](screenshots/details.png) | ![Entry form](screenshots/entry-form.png) |

| My Lists | Profile |
|---|---|
| ![My Lists](screenshots/lists.png) | ![Profile](screenshots/profile.png) |

## AI usage statement

I designed and built AniTracker's features myself: navigation, mock login with Zod validation, the shared list state with add, edit and remove, AsyncStorage persistence, search and filters, and the screens and components that use them.

I used AI tools in these ways:

- **Claude (Anthropic)**: planning milestones, explaining concepts and error messages, reviewing my code for problems, guiding my Git workflow, and drafting and updating this README.
- **UI UX Pro Max** ([nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill)), an open-source AI design skill for coding assistants: helping with the final visual redesign (colors, spacing, layout, icons and accessibility labels) and the presentational components `CoverArt`, `EmptyState`, `ProgressBar` and `StatusBadge`. I reviewed these changes, tested them on my iPhone, and understand how they work.

## Submission

- Final commit: tagged `v1.0-submission`
- Screen-flow diagram: `screenshots/flow-diagram.png` (also `flow-diagram.svg`), shown under [Screens and navigation](#screens-and-navigation)
