import passport from 'passport';
import signinPOST from './controller/signin/signinPOST';
import signupPUT from './controller/signin/signupPUT';
import { Router } from 'express';
import { User } from '../models/User';

const router = Router();
User.setSchema();

router.post('/signin', passport.authenticate('local'), signinPOST);
router.put('/signup', signupPUT);

export default router;