import isAuthenticated from '../helpers/isAuthenticated';
import logoutPOST from './controller/signin/logoutPOST';
import passport from 'passport';
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
router.put('/signup', signupPUT);
router.post('/logout', logoutPOST);
export default router;