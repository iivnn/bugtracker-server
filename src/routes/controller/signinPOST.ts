import mongoose from 'mongoose';

const signinPOST = async (req: any, res: any, next: any) => {

    try{
        let UserSchema = mongoose.model('user');

        UserSchema.findById(req.user._id)
        .select(['-password', '-__v'])
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

export { signinPOST };