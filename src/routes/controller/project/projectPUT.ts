import express from 'express';
import Project from '../../../classes/Project';

const projectPUT= async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    try{       
        let newProject = new Project(
            req.body.name,
            req.body.desc,
            req.body.photoURL
        )

        if(!newProject.isValid()){
            return res.status(400).send();
        }

        Project.model().create(newProject)
        .then(
            (result) => {
                return res.status(201).send();   
        })
        .catch(
            (err) => {
                return res.status(500).send();    
        }) 

    }catch(err){
        return res.status(400).send();
    }        
    
}

export default projectPUT;