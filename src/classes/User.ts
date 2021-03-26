import mongoose from 'mongoose';
import { UserInfo } from './UserInfo';

export class User{
    constructor(
        public login: string, 
        public password: string,       
        public userInfo?: UserInfo,
        public id?: string, 
        public createdAt?: string, 
        public updatedAt?: string
    ){}

    static setModel(){
        let schema = new mongoose.Schema({
            login: { type: String, required: true },
            password: { type: String, required: true },
            userInfo: { type: Object, require: true }
        })
        .set('timestamps', { timestamps: { createdAt: 'created_at' }});

        mongoose.model('user', schema)
    }

    static model(){
        return mongoose.model('user');
    }

    //Validations
    isValid(): boolean {
        let isValid = true;
        isValid &&= this.isPasswordLenthValid();
        isValid &&= this.isLoginLengthValid();
        return isValid;      
    }

    private isLoginLengthValid(): boolean {
        return this.login.length >= 6;
    }
    
    private isPasswordLenthValid(): boolean {
        return this.password.length >= 6;   
    }
}