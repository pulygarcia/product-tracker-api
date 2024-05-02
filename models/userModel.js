import mongoose from 'mongoose';
import {generateID} from '../helpers/index.js'
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    },
    token:{
        type: String,
        default: () => generateID()
    },
    verified:{
        type: Boolean,
        default: false
    },
    admin:{
        type: Boolean,
        default: false
    }
})

//before save the user, hash password using bcrypt. (schema api methods in mongoose docs)
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')){
        //if password has been modified, don't need to be hashed again. So, continue...
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt)
});

//create a personalized method that compares the password to use in the controller
userSchema.methods.checkPassword = async function(inputPassword){
    return await bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;