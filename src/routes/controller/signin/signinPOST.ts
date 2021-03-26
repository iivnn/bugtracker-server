import { Response } from 'express';
import { User } from '../../../classes/User';

const signinPOST = async (req: any, res: Response, next: any) => {
    

    User.model().findById(req.user._id)
    .select(['userInfo', '-_id'])
    .then(
        (result: any) => {
            return res.status(200).json(result)
    })
    .catch(
        (err) => {
           return res.status(500).send();
    })  
   
}

export default signinPOST;