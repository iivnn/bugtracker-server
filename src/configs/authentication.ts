import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../models/User';

const authentication = (passport: PassportStatic) => {

    let UserSchema = mongoose.model('user');
    let user: User;

    passport.use(
        new Strategy({usernameField : 'login',passwordField : 'password'}, (login, password, done) => {
            UserSchema.findOne({login : login})
            .then(
                (result) => {
                    if(result == null){
                        return done(null, false);                     
                    }

                    user = <User> <unknown> result;

                    if(user.password == null) return done(null, false);

                    bcrypt.compare(password, user.password, (err, success) => {
                        if(err != null){
                            return done(null, false);
                        }
                        if(success){
                            return done(null, user);
                        }else{
                            return done(null, false);
                        }
                    });
                })
            .catch(
                (err) => {
                    return done(null, false);        
            });
        }));
    
    passport.serializeUser((user, done) =>{
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        UserSchema.findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });
}

export { authentication };