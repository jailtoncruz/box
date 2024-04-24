<p align="center">Box API</p>

## Description

Box API.

## Pre-Installation

```bash
$ docker compose up -d
```

## Installation

```bash
$ pnpm install
$ pnpm prisma migrate dev
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## License

Nest is [MIT licensed](LICENSE).
