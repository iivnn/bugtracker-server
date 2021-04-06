import express from 'express';
import Project from '../../../classes/Project';

const projectGET= async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try{

        Project.model().find()
        .select(['-__v'])
        .then(
            (result) => {
                return res.status(200).json(result);
        })
        .catch(
            (err) => {
                return res.status(500).send();
        })  

    }catch(err){
        return res.send(400).send();
    }
    
}

export default projectGET;