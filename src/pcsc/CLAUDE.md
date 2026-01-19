# PCSC One Migration

This document describes the migration of PCSC One personal rating data from the
standalone Next.js application to the Octahedron World platform.

## Project Scope

**PCSC One** - Personal ratings and results system

- My own ratings for music tracks
- Historical contest results
- Personal statistics and aggregations

**Note:** PCSC - a community rating contest platform - will be migrated
separately at a later time.

## Source Project

**Location:** `../pcsc` (parallel repository)

**Tech Stack:**

- TypeScript
- Next.js
- Tailwind CSS

## Data Source

**Database:** Firebase (Firestore)

**Authentication:** Access keys stored in `.env` file

**Important:** Ensure `.env` contains the necessary Firebase configuration:

- API keys
- Project ID
- Database URL
- Auth domain

## Data Structure

The data model is defined in the source project at
[/Users/matthias.reis/code/pcsc/model/track.tsx](../../pcsc/model/track.tsx).

**Key Types:**

- Track data (song information, ratings, metadata)
- Contest information
- Rating history
- User preferences

**Data Model Principle:** Data is structured as **JavaScript classes** that
implement:

- **Accessors**: Read and retrieve raw data from Firebase
- **Setters**: Update and write data back to Firebase
- **Aggregators**: Compute derived data, statistics, and summaries

This class-based approach provides:

- Type safety through TypeScript
- Encapsulation of data logic
- Reusable data operations
- Clear separation between raw data and computed values
- No logic or data formatting within UI components (e.g. an average rating is a
  float, but we ALWAYS want to display it with 1 decimal. Thus the formatted
  string comes from the model)

## Local File Structure

The migrated code follows this organization:

```
src/pcsc/
├── CLAUDE.md              # This documentation file
├── model/                 # Data models and Firebase helpers
│   ├── track.ts          # Track model class (migrated from source)
│   ├── contest.ts        # Contest model class
│   └── firebase.ts       # Firebase connection and utilities
└── components/           # Shared PCSC One components
    ├── track-card.tsx    # Display individual track
    ├── rating-display.tsx # Show rating information
    └── stats-panel.tsx   # Statistics visualization

src/routes/pcsc-one/      # SolidStart routes for PCSC One
├── index.tsx             # Main landing page
├── ratings/              # Rating views
├── results/              # Contest results
└── stats/                # Personal statistics
```

### Directory Purpose

- **`/src/pcsc/model/`**: Data access layer, Firebase integration, and model
  classes
- **`/src/pcsc/components/`**: Reusable UI components shared across PCSC One
  features
- **`/src/routes/pcsc-one/`**: Page-level components following SolidStart
  file-based routing

## Migration Strategy

1. **Data Models**: Port TypeScript classes from source `model/track.tsx` to
   `src/pcsc/model/`
2. **Firebase Setup**: Configure Firebase connection in
   `src/pcsc/model/firebase.ts`
3. **Components**: Adapt React components to SolidJS syntax in
   `src/pcsc/components/`
4. **Routes**: Create new SolidStart routes under `src/routes/pcsc-one/`
5. **Styling**: Keep Tailwind CSS classes, adapt for Octahedron World theme

## Development Notes

- Use SolidJS patterns (createSignal, createEffect) instead of React hooks
- Maintain the model-based data architecture from the source project
- Keep Firebase queries server-side where possible using SolidStart's `query`
  function
- Ensure proper type safety throughout migration

---

# Backend Architecture

## Overview

The PCSC One application follows a **four-layer architecture** with clear separation between UI, frontend queries, API routes, and server-side caching.

## Architecture Principles

### 1. Four-Layer Architecture
- **UI Layer (Components/Pages)**: Works with `CompactTrack` objects, handles display logic
- **Frontend Layer (`server/tracks.ts`)**: Query functions using SolidJS `query()` for caching/deduplication
- **API Layer (`routes/pcsc-api/`)**: HTTP endpoints that process requests and return JSON
- **Cache Layer (`server/track-cache.ts`)**: In-memory cache of all tracks loaded from Firebase

### 2. Server-Side Processing
- **All heavy operations** (sorting, filtering, searching) occur on the server via API routes
- Cache layer maintains the full dataset in memory (loaded once from Firebase)
- API endpoints return only the necessary subset of data
- Client never receives or processes the full dataset

### 3. Data Transfer
- API routes return `CompactTrack[]` as JSON
- Frontend queries use SolidJS `query()` for automatic caching and request deduplication
- UI components work directly with `CompactTrack` objects

### 4. Clear Separation of Concerns
- **UI Components**: Display logic, user interaction, UI state
- **Frontend Queries**: Data fetching with caching via `query()`, uses `fetchLocal()` helper
- **API Routes**: HTTP handlers that call cache layer methods
- **Cache Layer**: TrackMapModel instance with search/filter/sort capabilities

## File Structure

```
src/pcsc/
├── server/
│   ├── tracks.ts          # Frontend queries using query() - fetchLeaderboard, fetchByQuery
│   ├── fetch.ts           # fetchLocal() helper for API calls
│   ├── track-cache.ts     # In-memory cache with TrackMapModel
│   ├── track-db.ts        # Low-level Firebase CRUD operations
│   └── firebase.ts        # Firebase admin initialization
├── model/
│   ├── track.tsx          # TrackModel class + CompactTrack/Track types
│   ├── track-map.tsx      # TrackMapModel (search/filter utilities)
│   └── slugify.ts         # Text normalization for search
└── components/            # UI components

src/routes/pcsc-api/
├── tracks/
│   ├── leaderboard/
│   │   └── index.ts       # GET /pcsc-api/tracks/leaderboard
│   └── search/
│       └── [query].ts     # GET /pcsc-api/tracks/search/:query
```

## Architecture Layers

### UI Layer (Components/Pages)

UI components import query functions from `~/pcsc/server/tracks` and use them with `createResource`.

**Rules**:
- Import `fetchLeaderboard`, `fetchByQuery` from `~/pcsc/server/tracks`
- Work with `CompactTrack[]` arrays returned by queries
- Use `createResource` for reactive data fetching

**Example**:
```typescript
import { fetchLeaderboard, fetchByQuery } from '~/pcsc/server/tracks';

const [tracks] = createResource(searchTerm, async (query) => {
  return query.length === 0
    ? await fetchLeaderboard()
    : await fetchByQuery(query);
});
```

### Frontend Layer (`src/pcsc/server/tracks.ts`)

Query functions wrapped with SolidJS `query()` for automatic caching and deduplication.

**Naming Convention**: `fetch*` functions (e.g., `fetchLeaderboard`, `fetchByQuery`)

**`fetchLeaderboard(): Promise<CompactTrack[]>`**
- Wrapped with `query()` for caching
- Calls `/pcsc-api/tracks/leaderboard` via `fetchLocal()`
- Returns top 100 tracks sorted by rating

**`fetchByQuery(searchQuery: string): Promise<CompactTrack[]>`**
- Wrapped with `query()` for caching
- Calls `/pcsc-api/tracks/search/:query` via `fetchLocal()`
- Returns matching tracks sorted by rating

### Fetch Helper (`src/pcsc/server/fetch.ts`)

**`fetchLocal(url: string)`**
- Handles both server-side and client-side fetching
- Uses `VITE_SERVER_URL` env var for server-side requests
- Returns parsed JSON response

### API Layer (`src/routes/pcsc-api/`)

HTTP API routes that call cache layer methods and return JSON.

**`GET /pcsc-api/tracks/leaderboard`**
- Calls `getAllTracks()` from cache
- Returns `tracks.getTop(100)` as JSON

**`GET /pcsc-api/tracks/search/:query`**
- Calls `getAllTracks()` from cache
- Returns `tracks.find(params.query)` as JSON

### Cache Layer (`src/pcsc/server/track-cache.ts`)

In-memory cache that loads all tracks from Firebase once and provides a `TrackMapModel` instance.

**`fillTracksCache(): Promise<TrackMapModel>`**
- Fetches all tracks from Firebase via `fbReadAllTracks()`
- Creates `TrackModel` instances for each track
- Returns a `TrackMapModel` with search/filter capabilities
- Called once on server startup

**`getAllTracks(): Promise<TrackMapModel>`**
- Returns the cached `TrackMapModel` instance
- No re-fetching from Firebase after initial load

### Database Layer (`src/pcsc/server/track-db.ts`)

Direct Firebase operations (CRUD). All functions marked `"use server"`.

- `fbReadAllTracks()`: Fetch all tracks from Firestore
- `fbReadTracksByLatestRating(limit)`: Get recently rated tracks
- `fbReadFullTrack(id)`: Get single track with full data
- `fbWriteTrack(track)`: Update track in Firestore
- `fbReadTracksByArtist(artist)`: Get tracks by artist
- `fbReadTracksByAlbum(album)`: Get tracks by album

### Firebase Initialization (`src/pcsc/server/firebase.ts`)

- Initializes Firebase Admin SDK
- Exports `db` (Firestore instance)
- Exports `toSerialisedDate()` utility

### Model Layer (`src/pcsc/model/`)

#### `track.tsx` - Data Models
**TrackModel Class**
- Constructor accepts `Track | CompactTrack`
- Provides computed properties (e.g., `songUrl`, `artistUrl`, `storedVote`)
- Handles vote calculations, date formatting, serialization
- `compact` getter returns CompactTrack for network transfer
- `serialised` getter returns full Track for storage

**CompactTrack Type**
```typescript
type CompactTrack = {
  id: string;
  title: string;
  album: string;
  artist: string;
  vote: number;
  dateAdded: string;
  releaseDate: string;
  lastVoteDate: string;
  songUrl: string;
  artistUrl: string;
  albumUrl: string;
  yearUrl: string;
  year: number;
};
```

**Track Type**
```typescript
type Track = CompactTrack & {
  albumArtist?: string | null;
  appleRating?: number | null;
  discNumber: number | null;
  discCount: number | null;
  trackNumber: number | null;
  trackCount: number | null;
  votes?: SerialisedVote[] | null;
};
```

#### `track-map.tsx` - Search/Filter Utilities
**TrackMapModel Class**
- Constructor accepts `TrackModel[]`
- `all` getter: Returns all tracks sorted by rating
- `find(query)`: Search tracks by slugified query
- `getArtists()`: Aggregate tracks by artist
- `getAlbums()`: Aggregate tracks by album
- `getYears()`: Aggregate tracks by year
- `getTop(n)`: Get top N tracks

#### `slugify.ts`
- Normalizes text for search (lowercase, remove accents, etc.)
- Used by TrackMapModel.find() for fuzzy matching

## Data Flow

### Initial Page Load (Leaderboard)

```
UI Component          Frontend Query          API Route                Cache Layer
    |                 server/tracks.ts    /pcsc-api/tracks/leaderboard  track-cache.ts
    |                       |                     |                         |
    |-- fetchLeaderboard()->|                     |                         |
    |                       |                     |                         |
    |              query() wrapper                |                         |
    |              (caching/dedup)                |                         |
    |                       |                     |                         |
    |                       |-- fetchLocal() ---->|                         |
    |                       |   GET request       |                         |
    |                       |                     |-- getAllTracks() ------>|
    |                       |                     |                         |
    |                       |                     |          TrackMapModel (in-memory)
    |                       |                     |          .getTop(100)
    |                       |                     |                         |
    |                       |                     |<-- CompactTrack[] ------|
    |                       |                     |                         |
    |                       |<-- JSON response ---|                         |
    |                       |                     |                         |
    |<-- CompactTrack[] ----|                     |                         |
    |                       |                     |                         |
Display tracks
```

### Search Query

```
UI Component          Frontend Query          API Route                Cache Layer
    |                 server/tracks.ts    /pcsc-api/tracks/search/:q   track-cache.ts
    |                       |                     |                         |
    |-- fetchByQuery(q) --->|                     |                         |
    |                       |                     |                         |
    |              query() wrapper                |                         |
    |              (caching/dedup)                |                         |
    |                       |                     |                         |
    |                       |-- fetchLocal() ---->|                         |
    |                       |   GET request       |                         |
    |                       |                     |-- getAllTracks() ------>|
    |                       |                     |                         |
    |                       |                     |          TrackMapModel (in-memory)
    |                       |                     |          .find(query)
    |                       |                     |                         |
    |                       |                     |<-- CompactTrack[] ------|
    |                       |                     |                         |
    |                       |<-- JSON response ---|                         |
    |                       |                     |                         |
    |<-- CompactTrack[] ----|                     |                         |
    |                       |                     |                         |
Display tracks
```

## Frontend Pattern

### Using Query Functions in UI Components

**CORRECT** - UI components import from `~/pcsc/server/tracks`:

```typescript
import { fetchLeaderboard, fetchByQuery } from '~/pcsc/server/tracks';

// Reactive query that refetches when searchTerm changes
const [tracks] = createResource(searchTerm, async (query) => {
  return query.length === 0
    ? await fetchLeaderboard()
    : await fetchByQuery(query);
});

// Work with CompactTrack objects
<For each={tracks()}>
  {(track) => <PcscItem track={track} />}
</For>
```

**INCORRECT** - Never call API routes directly or bypass the query layer:

```typescript
// ❌ WRONG - Don't call API routes directly
const res = await fetch('/pcsc-api/tracks/leaderboard');
const tracks = await res.json();

// ❌ WRONG - Don't import from track-cache in UI components
import { getAllTracks } from '~/pcsc/server/track-cache';
```

### Four-Layer Architecture Benefits

1. **Frontend Layer** (`server/tracks.ts`):
   - `query()` wrapper provides automatic caching and request deduplication
   - Single source of truth for all track queries
   - Easy to add new query functions following the same pattern

2. **API Layer** (`routes/pcsc-api/`):
   - Clean HTTP endpoints for data access
   - Can be extended for external API access if needed
   - Separation of routing logic from business logic

3. **Cache Layer** (`server/track-cache.ts`):
   - Single in-memory TrackMapModel instance
   - All search/filter/sort operations happen here
   - No repeated Firebase calls after initial load

4. **UI Layer** (components/pages):
   - Works with `CompactTrack[]` directly
   - No transformation logic needed
   - Clean, simple component code

### Why This Architecture?

**Performance**:
- `query()` wrapper caches responses and deduplicates concurrent requests
- API routes run server-side, reducing client bundle size
- In-memory cache eliminates repeated Firebase calls

**Separation of Concerns**:
- UI components focus on display logic
- Query functions handle caching and API calls
- API routes handle HTTP concerns
- Cache layer manages data operations

**Maintainability**:
- Adding new queries: Add function to `server/tracks.ts` + API route
- Changing cache behavior: Only modify `track-cache.ts`
- UI components remain unchanged when backend changes

## Performance Considerations

1. **Server-side caching**: `fillTracksCache()` loads Firebase data once at startup, serves from memory via `getAllTracks()`
2. **Query caching**: SolidJS `query()` wrapper caches responses and deduplicates concurrent requests
3. **Minimal data transfer**: Only `CompactTrack[]` sent over network (not full Track objects)
4. **Backend processing**: Heavy operations (sort, filter, search) done server-side in API routes
5. **Reactive fetching**: SolidJS `createResource` auto-refetches when search term changes

## Search Implementation

Search uses slugification for fuzzy matching:

1. Query and track fields normalized (lowercase, remove accents, hyphens)
2. Track ID is a slug of `title--artist--album`
3. Search checks if query slug appears in track ID
4. Results sorted by rating (highest first)

Example:
```
Query: "Mogwai Fear Satan"
Slugified: "mogwai-fear-satan"
Matches: Track with ID "mogwai-fear-satan--mogwai--young-team"
```

## Firebase Configuration

Required environment variables (`.env`):
```
FB_PRIVATE_KEY=...       # Firebase service account private key
FB_CLIENT_EMAIL=...      # Firebase service account email
```

Project ID: `pcsc-app` (hardcoded in firebase.ts)

## Future Enhancements

- Add pagination support (offset/limit)
- Implement result caching on client
- Add specialized queries (by artist, album, year)
- Support for sorting options (rating, date, alphabetical)
- Add aggregation queries (statistics, top artists, etc.)
