# Superhero Wiki simple CRUD app

Tech stack: Node.JS + Next.js React + PostgreSQL

## Deployment prerequisites

An environment variable for PosgreSQL DB connection must be defined or, otherwise, specified in the `./backend/.env` file:
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/SuperheroWiki?schema=public"
```

The DB schema must be reproduced with:
```
cd backend
npm run migrate
```

## Design choises

- Kysely Javascript ORM:
    - Code-first modeling usecase support
    - Thin typescript abstraction layer over SQL
    - Migrations support for schema change expectations
- React pages with Next.js:
    - Popular choise = generic feature set
    - Builtin SEO options
- React builtin state management:
    - No actual user-owned state
- Flowbite UI:
    - Low overhead (css generation)
    - Sketching priority over product maintenance

## Drawing board / TODOs

Must:
- Upload and delete cover and secondary images functionality
- Show and edit cover and other images in the info
- Sort, search, pagination POST endpoint
- Ensure that deployment steps are working (missing: run step)
- Testing solution?

Could:
- Superpower rich list input, superpower chips and rish search page
- Docker deployment option?
- SwaggerUI via tRPC + Zod:
    - Manual endpoint testing option
    - Request schema validation feature
- Further normalization tables for superpowers Wiki functionality?
