import { OAuthConfig, OAuthUserConfig } from "next-auth/providers"

export interface SecureAuthProfile extends Record<string, any> {
    sub: string
    nickname: string
    email: string
  }

export default function SecureAuthProvider<P extends SecureAuthProfile>(
    options: OAuthUserConfig<P>
): OAuthConfig<P> {
    return {
        id: 'secureAuth',
        name: 'SecureAuth',
        type: 'oauth',
        version: '2.0',      
        wellKnown: `${options.issuer}/.well-known/openid-configuration`,
        authorization: { params: { scope: "openid profile offline_access" } },      
        idToken: true,
        requestTokenUrl: `${options.issuer}/OidcToken.aspx`,
        checks: ["pkce", "state"],
        profile(profile) {
            return {
              id: profile.sub,
              name: profile.nickname,
              email: profile.email,
              image: profile.picture,
            }
          },
        options,
    }
}