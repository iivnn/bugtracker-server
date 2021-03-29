import mongoose from 'mongoose';

export default class Project{
    constructor(
        public name: string,
        public desc: string,
        public photoURL?: string,       
        public id?: string, 
        public createdAt?: string, 
        public updatedAt?: string
    ){}

    static setModel(){
        let schema = new mongoose.Schema({
            name: { type: String, required: true },
            desc: { type: String, required: true },
            photoURL: { type: String, required: false }
        })
        .set('timestamps', { timestamps: { createdAt: 'created_at' }});

        mongoose.model('project', schema)
    }

    static model(){
        return mongoose.model('project');
    }

    //Validations
    isValid(): boolean {
        let isValid = true;
        isValid &&= this.isDescValid();
        isValid &&= this.isNameValid();
        isValid &&= this.isURLValid();
        return isValid;      
    }
    
    private isNameValid(): boolean {
        return this.name.length >= 3 && this.name.length <= 30;
    }

    private isDescValid(): boolean {
        return this.desc.length <= 300;
    }

    private isURLValid(): boolean {
        if(this.photoURL == null)
            return true;
        return this.photoURL?.length <= 2000;
    }
}