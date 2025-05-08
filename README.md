# Superhero Wiki simple CRUD app

Tech stack: Node.JS + React + PostgreSQL

./backend/.env:
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/SuperheroWiki?schema=public"
```

## Design choises

- Kysely Javascript ORM:
    - Database-first modeling usecase support
    - Automatic typescript support for DB entities
    - Migrations support for schema change expectations
    - On the lightweight side of ORMs (?, TODO: fact check)
- React pages with Next.js:
    - Personal familiarity
    - Popular choise = generic feature set
- React builtin state management
    - No actual user-owned state

## Deployment prerequisites

./backend/.env:
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/SuperheroWiki?schema=public"
```

## Drawing board / TODOs

- Testing solution?
- UI solution?
- Should loaded entities expect data races and simultaneous edits?
- Hero search and sorting POST endpoint
- Docker deployment option?
- Second DB entity (table) for Wiki-like functionality?
