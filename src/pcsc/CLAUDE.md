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

The PCSC One application follows a **three-layer architecture** with clear separation between UI, frontend queries, and backend services.

## Architecture Principles

### 1. Three-Layer Architecture
- **UI Layer (Components/Pages)**: Only works with TrackModel instances, never calls backend directly
- **Frontend Layer (queries.ts)**: Transforms backend responses into TrackModel instances
- **Backend Layer (service/)**: Processes data server-side, returns CompactTrack objects

### 2. Server-Side Processing
- **All heavy operations** (sorting, filtering, searching) occur on the server
- Backend maintains the full dataset in memory (cached)
- Query functions return only the necessary subset of data
- Client never receives or processes the full dataset

### 3. Data Transfer Optimization
- Server returns `CompactTrack` objects (minimal data structure)
- Frontend layer hydrates CompactTrack → TrackModel for computed properties
- Only essential fields transferred over network

### 4. Clear Separation of Concerns
- **UI Components**: Display logic, user interaction, UI state
- **Frontend Queries**: Data transformation (CompactTrack → TrackModel)
- **Backend Services**: Data fetching, filtering, sorting, business logic

## File Structure

```
src/pcsc/
├── service/
│   ├── server.ts          # SERVER: fetch* functions return CompactTrack[]
│   ├── client.ts          # CLIENT: get* functions return TrackModel[]
│   ├── firebase.ts        # Firebase admin initialization
│   └── track.ts           # Low-level Firebase CRUD operations
├── lib/
│   └── track-utils.ts     # Caching layer for all tracks
├── model/
│   ├── track.tsx          # TrackModel class + CompactTrack/Track types
│   ├── track-map.tsx      # TrackMapModel (search/filter utilities)
│   └── slugify.ts         # Text normalization for search
└── components/            # UI components
```

## Architecture Layers

### UI Layer (Components/Pages)

UI components **MUST ONLY** call client-side `get*` functions, never server `fetch*` functions directly.

**Rules**:
- Always import from `~/pcsc/service/client`
- Work exclusively with `TrackModel[]` arrays
- Access convenience methods and computed properties (e.g., `track.songUrl`, `track.storedVote`)

### Client Layer (`src/pcsc/service/client.ts`)

Client-side query functions that wrap server calls and hydrate data. **CLIENT-SIDE ONLY** - no `"use server"`.

**Naming Convention**: `get*` functions (e.g., `getTop500`, `getByQuery`)

**Purpose**: Provide TrackModel instances with convenience methods like:
- Computed URLs (`track.songUrl`, `track.artistUrl`, `track.albumUrl`)
- Formatting helpers
- Centralized URL composition (e.g., `/pcsc-one/songs/{slug}`)

**`getTop500(): Promise<TrackModel[]>`** *(CLIENT-SIDE)*
- Calls server-side `fetchTop500()`
- Receives `CompactTrack[]` over network
- Maps to `TrackModel[]` on the CLIENT
- Returns: TrackModel instances with convenience methods

**`getByQuery(query: string): Promise<TrackModel[]>`** *(CLIENT-SIDE)*
- Calls server-side `fetchByQuery(query)`
- Receives `CompactTrack[]` over network
- Maps to `TrackModel[]` on the CLIENT
- Returns: TrackModel instances with convenience methods

### Server Layer (`src/pcsc/service/server.ts`)

Server-side query functions that process data. **Marked with `"use server"`**.

**Naming Convention**: `fetch*` functions (e.g., `fetchTop500`, `fetchByQuery`)

**`fetchTop500(): Promise<CompactTrack[]>`** *(SERVER-SIDE)*
- Fetches all tracks from cache
- Sorts by rating (highest first)
- Returns top 500 tracks as plain CompactTrack objects (serializable)
- **Never called directly by UI components**

**`fetchByQuery(query: string): Promise<CompactTrack[]>`** *(SERVER-SIDE)*
- Accepts search term
- Searches across title, artist, album (slugified for fuzzy matching)
- Returns up to 500 matching tracks sorted by rating
- Falls back to fetchTop500() if query is empty
- **Never called directly by UI components**

#### `track.ts` - Firebase Operations (Low-Level)
Direct Firebase operations (CRUD). All functions marked `"use server"`.

- `fbReadAllTracks()`: Fetch all tracks from Firestore
- `fbReadTracksByLatestRating(limit)`: Get recently rated tracks
- `fbReadFullTrack(id)`: Get single track with full data
- `fbWriteTrack(track)`: Update track in Firestore
- `fbReadTracksByArtist(artist)`: Get tracks by artist
- `fbReadTracksByAlbum(album)`: Get tracks by album

#### `firebase.ts` - Firebase Initialization
- Initializes Firebase Admin SDK
- Exports `db` (Firestore instance)
- Exports `toSerialisedDate()` utility

### Library Layer (`src/pcsc/lib/`)

#### `track-utils.ts` - Caching
**`getAllTracks(): Promise<TrackModel[]>`**
- In-memory cache of all tracks
- Loads from Firebase once, then serves from memory
- Returns TrackModel instances (not CompactTrack)

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

### Initial Page Load

```
UI Component          Client Layer (CLIENT)       Server Layer (SERVER)
    |                     service/client.ts          service/server.ts
    |                           |                         |
    |--- getTop500() ---------->|                         |
    |                           |--- fetchTop500() ------>|
    |                           |                         |
    |                           |                 getAllTracks() (cached)
    |                           |                 TrackMapModel.all (sorted)
    |                           |                 .slice(0, 500)
    |                           |                 .map(t => t.compact)
    |                           |                         |
    |                           |<-- CompactTrack[] ------|
    |                           |   (serialized over network)
    |                    .map(t => new TrackModel(t))
    |                    (CLIENT-SIDE hydration)
    |                           |
    |<-- TrackModel[] ----------|
    |
Display top 50
```

### Search Query

```
UI Component          Client Layer (CLIENT)       Server Layer (SERVER)
    |                     service/client.ts          service/server.ts
    |                           |                         |
    |-- getByQuery(q) --------->|                         |
    |                           |-- fetchByQuery(q) ----->|
    |                           |                         |
    |                           |                 getAllTracks() (cached)
    |                           |                 TrackMapModel.find(q)
    |                           |                 .slice(0, 500)
    |                           |                 .map(t => t.compact)
    |                           |                         |
    |                           |<-- CompactTrack[] ------|
    |                           |   (serialized over network)
    |                    .map(t => new TrackModel(t))
    |                    (CLIENT-SIDE hydration)
    |                           |
    |<-- TrackModel[] ----------|
    |
Display top 50
```

## Frontend Pattern

### Using Query Functions in UI Components

**CORRECT** - UI components call frontend `get*` functions:

```typescript
import { getTop500, getByQuery } from '~/pcsc/queries';

// Reactive query that refetches when searchTerm changes
const [tracks] = createResource(searchTerm, async (query) => {
  // Frontend layer returns TrackModel[] with all convenience methods
  return query.length === 0
    ? await getTop500()
    : await getByQuery(query);
});

// Work with TrackModel instances
const displayedTracks = () => tracks()?.slice(0, 50) ?? [];
```

**INCORRECT** - Never call backend `fetch*` functions directly from UI:

```typescript
// ❌ WRONG - UI should never import from service/query
import { fetchTop500, fetchByQuery } from '~/pcsc/service/query';

// ❌ WRONG - UI should never manually transform CompactTrack to TrackModel
const compactTracks = await fetchTop500();
return compactTracks.map(t => new TrackModel(t));
```

### Three-Layer Data Transformation

1. **Backend Layer** (`service/query.ts`):
   - `fetch*` functions return `CompactTrack[]`
   - Minimal data for efficient network transfer
   - Plain objects optimized for JSON serialization

2. **Frontend Layer** (`queries.ts`):
   - `get*` functions call `fetch*` and transform responses
   - Transforms `CompactTrack[]` → `TrackModel[]`
   - Single responsibility: hydration of server responses

3. **UI Layer** (components/pages):
   - Works exclusively with `TrackModel[]`
   - Access all convenience methods and computed properties
   - Example: `track.songUrl`, `track.storedVote`, `track.vote`

### Why This Architecture?

**Separation of Concerns**:
- UI components don't know about CompactTrack or transformation logic
- Backend doesn't know about TrackModel class
- Frontend layer handles all data hydration

**Type Safety**:
- UI components always work with rich TrackModel instances
- No risk of accessing undefined methods on plain objects

**Maintainability**:
- Adding new query functions? Just add to `queries.ts` with same pattern
- Changing data transformation? Only modify `queries.ts`
- UI components remain unchanged

## Performance Considerations

1. **Server-side caching**: `getAllTracks()` loads once, serves from memory
2. **Minimal data transfer**: Only CompactTrack (not full Track) sent over network
3. **Backend processing**: Heavy operations (sort, filter) done server-side
4. **Client-side slicing**: Server returns up to 500, client displays 50
5. **Reactive fetching**: SolidJS `createResource` auto-refetches on search

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
