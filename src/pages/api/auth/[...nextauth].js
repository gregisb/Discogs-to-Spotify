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
      authorization: LOGIN_URL,
    }),
  ],
  params: {
    grant_type: 'authorization_code',
  },
  callbacks: {
    async session({ session, user, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.error = token.error;

      return session;
    },
    async jwt({
      token, user, account, profile, isNewUser,
    }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: Date.now() + account.expires_in * 1000,
          refreshToken: account.refresh_token,
          user,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, try to update it
      return refreshAccessToken(token);
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
};

export default (req, res) => NextAuth(req, res, options);
