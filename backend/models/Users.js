const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: Number,
        unique: true,
        default: 0 // Will be auto-incremented
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
    },
    role: {
        type: String,
        enum: ['guest', 'user', 'admin'],
        default: 'guest' // Default role is 'guest'
    }
});

const AutoIncrement = require('mongoose-sequence')(mongoose);
userSchema.plugin(AutoIncrement, { inc_field: 'userId' });

module.exports = mongoose.model('User', userSchema);
