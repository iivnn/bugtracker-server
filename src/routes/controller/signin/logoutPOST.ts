import express from 'express';

const signinDELETE = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
     
    try{        
        req.logout();
        return res.status(200).send();
    }catch(err){
        return res.status(500).send();
    }
   
}

export default signinDELETE;