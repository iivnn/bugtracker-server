import express from 'express';

export default function isAuthenticated(req: express.Request, res: express.Response, next: express.NextFunction){
    if(req.isAuthenticated()){
        return next();
    }else{
        return res.status(401).send();
    }
}