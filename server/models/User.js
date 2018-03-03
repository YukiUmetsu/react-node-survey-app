/**
 * Created by yukiX on 2018/02/25.
 */
const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String,
    lastName: String,
    firstName: String,
    email: String,
    photo: String,
    credits: { type: Number, default: 0 }
});

mongoose.model('users', userSchema);