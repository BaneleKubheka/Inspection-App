# Asset Inspection App - Cloudflare Pages + Pages Functions + PWA

This ZIP is intended to replace every file in the existing GitHub repository.

It is structured for **Cloudflare Pages**, not a standalone Cloudflare Worker deployment.

## What this version fixes

- Removes browser-side Google Identity Services sign-in, which caused the repeated `gsi/client` and mobile sign-in failures.
- Uses `/api/auth/*` Cloudflare Pages Functions for Google OAuth.
- Uses `/api/drive/upload` for Google Drive folder creation and uploads.
- Keeps the app frontend static inside `/public`.
- Keeps backend API functions inside `/functions/api`.
- Uses IndexedDB for persistent local device storage of inspections, templates, answers, photos, GPS/location data and sync queue status.
- Includes a separate in-app Template Manager for asset inspection templates.
- Creates one main Drive structure:

```text
Inspection App/
└─ inspector-email@gmail.com/
   └─ yyyy-mm-dd_Asset_Name_inspectionid/
      ├─ inspection-data.json
      ├─ locations.json
      ├─ draft-report.doc
      ├─ final-report.doc
      └─ photos/
         ├─ photo-001.jpg
         └─ photo-002.jpg
```

## Repository structure

```text
functions/
└─ api/
   ├─ auth/
   │  ├─ start.js
   │  ├─ callback.js
   │  ├─ status.js
   │  └─ logout.js
   └─ drive/
      └─ upload.js
public/
├─ icons/
│  └─ icon.svg
├─ _headers
├─ app.js
├─ index.html
├─ manifest.json
├─ style.css
└─ sw.js
package.json
wrangler.toml
README.md
SETUP_STEPS.md
```

## Correct Cloudflare Pages build settings

Use these exact settings:

```text
Framework preset: None
Build command: leave blank
Build output directory: public
Root directory: leave blank
Production branch: main
```

Do **not** use:

```text
npx wrangler deploy
```

That command is for a standalone Worker and will produce the `Missing entry-point to Worker script or to assets directory` error.

## Google OAuth settings

Your OAuth client must be type **Web application**.

Add your deployed Pages URL as an Authorized JavaScript origin, for example:

```text
https://inspection-app-a2u.pages.dev
```

Add this Authorized redirect URI:

```text
https://inspection-app-a2u.pages.dev/api/auth/callback
```

If you later add a custom domain, add the same origin and callback URL for the custom domain too.

## Cloudflare environment variables and secrets

In Cloudflare Pages:

```text
Settings > Variables and Secrets
```

Add:

```text
GOOGLE_CLIENT_ID = 761850558497-il9ofceonaktmb7d02ior4n4qk5koqs7.apps.googleusercontent.com
DRIVE_ROOT_FOLDER_NAME = Inspection App
```

Add the following as an encrypted secret if your Google Web Client requires it:

```text
GOOGLE_CLIENT_SECRET = your Google OAuth client secret
```

Do not place the client secret in public code.

## Local/device storage note

Mobile web apps cannot create arbitrary native phone folders without explicit user file-system permissions. This app therefore uses IndexedDB, which is the correct persistent storage layer for PWAs. Photos and drafts remain available on the device and are queued for Google Drive upload when internet and sign-in are available.

## Report format note

The app generates a Word-compatible `.doc` report using the AMP 206 structure: asset details, inspection checklist, condition rating, photo condition assessment and sign-off. Microsoft Word opens and edits the file. The Google Drive folder also contains the raw `inspection-data.json`, `locations.json` and photo files for traceability.
