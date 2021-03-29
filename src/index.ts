import colors from 'colors';
import environment from './configs/environment';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import passport from 'passport';
import router from './routes/routes';
import session from 'express-session';
import authentication from './configs/authentication';

mongoose.Promise = global.Promise;
mongoose.connect(environment.URI, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false });

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var sessionOptions = environment.SESSION;

if(app.get('env') === 'production'){
    app.set('trust proxy', 1);
    sessionOptions.cookie.secure = true;
    sessionOptions.cookie.httpOnly = true;
}

app.use(session(sessionOptions));

authentication(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(helmet());

app.use('/api', router);

app.listen(environment.PORT, () => {
    console.log(colors.bgGreen.black('\nAPI running in Port -> ' + environment.PORT));
});