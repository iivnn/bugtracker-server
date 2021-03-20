import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { User } from '../../models/User';

const signinPUT = async (req: any, res: any, next: any) => {

    try{
        const UserSchema = mongoose.model('user');

        const newUser: User = new User(
                                req.body.login, 
                                req.body.password);
    
        bcrypt.genSalt(10, (err, salt) => {
    
            if(newUser.password == null ) {
                return res.status(400).send();
            }
            if(err){
                return res.stataus(500).send();
            }
    
            bcrypt.hash(newUser.password, salt, (err, hash) => {
    
                if(err){
                    return res.status(500).send();
                }
    
                newUser.password = hash;
    
                new UserSchema(newUser)
                .save()
                .then(
                    (result) => {
                        return res.status(201).send();
                })
                .catch(
                    (err) =>{
                        return res.status(500).send();
                })
            })
        })

    }catch(err){
        return res.status(500).send();
    } 
}

export { signinPUT };