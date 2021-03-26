const environment= {
    PORT: 3000,
    URI: 'mongodb://localhost:27017/bugtracker',
    SESSION: {
        secret: 'BuGtr4ck3r',
        name : 'mfk5v0xNsV',
        resave : true,
        saveUninitialized : true,
        cookie: {
            secure: false,
            httpOnly: false
        }
    }
};

export default environment;