import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';
import { Strategy } from 'passport-local';
import { User } from '../classes/User';

const authentication = (passport: PassportStatic) => {

    let user: User;

    passport.use(
        new Strategy({usernameField : 'login',passwordField : 'password'}, (login, password, done) => {
            User.model().findOne({login : login})
            .then(
                (result) => {
                    if(result == null){
                        done(null, false);                     
                    }

                    user = <User> <unknown> result;
                    
                    bcrypt.compare(password, user.password, (err, success) => {
                        if(err != null){
                            done(null, false);
                        }
                        if(success){
                            done(null, user);
                        }else{
                            done(null, false);
                        }
                    });
                })
            .catch(
                (err) => {
                    done(null, false);        
            });
        }));
    
    passport.serializeUser((user, done) =>{
        done(null, user);
    });

    passport.deserializeUser((id, done) => {
        User.model().findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });
}

export { authentication };