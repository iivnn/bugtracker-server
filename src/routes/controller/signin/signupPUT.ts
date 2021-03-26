import bcrypt from 'bcryptjs';
import { Response } from 'express';
import { User } from '../../../classes/User';
import { UserInfo } from '../../../classes/UserInfo';

const signupPUT = async (req: any, res: Response, next: any) => {
    
    try{
        let newUserInfo = new UserInfo(
            req.body.name,
            req.body.email,
            req.body.role);
        
        if(!newUserInfo.isEmailValid()){
            return res.status(400).send();
        }

        let newUser= new User(
            req.body.login, 
            req.body.password, 
            newUserInfo);
        
        if(!newUser.isValid()){
            return res.status(400).send();
        }

        User.model().exists({login: req.body.login})
        .then(
            (exists) => {
                if(exists){
                    return res.status(400).send();
                }

                bcrypt.genSalt(10, (err, salt) => {
                    if(err){
                        return res.status(500).send();
                    }  
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err){
                            return res.status(500).send();
                        }
        
                        newUser.password = hash;
        
                        User.model().create(newUser)
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
        })
        .catch(
           (err) => {
                return res.status(500).send();      
        })


        
    }catch(err){
        return res.status(500).send();
    } 
}

export default signupPUT ;