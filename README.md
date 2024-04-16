# Movie Catalog

A REST API using the follow:
- Node.js (v20)
- Nest.js
- Typescript
- JWT auth
- Redis
- PostgreSQL
- TypeORM
- Docker
- Swagger

## Auth

To authenticate you need to do a POST to the endpoint `auth/login` passing as body:
```JSON
{
    "username": "admin",
    "password": "admin123"
}
```

> This values are stored in database, and will be possible to change from another endpoint in the future.

As answer you will get the token to use as Bearer token on others endpoints.

