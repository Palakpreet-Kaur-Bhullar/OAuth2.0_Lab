# Google OAuth 2.0 Authentication Lab (`OAuth_Lab_2`)

A lightweight Node.js and Express web application demonstrating user authentication using **Google OAuth 2.0** and **Passport.js**.

## Features
- Sign in with Google via OAuth 2.0
- Session-based authentication using `express-session`
- Protected `/profile` route displaying authenticated user details
- Secure `/logout` endpoint to terminate the user session

---

## Tech Stack
- **Backend:** Node.js, Express
- **Authentication:** Passport.js (`passport-google-oauth20`)
- **Session Management:** `express-session`
- **Environment Config:** `dotenv`

---

## Prerequisites
Before running this project, ensure you have:
- [Node.js](https://nodejs.org) installed
- A [Google Cloud Console](https://google.com) project with **OAuth 2.0 Client ID** credentials configured

---

## Setup & Installation

### 1. Clone or Navigate to the Project
```bash
cd OAuth_Lab_2
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory and add your credentials:
```env
PORT=3000
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
SESSION_SECRET=your_random_session_secret
```

### 4. Configure Google Cloud Console
1. Go to **APIs & Services > Credentials** in the [Google Cloud Console](https://google.comapis/credentials).
2. Open your **OAuth 2.0 Client ID**.
3. Under **Authorized JavaScript origins**, add:
   ```text
   http://localhost:3000
   ```
4. Under **Authorized redirect URIs**, add:
   ```text
   http://localhost:3000/auth/google/callback
   ```
5. Click **Save**.

---

## Running the App

Start the development server:
```bash
node server.js
```

Open your browser and visit:
```text
http://localhost:3000
```

---

## API Routes

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Home page showing Login link or Profile/Logout options |
| `GET` | `/auth/google` | Initiates Google OAuth 2.0 authentication |
| `GET` | `/auth/google/callback` | Google OAuth callback URL after user consent |
| `GET` | `/profile` | Protected route displaying logged-in user info |
| `POST` | `/logout` | Logs out the user and clears the session |

---

## Troubleshooting
- **`Error 400: redirect_uri_mismatch`**: Verify that the `callbackURL` in `server.js` matches the exact URI added under **Authorized redirect URIs** in Google Cloud Console (including port number and lack of trailing slash).
