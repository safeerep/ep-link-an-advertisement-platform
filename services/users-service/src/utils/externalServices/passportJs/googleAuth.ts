import { Request } from "express";
import passport, { Profile, DoneCallback } from "passport";
import googleAuth from "passport-google-oauth20";
import crypto from 'crypto'
const googleStrategy = googleAuth.Strategy;

passport.serializeUser((user: Express.User, done: any) => {
  done(null, user);
});

passport.deserializeUser((user: Express.User, done: any) => {
  done(null, user);
});


passport.use(
  new googleStrategy(
    {
      clientID: String(process.env.GOOGLE_CLIENT_ID),
      clientSecret: String(process.env.GOOGLE_CLIENT_SECRET),
      callbackURL: process.env.GOOGLE_REDIRECT_URL,
      passReqToCallback: true,
      scope: ["profile", "email"],
    },
    async (
        request: Request,
        accessToken: string,
        refreshToken: string,
        profile: any,
        done: any
      ): Promise<void> => {
      console.log(profile);
      try {
        const randomString: string = crypto.randomBytes(16).toString('hex');
        const userCredentials = {
          userName: profile.displayName,
          email: profile._json.email,
          password: randomString
        }
        done( null, userCredentials)
      } catch (error) {
        console.log(`something went wrong`);
        done( error, null)
      }
    }
  )
);
