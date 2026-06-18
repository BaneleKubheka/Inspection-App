# Asset Inspection App

Deploy this folder as a static web app on Netlify, Cloudflare Pages, GitHub Pages, or any HTTPS static host.

## Built-in Google Client ID
The app already includes this Google OAuth Web Client ID:

`761850558497-il9ofceonaktmb7d02ior4n4qk5koqs7.apps.googleusercontent.com`

In Google Cloud Console, the deployed site URL must still be added under **Authorised JavaScript origins**.

## Storage and upload structure
The app saves drafts locally first using IndexedDB persistent storage. This includes:

- inspection form data
- selected template
- checklist answers
- ratings
- photo comments
- compressed photos
- GPS/location information
- generated DOCX draft status
- Drive upload queue status

When the device is online and the user is signed in, the app uploads to Google Drive using this structure:

```text
Inspection App/
  inspector-email@example.com/
    2026-06-18 - Asset Name - abc12345/
      inspection-data.json
      locations.json
      draft-inspection-report.docx
      completed-inspection-report.docx
      photos/
        001-photo.jpg
        002-photo.jpg
```

If the inspection was completed offline, the folder is created and uploaded when internet access and Google sign-in are restored.

## Templates
Templates are no longer separate JSON files. They are managed inside the app under **Template Manager**. You can:

- create a new asset template
- duplicate an existing template
- rename templates
- edit report headings and asset group defaults
- add/remove checklist sections
- add/remove checklist questions
- add/remove rating items and weights
- deploy any saved template to a new inspection from the Inspection tab

## Mobile use
Install the app to the phone home screen from the browser. The app is mobile-first and works offline after the first load. Google Drive sync requires internet and sign-in.


## Fix in this version
- Google sign-in no longer fails just because the Google identity script has not finished loading. The app now loads and waits for the Google sign-in library when the button is clicked.
- The service worker no longer intercepts/caches external Google scripts or Drive API calls. It only caches app files from the same site, which avoids false offline/sign-in failures.
- Service worker cache version bumped to force deployed devices to refresh.
