# Superhero Wiki simple CRUD app

Tech stack: Node.JS + React + PostgreSQL

## Design choises

- Kysely Javascript ORM:
    - Both database-first and code-first modeling usecases support
    - Automatic typescript support for DB entities
    - Migrations support for schema change expectations
    - Lightweight (?), modular
- React pages with Next.js:
    - Popular choise = generic feature set
    - Builtin SEO options
- React builtin state management:
    - No actual user-owned state
- Flowbite UI:
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

- Cycle images from the list when the card is hovered or selected
- Sort, search, pagination POST endpoint
- Testing solution?
- Superpower rich list input, superpower chips and rish search page
- Docker deployment option?
- SwaggerUI via tRPC + Zod:
    - Manual endpoint testing option
    - Request schema validation feature
- Should loaded entities expect data races and simultaneous edits?
- 'Many To Many' DB entities for superpowers Wiki functionality?
