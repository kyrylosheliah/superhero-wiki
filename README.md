# Superhero Wiki simple CRUD app

Tech stack: Node.JS + React + PostgreSQL

./backend/.env:
```
DATABASE_URL="postgresql://postgres:password@localhost:5433/SuperheroWiki?schema=public"
```

## Design choises

- Prisma JS ORM:
    - Automatic typescript support for DB entities
    - Schema change expectation (wiki functionality expansion)
- React pages with Next.js:
    - Personal familiarity
    - Popular choise = generic feature set
- React builtin state management
    - No actual user-owned state

## Drawing board / TODOs

- UI solution?
- Should loaded entities expect data races and simultaneous edits?
- Hero search and sorting POST endpoint
- Docker deployment option?
- Second DB entity (table) for Wiki-like functionality?
