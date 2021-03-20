import passport from 'passport';
import { Router } from 'express';
import { signinPOST } from './controller/signinPost';
import { signinPUT } from './controller/signinPUT';
import { User } from '../models/User';

const router = Router();
User.setSchema();

router.post('/signin', passport.authenticate('local'), signinPOST);
router.put('/signin', signinPUT);

export { router };