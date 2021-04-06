import express from 'express';
import Project from '../../../classes/Project';

const projectDELETE= async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{

        Project.model().findByIdAndDelete(req.body.id)
        .then(
            (result) => {
                return res.status(200).send();
        })
        .catch(
            (err) => {
                return res.status(500).send();
        })

    }catch(err){
        return res.send(400).send();
    }
    
}

export default projectDELETE;