# Implementation Steps

Follow these steps after uploading this ZIP to GitHub.

## 1. Replace GitHub contents

1. Open the GitHub repository.
2. Delete all existing files and folders.
3. Upload the contents of this ZIP exactly as provided.
4. Confirm the repository root contains:

```text
functions
public
README.md
SETUP_STEPS.md
package.json
wrangler.toml
```

## 2. Cloudflare Pages setup

Use **Pages**, not a standalone Worker.

1. Cloudflare Dashboard > Workers & Pages.
2. Create application > Pages.
3. Connect GitHub.
4. Select the repository.
5. Set:

```text
Framework preset: None
Build command: leave blank
Build output directory: public
Root directory: leave blank
```

6. Deploy.

If Cloudflare shows a deploy command such as `npx wrangler deploy`, remove it. That is the wrong deployment mode for this app.

## 3. Cloudflare variables and secrets

Go to:

```text
Cloudflare Pages project > Settings > Variables and Secrets
```

Add these production variables:

```text
GOOGLE_CLIENT_ID = 761850558497-il9ofceonaktmb7d02ior4n4qk5koqs7.apps.googleusercontent.com
DRIVE_ROOT_FOLDER_NAME = Inspection App
```

Add this production secret if Google requires it:

```text
GOOGLE_CLIENT_SECRET = paste your Google OAuth client secret
```

Redeploy after adding/changing variables.

## 4. Google Cloud OAuth setup

Google Cloud Console > APIs & Services > Credentials.

Open the OAuth client:

```text
761850558497-il9ofceonaktmb7d02ior4n4qk5koqs7.apps.googleusercontent.com
```

Confirm:

```text
Application type: Web application
```

Add Authorized JavaScript origin:

```text
https://YOUR-PAGES-SITE.pages.dev
```

Add Authorized redirect URI:

```text
https://YOUR-PAGES-SITE.pages.dev/api/auth/callback
```

Replace `YOUR-PAGES-SITE.pages.dev` with the actual URL Cloudflare gives you.

## 5. Required Google API

Enable:

```text
Google Drive API
```

## 6. Test checklist after deployment

1. Open the Pages URL.
2. Install the app as a PWA on a phone if required.
3. Create a new inspection.
4. Add photos while online.
5. Turn off internet.
6. Add more photos and answers.
7. Confirm the Drafts tab still shows the inspection.
8. Turn internet back on.
9. Sign in with Google.
10. Press Sync queued items.
11. Confirm Google Drive contains:

```text
Inspection App / your-email / inspection folder / photos + data + report
```

## 7. What cannot be done inside the ZIP

These items require your cloud accounts and cannot be completed from inside the code package:

- Adding the deployed Pages URL to Google OAuth authorized origins.
- Adding the deployed callback URL to Google OAuth redirect URIs.
- Adding the Google client secret as a Cloudflare encrypted secret, if required.
- Confirming Google Drive API is enabled in your Google Cloud project.
- Removing any old Cloudflare project deploy command that still uses `npx wrangler deploy`.

