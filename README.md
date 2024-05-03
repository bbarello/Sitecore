<p align="center">
   <br/>
   <a href="https://developers.sitecore.com/contribute" target="_blank"><img width="150px" src="/src/assets/sitecore.png" /></a>
   </p>
  

## Build Prerequisites

### Node.js

The developer portal is built with Next.js, so you'll need to have Node.js installed to build the project. You can find the latest version of Node.js here. We recommend using the LTS version of Node.js.

### Environment Variables

The Sitecore developer portal incorporates a number of third party services to bring in content. For full functionality, you must create a .env.local file in the root of the project and add in the below environment variables.

The following variables should exist within the .env.local file:
```
YOUTUBE_API_KEY="An API key with YouTube Data API v3 access enabled"
TWITTER_BEARER_TOKEN="A bearer token from Twitter "

```
> _Note: The site will still function without the above keys. The components that require these environment variables will fail gracefully and not display on the pages._

## Getting Started

1. Install Node.js, we recommend the LTS version.

2. Clone the repository git clone https://github.com/Sitecore/developer-portal.git

3. Inside the repository run npm install to install all the dependencies.

4. Create a .env.local file in the root of the project and add the following environment variables
```
YOUTUBE_API_KEY=""
TWITTER_BEARER_TOKEN="

```
> _For more information on populating environment variables see section Environment Variables above._

5. Run npm run dev to start the development server.

6. Open the http://localhost:3000 in your browser to see the result!




Add details for one or more providers (e.g. Google, Twitter, GitHub, Email, etc).

#### Database

A database is needed to persist user accounts and to support email sign in. However, you can still use NextAuth.js for authentication without a database by using OAuth for authentication. If you do not specify a database, [JSON Web Tokens](https://jwt.io/introduction) will be enabled by default.

You **can** skip configuring a database and come back to it later if you want.

For more information about setting up a database, please check out the following links:

- Docs: [authjs.dev/reference/core/adapters](https://authjs.dev/reference/core/adapters)

### 3. Configure Authentication Providers

1. Review and update options in `auth.ts` as needed.

2. When setting up OAuth, in the developer admin page for each of your OAuth services, you should configure the callback URL to use a callback path of `{server}/api/auth/callback/{provider}`.

e.g. For Google OAuth you would use: `http://localhost:3000/api/auth/callback/google`

A list of configured providers and their callback URLs is available from the endpoint `api/auth/providers`. You can find more information at https://authjs.dev/getting-started/providers/oauth-tutorial

1. You can also choose to specify an SMTP server for passwordless sign in via email.

### 4. Start the application

To run your site locally, use:

```
npm run dev
```

To run it in production mode, use:

```
npm run build
npm run start
```

### 5. Preparing for Production

Follow the [Deployment documentation](https://authjs.dev/getting-started/deployment)

## Acknowledgements

<a href="https://vercel.com?utm_source=nextauthjs&utm_campaign=oss">
<img width="170px" src="https://raw.githubusercontent.com/nextauthjs/next-auth/main/docs/static/img/powered-by-vercel.svg" alt="Powered By Vercel" />
</a>
<p align="left">Thanks to Vercel sponsoring this project by allowing it to be deployed for free for the entire NextAuth.js Team</p>

## License

ISC
