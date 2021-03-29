import isAuthenticated from '../helpers/isAuthenticated';
import isManager from '../helpers/isManager';
import logoutPOST from './controller/signin/logoutPOST';
import passport from 'passport';
import projectDELETE from './controller/project/projectDELETE';
import projectGET from './controller/project/projectGET';
import projectPATCH from './controller/project/projectPATCH';
import projectPUT from './controller/project/projectPUT';
import setModels from '../configs/models';
import signedPOST from './controller/signin/signedPOST';
import signinPOST from './controller/signin/signinPOST';
import signupPUT from './controller/signin/signupPUT';
import { Router } from 'express';

const router = Router();

setModels();

//authentication
router.post('/signin', passport.authenticate('local'), signinPOST);
router.post('/signed', isAuthenticated, signedPOST)
router.put('/signup', isAuthenticated, isManager, signupPUT);
router.post('/logout', isAuthenticated, logoutPOST);
//project
router.put('/project', isAuthenticated, isManager, projectPUT);
router.get('/project', isAuthenticated, projectGET);
router.patch('/project', isAuthenticated, isManager, projectPATCH)
router.delete('/project', isAuthenticated, isManager, projectDELETE)

export default router;