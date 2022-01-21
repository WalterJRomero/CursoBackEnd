import passport from "passport";
import fbStrategy from 'passport-facebook';
import {users} from './src/daos/index.js'

const FacebookStrategy = fbStrategy.Strategy;

const initializePassportConfig = ()=>{
    passport.use('facebook',new FacebookStrategy({
        clientID:'4732264060200194',
        callbackURL:'https://localhost:8080/auth/facebook/callback',
        clientSecret:'e1df7eed3666f99e4a1774ab8837427a'
    },async(accessToken,refreshToken,profile,done)=>{
        try{
            console.log(accessToken);
            console.log(profile);
            let user = await users.getByEmail(profile.emails)//email
            done(null,user)
        }catch(error){
            done(error)
        }
    }))
}

export default initializePassportConfig