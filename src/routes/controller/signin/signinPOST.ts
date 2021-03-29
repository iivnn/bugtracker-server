import { Response } from 'express';

const signinPOST = async (req: any, res: Response, next: any) => {

    res.status(200).json(req.user.userInfo); 
   
}

export default signinPOST;