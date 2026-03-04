# @wsms/logger-connect-nuxt

Nuxt 3/4 module for [`@wsms/logger`](https://github.com/WhoStoleMySleepDev/logger) — structured file logging with auto-imports for both server routes and Vue components.

## Features

- Auto-imported `useLogger()` in server routes (Nitro) and pages/components
- SSR: writes directly to file via `@wsms/logger`
- Client-side: forwards logs to a built-in server endpoint (`/_wsms/log`) which writes to file
- `$logger` available via `useNuxtApp()` in components
- Full TypeScript support

## Installation

```bash
npm install @wsms/logger @wsms/logger-connect-nuxt
```

## Setup

`nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@wsms/logger-connect-nuxt'],

  wsmsLogger: {
    logger: {
      logFilePath: './logs/app.log',
    },
    // configPath: './logger.config.json',
  },
})
```

See [`@wsms/logger`](https://github.com/WhoStoleMySleepDev/logger) for the full list of `logger` options and configuration file format.

## Usage

### Server Routes

`useLogger()` is auto-imported in all Nitro server routes and plugins:

```ts
// server/api/users.get.ts
export default defineEventHandler(() => {
  const logger = useLogger()

  logger.info('fetching users')

  return []
})
```

```ts
// server/plugins/init.ts
export default defineNitroPlugin(() => {
  const logger = useLogger()
  logger.info('server started')
})
```

### Pages & Components

`useLogger()` is auto-imported in Vue components and pages:

```vue
<script setup lang="ts">
const logger = useLogger()

logger.info('page loaded')
</script>
```

Or via `useNuxtApp()`:

```ts
const { $logger } = useNuxtApp()
$logger.warn('something happened')
```

## How It Works

| Context | Behavior |
|---|---|
| Server (SSR / Nitro) | Writes directly to file via `@wsms/logger` |
| Client (browser) | POSTs to `/_wsms/log` → server writes to file |

The internal `/_wsms/log` endpoint is registered automatically by the module. You do not need to create it.

## Module Options

| Option | Type | Description |
|---|---|---|
| `logger` | `Partial<LoggerOptions>` | Logger options (logFilePath, rotation, etc.) |
| `configPath` | `string` | Path to a `logger.config.json` file |

## Development

```bash
npm install
npm run build
npm run dev       # watch mode
npm run lint
```

## License

MIT
