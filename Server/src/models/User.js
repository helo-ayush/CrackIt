const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required.'],
        minLength: [6, 'Password must be at least 6 characters long.'],
    }
})

UserSchema.pre('save', async function(next){
    const user = this;
    if( !user.isModified('password')){
        return next();
    }

    try{
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(user.password,salt);
        user.password = hashPassword;
        next();
    }
    catch(err){
        return next(err);
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const userData = mongoose.model("User",UserSchema);
module.exports = userData;
