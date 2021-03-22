import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { Response } from 'express';
import { User } from '../../../models/User';

const signupPUT = async (req: any, res: Response, next: any) => {
    
    try{
        const UserSchema = mongoose.model('user');
        const newUser: User = new User(req.body.login, req.body.password);
    
        bcrypt.genSalt(10, (err, salt) => {
    
            if(newUser.password == null ) {
                return res.status(400).send();
            }
            if(err){
                return res.status(500).send();
            }
    
            bcrypt.hash(newUser.password, salt, (err, hash) => {
    
                if(err){
                    return res.status(500).send();
                }
    
                newUser.password = hash;
    
                new UserSchema(newUser).save()
                .then(
                    () => {
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

export default signupPUT ;