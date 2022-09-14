namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string
    DATABASE_URL_MAIN: string
    DATABASE_URL_DEV: string
    DB_USER: string
    DB_PW: string
    HASH_SECRET: string
    NEXT_PUBLIC_JAWG_KEY: string
  }
}

declare global {
  var database: PrismaClient
}
