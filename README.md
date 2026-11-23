# AniTracker

AniTracker is a mobile app for tracking anime series and anime movies. Users can browse a fixed catalogue of titles, add titles to their lists (Watching, Plan to Watch, Completed, On Hold, Dropped), update their episode progress, and see a summary of their activity.

The app is built with React Native, Expo and Expo Router. It uses mock data and local storage; there is no backend.

> Course: Project 1 (individual). Due November 24, 2026.

## Development progress

| Milestone | Status |
|---|---|
| Project setup, template removed, Zod and AsyncStorage installed | Done |
| Navigation skeleton (welcome, login, 4 tabs, details, entry form) | In progress: route files created, screens not written yet |
| Catalogue mock data and reusable components | Not started |
| Mock login with Zod validation | Not started |
| Add / edit / remove list entries | Not started |
| My Lists screen | Not started |
| Discover search and filters | Not started |
| Home dashboard | Not started |
| AsyncStorage persistence | Not started |
| Profile settings and logout | Not started |

## Features

### Completed
- None yet.

### Partially implemented
- Route structure for all screens (files exist, content pending).

### Planned
- Welcome screen and mock login with Zod validation.
- Bottom tab navigation: Home, Discover, My Lists, Profile.
- Home dashboard: greeting, Continue Watching, statistics, watchlist preview.
- Discover: search bar, filters (genre, series, movies), Trending and Popular rows.
- Anime details screen.
- Add a title to a list, edit its status, progress, score and notes, and remove it with confirmation.
- My Lists grouped by status, with counts, progress and empty states.
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
- Several Profile settings (language, notifications) show a message but do not change app behaviour.
- The app is still in development; see the progress table above.

## AI usage statement

I used Claude (Anthropic) to plan milestones, explain concepts and error messages, guide my Git workflow, and draft and update this README. All application code was written by me.

## Submission

- Final commit: _[fill in on submission]_
- Screenshots: `screenshots/` _(to be added)_
- Screen-flow diagram: see above
