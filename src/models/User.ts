import mongoose from 'mongoose';

export class User{

    constructor(public login: string, public password: string, public id?: string, public createdAt?: string, public updatedAt?: string){}

    static setSchema(){
        let schema = new mongoose.Schema({
            login: { type : String, required : true},
            password : { type : String, required : true}})
            .set('timestamps', { timestamps: { createdAt: 'created_at' }});
        mongoose.model('user', schema)
    }
}