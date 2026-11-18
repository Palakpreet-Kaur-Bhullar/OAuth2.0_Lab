const express = require("express");
const session = require("express-session");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const app = express();

passport.use(
new GoogleStrategy(
{
clientID: process.env.GOOGLE_CLIENT_ID,
clientSecret: process.env.GOOGLE_CLIENT_SECRET,
callbackURL: "http://localhost:3000/auth/google/callback",
state: true, // CSRF protection for the OAuth flow
},
// Runs after Google confirms the user. A real app would find or create the user in a DB here.
(accessToken, refreshToken, profile, done) => done(null, profile)
)
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// 3. Enable sessions, then let Passport use them
app.use(
session({
secret: process.env.SESSION_SECRET,
resave: false,
saveUninitialized: false,
})
);
app.use(passport.session());

// 4. Home page
app.get("/", (req, res) => {
  res.send(
    req.user
      ? `<a href="/profile">View profile</a> <form method="post" action="/logout"><button>Logout</button></form>`
      : `<a href="/auth/google">Login with Google</a>`
  );
});


// 5. Send the user to Google
app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

// 6. Google redirects back here with a code, which Passport exchanges for the profile
app.get(
"/auth/google/callback",
passport.authenticate("google", { failureRedirect: "/", successRedirect: "/profile" })
);

// 7. Protected route
app.get("/profile", (req, res) => {
if (!req.isAuthenticated()) return res.redirect("/");
res.json(req.user);
});

// 8. Logout
app.post("/logout", (req, res, next) => {
req.logout((err) => (err ? next(err) : res.redirect("/")));
});

app.listen(3000, () => console.log("Running on http://localhost:3000"));