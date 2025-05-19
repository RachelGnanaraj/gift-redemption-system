# Gift Redemption System

A Node.js + TypeScript CLI tool to manage team-based gift redemptions during the festive season.

## Project Brief
Each staff member has a unique staff pass ID mapped to a team. A team may redeem a gift once via any of its members. This application:

1. Looks up the representative’s staff ID from the mapping file.
2. Checks if the team has already redeemed their gift.
3. Adds a redemption record if the team is eligible.

## Project Structure
```bash
project/
├── data/                          # Input CSV and output JSON data
│   ├── staff-id-to-team-mapping.csv
│   └── redemptions.json
├── src/                           # Application source
│   ├── index.ts                   # CLI entry point
│   ├── model/types.ts            # TypeScript interfaces
│   ├── service/RedemptionService.ts
│   └── utils/csvLoader.ts        # CSV parsing utility
├── tests/                         # Jest test cases
│   └── RedemptionService.test.ts
├── tsconfig.json                  # TypeScript configuration
├── .gitignore
└── README.md
```

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run redemption via CLI
```bash
npx ts-node src/index.ts <STAFF_PASS_ID>
```
Example:
```bash
npx ts-node src/index.ts STAFF_H123804820G
```

### 3. Run Tests
```bash
npx jest
```

## Features
- CLI-based gift redemption system.
- Loads staff-to-team mappings from CSV.
- Records redemptions in JSON.
- Validates duplicate redemptions.
- Includes unit tests with Jest.

## Assumptions
- Each team can only redeem once.
- Staff pass ID is unique.
- CSV file headers are consistent but may have BOM (handled).
- Redemption data is stored in a local `JSON` file.

## Design Decisions
- TypeScript for static typing and code clarity.
- `csv-parse` for robust CSV ingestion.
- Simple file-based storage for easy prototyping.
- Organized services and utils to allow testability and extension.

## Future Improvements
- Replace CLI with RESTful API (e.g., Express).
- Use a persistent data store (e.g., SQLite, PostgreSQL).
- Add CLI prompts and validation.
- Include timestamps in human-readable format.
- Implement logging and error reporting.