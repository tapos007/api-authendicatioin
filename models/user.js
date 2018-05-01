const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});
userSchema.pre('save',async function(next){
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        console.log('salt',salt);
        console.log('normal password',this.password);
        console.log('hashed password',hash);
        this.password = hash;
        next();
    }catch (error) {
        next(error);
    }
});

userSchema.methods.isValidPassword = async function(newPassword){
    try {
     return await bcrypt.compare(newPassword, this.password); // true
    }catch (error) {
        throw new Error(error);
    }
};
module.exports = mongoose.model('user', userSchema);