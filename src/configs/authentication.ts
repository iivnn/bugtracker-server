import { User } from '../models/User'
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = mongoose.model('user');

const authentication = (passport: PassportStatic) => {
    let user: User;
    passport.use(
        new Strategy({
            usernameField : 'login',
            passwordField : 'password'},
            (login, password, done) => {
                UserSchema.findOne({login : login})
                .then(
                    (result) => {
                        if(result == undefined){
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
                        return done(null, false, { message : 'erro interno'});        
                    }
                );
            }
        )
    );
    
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