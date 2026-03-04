# @wsms/logger-connect-nuxt

Nuxt-коннектор для [`@wsms/logger`](https://github.com/whostolemysleep/logger).

## Установка

```bash
npm i @wsms/logger @wsms/logger-connect-nuxt
```

## Подключение

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

## Использование

Доступно только на сервере (Nitro/SSR).

- `useLogger()` (auto-import)
- `useNuxtApp().$logger`

### Пример: `server/api/ping.get.ts`

```ts
export default defineEventHandler(() => {
  const logger = useLogger()

  logger.info('ping')

  return {
    ok: true,
  }
})
```

### Пример: `server/plugins/logger-init.ts`

```ts
export default defineNitroPlugin(() => {
  const logger = useLogger()
  logger.info('nitro started')
})
```
