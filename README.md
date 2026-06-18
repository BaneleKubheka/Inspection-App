# Asset Inspection App

Static deployable web app. Upload the folder contents to Netlify, Cloudflare Pages, GitHub Pages, or any static host.

## Required Google setting
The Google OAuth Web Client ID is already built into `index.html` as `761850558497-il9ofceonaktmb7d02ior4n4qk5koqs7.apps.googleusercontent.com`. In Google Cloud Console, make sure your deployed URL is added under **Authorized JavaScript origins** for this same OAuth client.

## Included
- Google sign-in and Drive upload
- Per-inspector Google Drive folder reuse
- Draft autosave to Drive including compressed photos
- Editable infrastructure templates
- Unlimited photo capture/selection with compression
- AMP-style DOCX export and completed-report upload


## Built-in Google Client ID
This build contains the supplied OAuth Web Client ID, so inspectors do not need to paste it into the app. The deployment URL still has to be authorised in Google Cloud Console for this OAuth client.
