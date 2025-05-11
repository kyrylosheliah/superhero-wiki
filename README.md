# Superhero Wiki simple CRUD app

Tech stack: Node.JS + Next.js React + PostgreSQL

## Run

PostgreSQL DB should be installed.

An environment variable for PosgreSQL DB connection must be defined or, otherwise, specified in the `./backend/.env` file:
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/SuperheroWiki?schema=public"
```

The DB schema must be reproduced with:
```
cd backend
npm install
npm run migrate
```

Run the backend
```
cd backend
npm install
npm run start
```

Run the frontend
```
cd frontend
npm install
npm run build
npm run start
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
- Testing solution?

Could:
- Maybe extract hooks
- Sorting order and orderBy field selection elements
- Further normalization tables for superpowers Wiki functionality?
- Superpower rich list input, superpower chips and 
- Rich search with multiple search field criteria spawn
- Docker deployment option?
- SwaggerUI via tRPC + Zod:
    - Manual endpoint testing option
    - Request schema validation feature
