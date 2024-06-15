const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userCounter = 1;

const userSchema = new Schema({
    userId: {
        type: Number,
        unique: true,
        default: () => userCounter++
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', async function (next) {
    if (this.isNew) {
        const lastUser = await mongoose.model('User').findOne().sort('-userId').exec();
        if (lastUser) {
            userCounter = lastUser.userId + 1;
        }
    }
    next();
});

module.exports = mongoose.model('User', userSchema);
