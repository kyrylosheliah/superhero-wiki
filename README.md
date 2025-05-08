# Superhero Wiki simple CRUD app

Tech stack: Node.JS + React + PostgreSQL

## Design choises

- Kysely Javascript ORM:
    - Both database-first and code-first modeling usecases support
    - Automatic typescript support for DB entities
    - Migrations support for schema change expectations
    - On the lightweight side of ORMs (?, TODO: fact check)
- React pages with Next.js:
    - Personal familiarity
    - Popular choise = generic feature set
- React builtin state management
    - No actual user-owned state
- Flowbite UI
    - Low overhead (css generation)
    - Sketching priority over product maintenance

## Deployment prerequisites

./backend/.env:
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/SuperheroWiki?schema=public"
```

```
cd backend
npm run migrate
```

## Drawing board / TODOs

- Hover-flip cards for superhero list
- Testing solution?
- Hero rich search and sorting POST endpoint
- Docker deployment option?
- Swagger or similar tool
- Schema validation solution
- Should loaded entities expect data races and simultaneous edits?
- 'Many To Many' DB entities for superpowers Wiki-like functionality?
