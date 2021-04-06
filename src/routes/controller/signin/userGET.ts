import { Response } from 'express';

const userGET = async (req: any, res: Response, next: any) => {

    res.status(200).json(req.user.userInfo); 
   
}

export default userGET;