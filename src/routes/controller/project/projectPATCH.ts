import express from 'express';
import Project from '../../../classes/Project';

const projectPATCH = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    
    try{

        let updatedProject = new Project(                     
            req.body.name,
            req.body.desc,
            req.body.photoURL 
        );

        if(!updatedProject.isValid()){
            return res.status(400).send();
        }

        Project.model().findByIdAndUpdate( req.body.id, {
            name: req.body.name,
            desc: req.body.desc,
            photoURL: req.body.photoURL         
        })
        .then(
            (result) => {
                return  res.status(200).send();
        })
        .catch(
            (err) => {
                return  res.status(500).send();
        })

    }catch(err){
        return res.status(400).send();
    }       
    
}

export default projectPATCH;