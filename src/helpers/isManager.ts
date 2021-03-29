import express from 'express';

export default function isManager(req: any, res: express.Response, next: express.NextFunction){
    if(req.user.userInfo.role == 1){
        return next();
    }else{
        return res.status(401).send();
    }
}