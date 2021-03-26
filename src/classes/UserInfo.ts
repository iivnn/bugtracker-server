import mongoose from 'mongoose';
import { Role } from "./enums/Role";

export class UserInfo{
    constructor(
        public name: string,
        public email: string,
        public role: Role,
    ){}

    static setModel(){
        let schema = new mongoose.Schema({
            name: { type: String, required: true },
            email: { type: String, required: true },
            role: { type: Number, require: true },
        })

        mongoose.model('userInfo', schema)
    }

    static model(){
        return mongoose.model('userInfo');
    }

    isEmailValid(): boolean {
        let regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return regex.test(this.email);
    }
}