import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
    },
    email: {
        type:String,
        required:true,
        unique:true,
    }, 
    password: {
        type:String,
        required:true,
    },
    cartId:{
        type:Schema.Types.ObjectId,
        ref:'carts'
    },
    role: {
        type:String,
        required:true,
        enum:['ADMIN','CLIENT'],
        default:'CLIENT',
    },
    isGithub: {
        type:Boolean,
        default:false,
    },
});

usersSchema.pre('save', async function(next){
    const user = this;
    const hash = await bcrypt.hash(this.password, 10);

    this.password = hash;
    next();
});

usersSchema.methods.isValidPassword = async function(password){
    const user = this;
    const compare = await bcrypt.compare(password, user.password);
    return compare;
}


export const UserModel = model('user', usersSchema);