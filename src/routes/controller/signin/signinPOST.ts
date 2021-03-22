import mongoose from 'mongoose';
import { Response } from 'express';

const signinPOST = async (req: any, res: Response, next: any) => {
    
    try{
        let UserSchema = mongoose.model('user');
        UserSchema.findById(req.user._id)
        .select(['-password', '-__v', '-_id'])
        .then(
            (result: any) => {
                return res.status(200).json(result)
        })
        .catch(
            (err) => {
               return res.status(500).send();
        })
    }catch(err){
        return res.status(500).send();
    }    
}

export default signinPOST;