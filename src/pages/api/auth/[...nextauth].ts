import NextAuth, { User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import SecureAuthProvider from 'src/providers/SecureAuthProvider';

interface IToken extends JWT {
  accessToken: string;
  idToken: string;
  accessTokenExpires: number;
  refreshToken: string;
  user: User;
}

async function refreshAccessToken(token: IToken): Promise<IToken> {
  try {
    //console.log(token.refreshToken);
    const url = `${process.env.SECUREAUTH_AUTHORITY}/OidcToken.aspx`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
      body: new URLSearchParams({
        client_id: process.env.SECUREAUTH_CLIENT_ID,
        client_secret: process.env.SECUREAUTH_CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      }).toString(),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: refreshedTokens.expires_at,
      idToken: refreshedTokens.id_token,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    //console.log(error);

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default NextAuth({
  // https://next-auth.js.org/configuration/providers
  providers: [
    SecureAuthProvider({
      clientId: process.env.SECUREAUTH_CLIENT_ID,
      clientSecret: process.env.SECUREAUTH_CLIENT_SECRET,
      issuer: process.env.SECUREAUTH_AUTHORITY,
    }),
  ],
  // The secret should be set to a reasonably long random string.
  // It is used to sign cookies and to sign and encrypt JSON Web Tokens, unless
  // a separate secret is defined explicitly for encrypting the JWT.
  secret: 'cf4d06ae69ef2cdf08c3ce3ac723c213',

  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    // This option can be used with or without a database for users/accounts.
    // Note: `strategy` should be set to 'jwt' if no database is used.
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    // maxAge: 30 * 24 * 60 * 60, // 30 days

    // Seconds - Throttle how frequently to write to database to extend a session.
    // Use it to limit write operations. Set to 0 to always update the database.
    // Note: This option is ignored if using JSON Web Tokens
    // updateAge: 24 * 60 * 60, // 24 hours
  },

  // JSON Web tokens are only used for sessions if the `strategy: 'jwt'` session
  // option is set - or by default if no database is specified.
  // https://next-auth.js.org/configuration/options#jwt
  jwt: {
    // A secret to use for key generation (you should set this explicitly)
    secret: process.env.SECRET,
    // Set to true to use encryption (default: false)
    // encryption: true,
    // You can define your own encode/decode functions for signing and encryption
    // if you want to override the default behaviour.
    // encode: async ({ secret, token, maxAge }) => {},
    // decode: async ({ secret, token, maxAge }) => {},
  },

  // You can define custom pages to override the built-in ones. These will be regular Next.js pages
  // so ensure that they are placed outside of the '/api' folder, e.g. signIn: '/auth/mycustom-signin'
  // The routes shown here are the default URLs that will be used when a custom
  // pages is not specified for that route.
  // https://next-auth.js.org/configuration/pages
  pages: {
    // signIn: '/auth/signin',  // Displays signin buttons
    // signOut: '/auth/signout', // Displays form with sign out button
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // Used for check email page
    // newUser: null // If set, new users will be directed here on first sign in
  },

  // Callbacks are asynchronous functions you can use to control what happens
  // when an action is performed.
  // https://next-auth.js.org/configuration/callbacks
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) { return true },
    // async redirect({ url, baseUrl }) { return baseUrl },
    // async session({ session, token, user }) { return session },
    //async jwt({ token, user, account, profile, isNewUser }) { return token }
    async jwt({ token, user, account }) {
      // Initial sign in
      if (account && user) {
        return {
          accessToken: account.access_token,
          idToken: account.id_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        } as IToken;
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < (token as IToken).accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token as IToken);
    },
    async session({ session, token }) {
      session.user = { name: token.sub };
      session.accessToken = token.accessToken;
      session.idToken = token.idToken;
      session.error = token.error;
      session.refreshToken = token.refreshToken;
      session.expires = token.accessTokenExpires as string;
      return session;
    },
  },

  // Events are useful for logging
  // https://next-auth.js.org/configuration/events
  events: {},

  // Enable debug messages in the console if you are having problems
  debug: false,
});
