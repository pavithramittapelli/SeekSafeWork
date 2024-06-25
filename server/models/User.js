const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Please enter username'],
        minlength: [6, 'Min length is 6 characters'],
    },
    pincode: {
        type: String,
        required: [true, 'Please enter the area pincode'],
        validate: {
            validator: function (value) {
                return /^[0-9]{6}$/.test(value); // Validates pincode format
            },
            message: props => `${props.value} is not a valid pin code`
        }
    },
    email: {
        type: String,
        required: [true, 'Please enter an email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please enter a password'],
        minlength: [6, 'Minimum password length is  6 characters'],
    }
})


//fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user created and saved', doc);
    next();
})

//fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    console.log('user about to be created and saved', this);
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})


//static method for login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password)
        if (auth) {
            return user;
        }
        throw Error('incorrect password')
    }
    throw Error('incorrect email')
}
const User = mongoose.model('User', userSchema);
module.exports = User