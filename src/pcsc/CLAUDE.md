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
