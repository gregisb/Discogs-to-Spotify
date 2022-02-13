import NextAuth from 'next-auth';
import SessionProviders from 'next-auth/react';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../../lib/spotify';

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('Refreshed token is ', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now + refreshedToken.expires_in * 1000, // = 1hour, as 3600 returns
      // from spotify API
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken, // replace if new one came
      // back else fall back to old refresh token

    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

const options = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,

      params: {
        grant_type: 'authorization_code',
      },
      callbacks: {
        async signIn({
          user, account, profile, email, credentials,
        }) {
          return true;
        },
        async redirect({ url, baseUrl }) {
          return baseUrl;
        },
        async session({ session, user, token }) {
          return session;
        },
        async jwt({
          token, user, account, profile, isNewUser,
        }) {
          return token;
        },
      },
      profile(profile) {
        return {
          id: profile.id,
          name: profile.display_name,
          email: profile.email,
          image: profile.images?.[0]?.url,
        };
      },
    }),
  ],
};

export default (req, res) => NextAuth(req, res, options);
