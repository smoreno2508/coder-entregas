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
        enum:['ADMIN','CLIENT','PREMIUM'],
        default:'CLIENT',
    },
    isGithub: {
        type:Boolean,
        default:false,
    },
    resetPasswordToken: {
        type:String,
        default:null,
    },
    resetPasswordExpires: {
        type:Date,
        default:null,
    }
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


usersSchema.methods.generatePasswordReset = function() {
    this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
    this.resetPasswordExpires = Date.now() + 3600000; 
};

usersSchema.methods.clearPasswordReset = function() {
    this.resetPasswordToken = null;
    this.resetPasswordExpires = null;
};


export const UserModel = model('user', usersSchema);