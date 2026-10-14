# JSS Event Hub

A student project recreation of a college event management website, built with React and Vite.

## Features
- Browse upcoming campus events
- Filter by category and search event names/descriptions
- View event details and save demo registration in browser local storage
- Demo organizer portal to add/remove events
- Responsive layout for mobile and desktop

## Run on your laptop
1. Install Node.js (LTS) from https://nodejs.org/
2. Extract this project folder.
3. Open a terminal inside the folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed in the terminal (usually http://localhost:5173).

## Build
```bash
npm run build
```

## Demo organizer login
- Username: any non-empty name
- Password: `jssadmin`

**Security note:** This is a front-end demonstration only. The organizer login is not secure, event and registration data are stored only in the current browser, and no real registration is sent to a college server. Do not use real passwords or private data. A production version needs a backend, secure authentication, and a database.

## Upload to GitHub (easy browser method)
1. Sign in at https://github.com/new
2. Create a repository named `JSS-Event-Hub`.
3. Extract this ZIP on your laptop.
4. In the new repository choose **Add file → Upload files**.
5. Upload the contents of this folder (including `src`, `package.json`, `index.html`, and `README.md`), then click **Commit changes**.

Do not upload `.env` files, access tokens, or passwords.

## About the original site
This is a recreated implementation based on the project description, not a recovered copy of the original deployed website source code.
