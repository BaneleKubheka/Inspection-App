# Asset Inspection App - Cloudflare Pages + Worker API + PWA

This is a full rewrite intended to replace the existing GitHub files completely.

## What changed

- Removed Google Identity Services browser script dependency. Sign-in now uses a redirect OAuth flow through Cloudflare Pages Functions, so the previous `gsi/client` and `Required Google sign-in library did not initialise` errors should not recur.
- Added Cloudflare API layer under `/api/*` for Google authentication and Drive upload.
- Added persistent mobile/local storage using IndexedDB for inspections, photos, answers, templates and upload queue.
- Added in-app Template Manager. Templates are edited inside the app, separate from inspections, and can be selected/deployed per asset inspection.
- Added per-inspection folder upload structure:

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

- Added offline-first photo compression and queueing. Photos are saved on the device first, then uploaded when online and signed in.
- Added Word-compatible report export matching the AMP 206 structure: asset details, inspection checklist, condition rating, photo condition assessment and sign-off.
- Added PWA support with service worker caching that does not intercept `/api/*` calls.

## Deploy from GitHub to Cloudflare Pages

1. Delete the old repository files.
2. Upload all files from this ZIP to the GitHub repository root.
3. In Cloudflare, go to **Workers & Pages > Create application > Pages > Connect GitHub**.
4. Select the repository.
5. Use:

```text
Build command: none
Build output directory: public
```

6. Deploy.

## Google OAuth settings

In Google Cloud Console, your OAuth client must be **Web application**.

Add this Authorized redirect URI:

```text
https://inspection-app.banelekubheka45-1.workers.dev/api/auth/callback
```

Add this Authorized JavaScript origin:

```text
https://inspection-app.banelekubheka45-1.workers.dev
```

The Client ID is already built into `wrangler.toml`:

```text
761850558497-il9ofceonaktmb7d02ior4n4qk5koqs7.apps.googleusercontent.com
```

If Google requires the Client Secret for token exchange, add it in Cloudflare Pages project settings:

```text
Settings > Environment variables > Add variable
GOOGLE_CLIENT_SECRET = your Google OAuth client secret
```

Keep it encrypted/secret. Do not put the client secret in public code.

## Notes

- The app uses IndexedDB because mobile web apps cannot freely create arbitrary folders in the phone file system without user-granted file permissions. IndexedDB is the correct persistent PWA storage mechanism for drafts and photos.
- The Google Drive folder structure is created/reused by the API layer during sync.
- If offline, inspections remain on the device and sync later.
