# Discogs to Spotify ![License](https://img.shields.io/badge/license-GPL-blue) ![Vercel](https://vercelbadge.vercel.app/api/gregisb/Discogs-to-Spotify)


<img src="./public/images/home.png" alt="Discogs to Spotify" />

# About

Discogs to Spotify is a app that creates Spotify playlists based on any Discogs list.
It is simple and intuitive and you can test it even if you're not a Discogs user (hope you enjoy Daft Punk!).

Just sign in with your Spotify account and link any Discogs list. Then you will select the tracks you want to import, give a name to your new Spotify playlist (that will be available on your Spotify profile) and listen to the songs, using our app or the Spotify client!

Built using React with NextJS, integrates Discogs public API with Spotify user API using OAuth2.


> "Dear Discogs to Spotify team,
>
> Thank you for submitting **Discogs to Spotify** to Spotify for review. This is a notification that your application has been granted a quota extension.
>
> Thank you for developing on the Spotify Developer Platform!"
>
> Developer Platform Team, Spotify

## Screenshots

<img src="./public/images/collection1.png" alt="Discogs to Spotify"  />
<img src="./public/images/collection2.png" alt="Discogs to Spotify"  />
<img src="./public/images/result.png" alt="Discogs to Spotify"  />



# Contributing

1. Create an issue to discuss the feature.

2. Create a feature or bug branch linked to the issue.

3. Issue a PR when its ready.


# Getting Started

## Starting the application

Run the development server:

```bash
npm run dev
# or
yarn dev
```

## Linting

Using ESLint

```bash
yarn lint-fix
```

## Deploy

Deployment made automatically on Vercel from GitHub.

Branch `main` (Production): https://discogs-to-spotify.vercel.app/

Branch `staging`: https://discogs-to-spotify-staging.vercel.app/



## License

See LICENSE file.