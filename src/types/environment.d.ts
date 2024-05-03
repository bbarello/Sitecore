namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    SECUREAUTH_CLIENT_ID: string
    SECUREAUTH_CLIENT_SECRET: string
    SECUREAUTH_AUTHORITY: string,
    SECUREAUTH_AUTHORIZATION_ENDPOINT: string,
    SECRET: string
  }
}
